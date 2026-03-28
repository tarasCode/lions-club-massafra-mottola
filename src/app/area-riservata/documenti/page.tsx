'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Plus,
  Trash2,
  Download,
  ChevronDown,
  ChevronRight,
  Upload,
  Folder,
  FileText,
  X,
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Document {
  id: string;
  name: string;
  file_type: string;
  file_size: number;
  created_at: string;
  file_url: string;
}

interface DocumentFolder {
  id: string;
  year: number;
  categories: {
    id: string;
    category: Category;
    documents: Document[];
  }[];
}

export default function DocumentsPage() {
  const [folders, setFolders] = useState<DocumentFolder[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [uploadingTo, setUploadingTo] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showNewYearModal, setShowNewYearModal] = useState(false);
  const [newYear, setNewYear] = useState(new Date().getFullYear());

  const supabase = createClient();

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);

      // Get all document folders with their categories and documents
      const { data: folderData, error: folderError } = await supabase
        .from('document_folders')
        .select('id, year, category_id');

      if (folderError) throw folderError;

      // Get all categories
      const { data: categories, error: catError } = await supabase
        .from('document_categories')
        .select('*')
        .order('sort_order');

      if (catError) throw catError;

      // Get all documents
      const { data: docs, error: docsError } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (docsError) throw docsError;

      // Organize data by year and category
      const foldersByYear = new Map<number, DocumentFolder>();

      folderData?.forEach(folder => {
        if (!foldersByYear.has(folder.year)) {
          foldersByYear.set(folder.year, {
            id: `year-${folder.year}`,
            year: folder.year,
            categories: [],
          });
        }

        const categoryData = categories?.find(c => c.id === folder.category_id);
        if (categoryData) {
          const categoryDocs = (docs || []).filter(
            doc => doc.folder_id === folder.id
          );

          foldersByYear.get(folder.year)?.categories.push({
            id: folder.id,
            category: categoryData,
            documents: categoryDocs,
          });
        }
      });

      // Add categories without folders
      categories?.forEach(cat => {
        if (!folderData?.some(f => f.category_id === cat.id)) {
          const year = new Date().getFullYear();
          if (!foldersByYear.has(year)) {
            foldersByYear.set(year, {
              id: `year-${year}`,
              year,
              categories: [],
            });
          }

          foldersByYear.get(year)?.categories.push({
            id: `cat-${cat.id}`,
            category: cat,
            documents: [],
          });
        }
      });

      const sortedFolders = Array.from(foldersByYear.values())
        .sort((a, b) => b.year - a.year);

      setFolders(sortedFolders);
    } catch (error) {
      console.error('Errore nel caricamento dei documenti:', error);
      alert('Errore nel caricamento dei documenti');
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleUploadDocument = useCallback(async (
    e: React.ChangeEvent<HTMLInputElement>,
    folderIdOrCatId: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingTo(folderIdOrCatId);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${file.name}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from('documents').getPublicUrl(fileName);

      // Insert document record
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error('Not authenticated');

      const { error: insertError } = await supabase.from('documents').insert([
        {
          name: file.name,
          description: '',
          file_url: publicUrl,
          file_type: fileExt?.toUpperCase() || 'FILE',
          file_size: file.size,
          folder_id: folderIdOrCatId,
          uploaded_by: user.id,
        },
      ]);

      if (insertError) throw insertError;

      alert('Documento caricato con successo');
      fetchDocuments();
    } catch (error) {
      console.error('Errore nell\'upload:', error);
      alert('Errore nell\'upload del documento');
    } finally {
      setUploadingTo(null);
    }
  }, [supabase, fetchDocuments]);

  const handleDeleteDocument = useCallback(async (docId: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo documento?')) return;

    try {
      setDeleting(docId);
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', docId);

      if (error) throw error;

      alert('Documento eliminato con successo');
      fetchDocuments();
    } catch (error) {
      console.error('Errore nell\'eliminazione:', error);
      alert('Errore nell\'eliminazione del documento');
    } finally {
      setDeleting(null);
    }
  }, [supabase, fetchDocuments]);

  const handleAddYear = async () => {
    try {
      // Check if year already exists
      const existingYear = folders.find(f => f.year === newYear);
      if (existingYear) {
        alert('Questo anno esiste già');
        return;
      }

      // Get all categories
      const { data: categories, error: catError } = await supabase
        .from('document_categories')
        .select('id');

      if (catError) throw catError;

      // Create folders for each category in the new year
      const foldersToCreate = (categories || []).map(cat => ({
        year: newYear,
        category_id: cat.id,
      }));

      const { error: createError } = await supabase
        .from('document_folders')
        .insert(foldersToCreate);

      if (createError) throw createError;

      setShowNewYearModal(false);
      setNewYear(new Date().getFullYear());
      alert('Anno aggiunto con successo');
      fetchDocuments();
    } catch (error) {
      console.error('Errore nell\'aggiunta dell\'anno:', error);
      alert('Errore nell\'aggiunta dell\'anno');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Caricamento archivio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Archivio Documenti</h1>
          <p className="text-gray-600 mt-1">Gestisci i documenti organizzati per anno e categoria</p>
        </div>
        <button
          onClick={() => setShowNewYearModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          <Plus size={20} />
          Nuovo Anno
        </button>
      </div>

      {/* New Year Modal */}
      {showNewYearModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Aggiungi Nuovo Anno</h2>
              <button
                onClick={() => setShowNewYearModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Anno
                </label>
                <input
                  type="number"
                  value={newYear}
                  onChange={(e) => setNewYear(parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddYear}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Aggiungi
                </button>
                <button
                  onClick={() => setShowNewYearModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Annulla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Document Tree */}
      <div className="space-y-3">
        {folders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Folder size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg mb-4">Nessun anno disponibile</p>
            <button
              onClick={() => setShowNewYearModal(true)}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Crea il primo anno
            </button>
          </div>
        ) : (
          folders.map(yearFolder => (
            <div key={yearFolder.year} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Year Header */}
              <button
                onClick={() => toggleFolder(`year-${yearFolder.year}`)}
                className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {expandedFolders.has(`year-${yearFolder.year}`) ? (
                    <ChevronDown size={20} />
                  ) : (
                    <ChevronRight size={20} />
                  )}
                  <span className="text-lg font-semibold">{yearFolder.year}</span>
                </div>
                <span className="text-sm opacity-90">
                  {yearFolder.categories.reduce((acc, cat) => acc + cat.documents.length, 0)} documenti
                </span>
              </button>

              {/* Categories */}
              {expandedFolders.has(`year-${yearFolder.year}`) && (
                <div className="border-t border-gray-200">
                  {yearFolder.categories.map(catFolder => (
                    <div key={catFolder.category.id} className="border-b border-gray-200 last:border-b-0">
                      {/* Category Header */}
                      <button
                        onClick={() =>
                          toggleFolder(`cat-${catFolder.category.id}`)
                        }
                        className="w-full flex items-center justify-between px-8 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          {expandedFolders.has(`cat-${catFolder.category.id}`) ? (
                            <ChevronDown size={18} className="text-gray-600" />
                          ) : (
                            <ChevronRight size={18} className="text-gray-600" />
                          )}
                          <Folder size={18} className="text-blue-600" />
                          <span className="font-medium text-gray-800">
                            {catFolder.category.name}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {catFolder.documents.length}
                        </span>
                      </button>

                      {/* Documents */}
                      {expandedFolders.has(`cat-${catFolder.category.id}`) && (
                        <div className="px-8 py-3 bg-white border-t border-gray-100 space-y-2">
                          {catFolder.documents.length === 0 ? (
                            <div className="text-center py-6">
                              <p className="text-gray-500 text-sm mb-3">
                                Nessun documento in questa categoria
                              </p>
                              <label className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer text-sm">
                                Carica il primo
                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleUploadDocument(
                                      e,
                                      catFolder.category.id
                                    )
                                  }
                                />
                              </label>
                            </div>
                          ) : (
                            <>
                              {catFolder.documents.map(doc => (
                                <div
                                  key={doc.id}
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 transition-colors"
                                >
                                  <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <FileText
                                      size={18}
                                      className="text-gray-600 flex-shrink-0"
                                    />
                                    <div className="min-w-0">
                                      <p className="font-medium text-gray-800 truncate">
                                        {doc.name}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {formatFileSize(doc.file_size)} •{' '}
                                        {new Date(doc.created_at).toLocaleDateString(
                                          'it-IT'
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    <a
                                      href={doc.file_url}
                                      download
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                                      title="Scarica"
                                    >
                                      <Download size={18} />
                                    </a>
                                    <button
                                      onClick={() => handleDeleteDocument(doc.id)}
                                      disabled={deleting === doc.id}
                                      className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors disabled:opacity-50"
                                      title="Elimina"
                                    >
                                      <Trash2 size={18} />
                                    </button>
                                  </div>
                                </div>
                              ))}
                              <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-blue-500 transition-colors bg-gray-50 text-gray-700 hover:text-blue-600 font-medium text-sm">
                                <Upload size={16} />
                                Carica documento
                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleUploadDocument(e, catFolder.category.id)
                                  }
                                  disabled={uploadingTo === catFolder.category.id}
                                />
                              </label>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
