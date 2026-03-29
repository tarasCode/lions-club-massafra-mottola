'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/components/Toast';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), { ssr: false });

interface NewsForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  published: boolean;
}

function NewsFormContent() {
  const { showToast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  const [form, setForm] = useState<NewsForm>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    published: false,
  });

  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(!!editId);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const supabase = createClient();

  const fetchNews = useCallback(async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        setForm({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content,
          image_url: data.image_url || '',
          published: data.published,
        });
      }
    } catch (error) {
      console.error('Errore nel caricamento della notizia:', error);
      showToast('error', 'Errore nel caricamento della notizia');
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    if (editId) {
      fetchNews(editId);
    }
  }, [editId, fetchNews]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm({
      ...form,
      title,
      slug: generateSlug(title),
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('news-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from('news-images').getPublicUrl(fileName);

      setForm({
        ...form,
        image_url: publicUrl,
      });
    } catch (error) {
      console.error('Errore nell\'upload dell\'immagine:', error);
      showToast('error', 'Errore nell\'upload dell\'immagine');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (publish: boolean) => {
    if (!form.title.trim()) {
      showToast('error', 'Il titolo è obbligatorio');
      return;
    }

    if (!form.excerpt.trim()) {
      showToast('error', 'L\'estratto è obbligatorio');
      return;
    }

    if (!form.content.trim()) {
      showToast('error', 'Il contenuto è obbligatorio');
      return;
    }

    try {
      setSaving(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        showToast('error', 'Errore di autenticazione');
        return;
      }

      const newsData = {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        content: form.content,
        image_url: form.image_url,
        published: publish,
        published_at: publish ? new Date().toISOString() : null,
        author_id: user.id,
      };

      if (editId) {
        const { error } = await supabase
          .from('news')
          .update(newsData)
          .eq('id', editId);

        if (error) throw error;

        showToast('success', 'Notizia aggiornata con successo');
      } else {
        const { error } = await supabase.from('news').insert([newsData]);

        if (error) throw error;

        showToast('success', 'Notizia creata con successo');
      }

      router.push('/area-riservata/news');
    } catch (error) {
      console.error('Errore nel salvataggio:', error);
      showToast('error', 'Errore nel salvataggio della notizia');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Caricamento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {editId ? 'Modifica Notizia' : 'Nuova Notizia'}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Informazioni Generali</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titolo *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={handleTitleChange}
                placeholder="Titolo della notizia"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-600"
              />
              <p className="text-xs text-gray-500 mt-1">
                Generato automaticamente dal titolo
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estratto *
              </label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="Breve descrizione della notizia (appare nei listing)"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Image */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Immagine</h2>

            {form.image_url && (
              <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={form.image_url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors bg-gray-50">
              <div className="text-center">
                <p className="text-gray-600 font-medium">
                  {uploadingImage ? 'Caricamento...' : 'Clicca per caricare un\'immagine'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG fino a 5MB
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="hidden"
              />
            </label>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Contenuto</h2>

            <RichTextEditor
              content={form.content}
              onChange={(html: string) => setForm({ ...form, content: html })}
              placeholder="Scrivi il contenuto della news..."
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Preview */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Anteprima</h2>

            <button
              onClick={() => setPreview(!preview)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 font-medium"
            >
              {preview ? (
                <>
                  <EyeOff size={18} />
                  Nascondi Anteprima
                </>
              ) : (
                <>
                  <Eye size={18} />
                  Mostra Anteprima
                </>
              )}
            </button>

            {preview && (
              <div className="border-t pt-4 space-y-4">
                {form.image_url && (
                  <img
                    src={form.image_url}
                    alt={form.title}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                )}
                <div>
                  <h3 className="font-bold text-gray-800 line-clamp-2">
                    {form.title || 'Titolo della notizia'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {form.excerpt || 'Estratto della notizia...'}
                  </p>
                  {form.content && (
                    <div
                      className="prose prose-sm max-w-none mt-3 text-gray-700"
                      dangerouslySetInnerHTML={{ __html: form.content }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">Pubblica</h2>

            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors font-semibold"
            >
              {saving ? 'Salvataggio...' : 'Pubblica Ora'}
            </button>

            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="w-full px-4 py-2 bg-gray-400 hover:bg-gray-500 disabled:bg-gray-400 text-white rounded-lg transition-colors font-semibold"
            >
              {saving ? 'Salvataggio...' : 'Salva come Bozza'}
            </button>

            <button
              onClick={() => router.push('/area-riservata/news')}
              className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors font-semibold"
            >
              Annulla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewsForm() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Caricamento...</p>
        </div>
      </div>
    }>
      <NewsFormContent />
    </Suspense>
  );
}
