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
  Eye,
  Image as ImageIcon,
  FileIcon,
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
  file_data?: string; // base64 encoded
}

interface CategoryFolder {
  id: string;
  realFolderId: string | null;
  category: Category;
  documents: Document[];
}

interface DocumentFolder {
  id: string;
  year: number;
  categories: CategoryFolder[];
}

export default function DocumentsPage() {
  const [folders, setFolders] = useState<DocumentFolder[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [uploadingTo, setUploadingTo] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showNewYearModal, setShowNewYearModal] = useState(false);
  const [newYear, setNewYear] = useState(new Date().getFullYear());
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null);

  const supabase = createClient();

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);

      const { data: folderData, error: folderError } = await supabase
        .from('document_folders')
        .select('id, year, category_id');

      if (folderError) throw folderError;

      const { data: categories, error: catError } = await supabase
        .from('document_categories')
        .select('*')
        .order('sort_order');

      if (catError) throw catError;

      const { data: docs, error: docsError } = await supabase
        .from('documents')
        .select('id, name, file_type, file_size, created_at, file_url, file_data, folder_id')
        .order('created_at', { ascending: false });

      if (docsError) throw docsError;

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
            (doc: any) => doc.folder_id === folder.id
          );

          foldersByYear.get(folder.year)?.categories.push({
            id: folder.id,
            realFolderId: folder.id,
            category: categoryData,
            documents: categoryDocs,
          });
        }
      });

      const allYears = Array.from(foldersByYear.keys());

      if (allYears.length === 0) {
        const year = new Date().getFullYear();
        foldersByYear.set(year, { id: `year-${year}`, year, categories: [] });
        allYears.push(year);
      }

      allYears.forEach(year => {
        const yearFolder = foldersByYear.get(year)!;
        const existingCatIds = new Set(yearFolder.categories.map(c => c.category.id));

        categories?.forEach(cat => {
          if (!existingCatIds.has(cat.id)) {
            yearFolder.categories.push({
              id: `pending-${year}-${cat.id}`,
              realFolderId: null,
              category: cat,
              documents: [],
            });
          }
        });

        yearFolder.categories.sort((a, b) => {
          const aIdx = categories?.findIndex(c => c.id === a.category.id) ?? 0;
          const bIdx = categories?.findIndex(c => c.id === b.category.id) ?? 0;
          return aIdx - bIdx;
        });
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

  /**
   * Ensures a document_folder row exists for year + category.
   * Uses select array instead of .single() to avoid 406.
   */
  const ensureFolderExists = async (year: number, categoryId: string): Promise<string> => {
    // Use array query (no .single()) to avoid 406 when 0 rows
    const { data: existing, error: selectErr } = await supabase
      .from('document_folders')
      .select('id')
      .eq('year', year)
      .eq('category_id', categoryId);

    if (selectErr) throw selectErr;

    if (existing && existing.length > 0) return existing[0].id;

    // Create the folder
    const { data: created, error: insertErr } = await supabase
      .from('document_folders')
      .insert({ year, category_id: categoryId })
      .select('id')
      .single();

    if (insertErr) throw insertErr;
    return created!.id;
  };

  /**
   * Converts a File to base64 string
   */
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the data:xxx;base64, prefix
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleUploadDocument = useCallback(async (
    e: React.ChangeEvent<HTMLInputElement>,
    catFolder: CategoryFolder,
    year: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limit file size to 5MB for DB storage
    if (file.size > 5 * 1024 * 1024) {
      alert('Il file è troppo grande. Dimensione massima: 5MB');
      e.target.value = '';
      return;
    }

    try {
      setUploadingTo(catFolder.id);

      // 1. Ensure folder exists
      const realFolderId = catFolder.realFolderId
        ? catFolder.realFolderId
        : await ensureFolderExists(year, catFolder.category.id);

      // 2. Convert file to base64
      const base64Data = await fileToBase64(file);
      const fileExt = file.name.split('.').pop()?.toUpperCase() || 'FILE';

      // 3. Get user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error('Non autenticato');

      // 4. Insert into DB with file_data (base64 in DB, no storage bucket)
      const { error: insertError } = await supabase.from('documents').insert([
        {
          name: file.name,
          description: '',
          file_url: '', // no longer using storage
          file_type: fileExt,
          file_size: file.size,
          folder_id: realFolderId,
          uploaded_by: user.id,
          file_data: base64Data,
        },
      ]);

      if (insertError) throw insertError;

      alert('Documento caricato con successo');
      fetchDocuments();
    } catch (error: any) {
      console.error('Errore nell\'upload:', error);
      alert('Errore nell\'upload: ' + (error?.message || 'Errore sconosciuto'));
    } finally {
      setUploadingTo(null);
      e.target.value = '';
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

      if (previewDoc?.id === docId) setPreviewDoc(null);
      alert('Documento eliminato con successo');
      fetchDocuments();
    } catch (error) {
      console.error('Errore nell\'eliminazione:', error);
      alert('Errore nell\'eliminazione del documento');
    } finally {
      setDeleting(null);
    }
  }, [supabase, fetchDocuments, previewDoc]);

  const handleAddYear = async () => {
    try {
      const existingYear = folders.find(f => f.year === newYear);
      if (existingYear) {
        alert('Questo anno esiste già');
        return;
      }

      const { data: categories, error: catError } = await supabase
        .from('document_categories')
        .select('id');

      if (catError) throw catError;

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

  const getFileIcon = (fileType: string) => {
    const type = fileType.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(type)) {
      return <ImageIcon size={18} className="text-green-600 flex-shrink-0" />;
    }
    if (['pdf'].includes(type)) {
      return <FileText size={18} className="text-red-600 flex-shrink-0" />;
    }
    return <FileIcon size={18} className="text-gray-600 flex-shrink-0" />;
  };

  const canPreview = (doc: Document) => {
    const type = doc.file_type.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'pdf'].includes(type) && !!doc.file_data;
  };

  /**
   * Build a data URL from base64 file_data for previewing/downloading
   */
  const getDataUrl = (doc: Document): string => {
    if (!doc.file_data) return '';
    const type = doc.file_type.toLowerCase();
    let mime = 'application/octet-stream';
    if (['jpg', 'jpeg'].includes(type)) mime = 'image/jpeg';
    else if (type === 'png') mime = 'image/png';
    else if (type === 'gif') mime = 'image/gif';
    else if (type === 'webp') mime = 'image/webp';
    else if (type === 'svg') mime = 'image/svg+xml';
    else if (type === 'pdf') mime = 'application/pdf';
    else if (type === 'txt') mime = 'text/plain';
    return `data:${mime};base64,${doc.file_data}`;
  };

  const handleDownload = (doc: Document) => {
    if (!doc.file_data) return;
    const url = getDataUrl(doc);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Caricamento archivio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-6 min-h-[calc(100vh-200px)]">
      {/* Left: Document Tree */}
      <div className={`space-y-6 transition-all duration-300 ${previewDoc ? 'w-1/2' : 'w-full'}`}>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Archivio Documenti</h1>
            <p className="text-gray-500 text-sm mt-1">Gestisci i documenti per anno e categoria (max 5MB per file)</p>
          </div>
          <button
            onClick={() => setShowNewYearModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
          >
            <Plus size={18} />
            Nuovo Anno
          </button>
        </div>

        {/* New Year Modal */}
        {showNewYearModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Aggiungi Nuovo Anno</h2>
                <button onClick={() => setShowNewYearModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Anno</label>
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
                <button
                  onClick={() => toggleFolder(`year-${yearFolder.year}`)}
                  className="w-full flex items-center justify-between px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-colors"
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

                {expandedFolders.has(`year-${yearFolder.year}`) && (
                  <div className="border-t border-gray-200">
                    {yearFolder.categories.map(catFolder => {
                      const catKey = `cat-${yearFolder.year}-${catFolder.category.id}`;
                      return (
                        <div key={catFolder.id} className="border-b border-gray-200 last:border-b-0">
                          <button
                            onClick={() => toggleFolder(catKey)}
                            className="w-full flex items-center justify-between px-8 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              {expandedFolders.has(catKey) ? (
                                <ChevronDown size={18} className="text-gray-600" />
                              ) : (
                                <ChevronRight size={18} className="text-gray-600" />
                              )}
                              <Folder size={18} className="text-blue-600" />
                              <span className="font-medium text-gray-800 text-sm">
                                {catFolder.category.name}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">{catFolder.documents.length}</span>
                          </button>

                          {expandedFolders.has(catKey) && (
                            <div className="px-8 py-3 bg-white border-t border-gray-100 space-y-2">
                              {catFolder.documents.length === 0 ? (
                                <div className="text-center py-4">
                                  <p className="text-gray-500 text-sm mb-2">Nessun documento</p>
                                  <label className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer text-sm">
                                    Carica il primo
                                    <input
                                      type="file"
                                      className="hidden"
                                      onChange={(e) => handleUploadDocument(e, catFolder, yearFolder.year)}
                                    />
                                  </label>
                                </div>
                              ) : (
                                <>
                                  {catFolder.documents.map(doc => (
                                    <div
                                      key={doc.id}
                                      className={`flex items-center justify-between p-3 rounded border cursor-pointer transition-colors ${
                                        previewDoc?.id === doc.id
                                          ? 'bg-blue-50 border-blue-300'
                                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                                      }`}
                                      onClick={() => canPreview(doc) && setPreviewDoc(doc)}
                                    >
                                      <div className="flex items-center gap-3 flex-1 min-w-0">
                                        {getFileIcon(doc.file_type)}
                                        <div className="min-w-0">
                                          <p className="font-medium text-gray-800 truncate text-sm">{doc.name}</p>
                                          <p className="text-xs text-gray-500">
                                            {formatFileSize(doc.file_size)} •{' '}
                                            {new Date(doc.created_at).toLocaleDateString('it-IT')}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-1 flex-shrink-0">
                                        {canPreview(doc) && (
                                          <button
                                            onClick={(ev) => { ev.stopPropagation(); setPreviewDoc(doc); }}
                                            className="p-1.5 text-gray-500 hover:bg-gray-200 rounded transition-colors"
                                            title="Anteprima"
                                          >
                                            <Eye size={15} />
                                          </button>
                                        )}
                                        {doc.file_data && (
                                          <button
                                            onClick={(ev) => { ev.stopPropagation(); handleDownload(doc); }}
                                            className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                                            title="Scarica"
                                          >
                                            <Download size={15} />
                                          </button>
                                        )}
                                        <button
                                          onClick={(ev) => { ev.stopPropagation(); handleDeleteDocument(doc.id); }}
                                          disabled={deleting === doc.id}
                                          className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors disabled:opacity-50"
                                          title="Elimina"
                                        >
                                          <Trash2 size={15} />
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                  <label className={`flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-blue-500 transition-colors bg-gray-50 text-gray-700 hover:text-blue-600 font-medium text-sm ${uploadingTo === catFolder.id ? 'opacity-50 pointer-events-none' : ''}`}>
                                    {uploadingTo === catFolder.id ? (
                                      <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                        Caricamento...
                                      </>
                                    ) : (
                                      <>
                                        <Upload size={16} />
                                        Carica documento
                                      </>
                                    )}
                                    <input
                                      type="file"
                                      className="hidden"
                                      onChange={(e) => handleUploadDocument(e, catFolder, yearFolder.year)}
                                      disabled={uploadingTo === catFolder.id}
                                    />
                                  </label>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right: Document Viewer Panel */}
      {previewDoc && (
        <div className="w-1/2 bg-white rounded-lg shadow-lg border border-gray-200 sticky top-4 h-[calc(100vh-140px)] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50 flex-shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              {getFileIcon(previewDoc.file_type)}
              <span className="font-medium text-gray-800 truncate text-sm">{previewDoc.name}</span>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {previewDoc.file_data && (
                <button
                  onClick={() => handleDownload(previewDoc)}
                  className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                  title="Scarica"
                >
                  <Download size={16} />
                </button>
              )}
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1.5 text-gray-500 hover:bg-gray-200 rounded transition-colors"
                title="Chiudi"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-1">
            {['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(
              previewDoc.file_type.toLowerCase()
            ) && previewDoc.file_data ? (
              <div className="flex items-center justify-center h-full p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getDataUrl(previewDoc)}
                  alt={previewDoc.name}
                  className="max-w-full max-h-full object-contain rounded"
                />
              </div>
            ) : previewDoc.file_type.toLowerCase() === 'pdf' && previewDoc.file_data ? (
              <iframe
                src={getDataUrl(previewDoc)}
                className="w-full h-full border-0"
                title={previewDoc.name}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <FileIcon size={48} className="mb-4 opacity-50" />
                <p className="text-sm">Anteprima non disponibile</p>
                {previewDoc.file_data && (
                  <button
                    onClick={() => handleDownload(previewDoc)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Scarica il file
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 flex-shrink-0 text-xs text-gray-500">
            {formatFileSize(previewDoc.file_size)} • {previewDoc.file_type.toUpperCase()} •{' '}
            {new Date(previewDoc.created_at).toLocaleDateString('it-IT')}
          </div>
        </div>
      )}
    </div>
  );
}
