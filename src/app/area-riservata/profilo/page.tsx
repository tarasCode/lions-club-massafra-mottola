'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User, Lock, Mail, CheckCircle } from 'lucide-react';

interface ProfileForm {
  full_name: string;
  email: string;
}

interface PasswordForm {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileForm>({
    full_name: '',
    email: '',
  });

  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setProfile(prev => ({
        ...prev,
        email: user.email || '',
      }));

      // Get profile data
      const { data: profileData } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

      if (profileData) {
        setProfile(prev => ({
          ...prev,
          full_name: profileData.full_name || '',
        }));
      }
    } catch (error) {
      console.error('Errore nel caricamento del profilo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!profile.full_name.trim()) {
      setMessage({ type: 'error', text: 'Il nome è obbligatorio' });
      return;
    }

    try {
      setSaving(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error('Non autenticato');

      const { error } = await supabase
        .from('profiles')
        .update({ full_name: profile.full_name })
        .eq('id', user.id);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Profilo aggiornato con successo' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Errore nell\'aggiornamento del profilo:', error);
      setMessage({ type: 'error', text: 'Errore nell\'aggiornamento del profilo' });
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!passwordForm.current_password.trim()) {
      setMessage({ type: 'error', text: 'Inserisci la password attuale' });
      return;
    }

    if (!passwordForm.new_password.trim()) {
      setMessage({ type: 'error', text: 'Inserisci la nuova password' });
      return;
    }

    if (passwordForm.new_password !== passwordForm.confirm_password) {
      setMessage({ type: 'error', text: 'Le password non corrispondono' });
      return;
    }

    if (passwordForm.new_password.length < 8) {
      setMessage({
        type: 'error',
        text: 'La password deve contenere almeno 8 caratteri',
      });
      return;
    }

    try {
      setChangingPassword(true);

      const { error } = await supabase.auth.updateUser({
        password: passwordForm.new_password,
      });

      if (error) throw error;

      setPasswordForm({
        current_password: '',
        new_password: '',
        confirm_password: '',
      });

      setMessage({
        type: 'success',
        text: 'Password cambiata con successo',
      });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Errore nel cambio della password:', error);
      setMessage({
        type: 'error',
        text: 'Errore nel cambio della password',
      });
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Caricamento profilo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Il Mio Profilo</h1>
        <p className="text-gray-600 mt-1">Gestisci le tue informazioni personali</p>
      </div>

      {/* Messages */}
      {message && (
        <div
          className={`rounded-lg p-4 flex items-center gap-3 ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          <CheckCircle
            size={20}
            className={message.type === 'success' ? 'text-green-600' : 'text-red-600'}
          />
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <User className="text-blue-600" size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Informazioni Personali</h2>
            </div>

            <div className="space-y-6">
              {/* Email (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                  <Mail size={18} className="text-gray-400" />
                  <span className="text-gray-700 flex-1">{profile.email}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  L'email non può essere modificata da qui
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label
                  htmlFor="full_name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nome Completo
                </label>
                <input
                  id="full_name"
                  type="text"
                  value={profile.full_name}
                  onChange={(e) =>
                    setProfile({ ...profile, full_name: e.target.value })
                  }
                  placeholder="Inserisci il tuo nome completo"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-semibold"
              >
                {saving ? 'Salvataggio...' : 'Salva Profilo'}
              </button>
            </div>
          </div>

          {/* Change Password Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-100 rounded-lg">
                <Lock className="text-red-600" size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Cambia Password</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="current_password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password Attuale
                </label>
                <input
                  id="current_password"
                  type="password"
                  value={passwordForm.current_password}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      current_password: e.target.value,
                    })
                  }
                  placeholder="Inserisci la password attuale"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label
                  htmlFor="new_password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nuova Password
                </label>
                <input
                  id="new_password"
                  type="password"
                  value={passwordForm.new_password}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      new_password: e.target.value,
                    })
                  }
                  placeholder="Inserisci la nuova password (min. 8 caratteri)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Minimo 8 caratteri
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Conferma Password
                </label>
                <input
                  id="confirm_password"
                  type="password"
                  value={passwordForm.confirm_password}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirm_password: e.target.value,
                    })
                  }
                  placeholder="Ripeti la nuova password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Change Password Button */}
              <button
                onClick={handleChangePassword}
                disabled={changingPassword}
                className="w-full px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition-colors font-semibold"
              >
                {changingPassword ? 'Aggiornamento...' : 'Cambia Password'}
              </button>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="lg:col-span-1">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
            <h3 className="font-bold text-blue-900">Informazioni Account</h3>

            <div>
              <p className="text-sm text-blue-700 font-medium mb-1">Email registrata</p>
              <p className="text-sm text-blue-600 break-all">{profile.email}</p>
            </div>

            <div className="border-t border-blue-200 pt-4">
              <p className="text-sm text-blue-700 font-medium mb-2">
                Requisiti Password
              </p>
              <ul className="text-xs text-blue-600 space-y-1">
                <li>• Minimo 8 caratteri</li>
                <li>• Combina maiuscole e minuscole</li>
                <li>• Includi numeri</li>
              </ul>
            </div>

            <div className="bg-white rounded p-3 border border-blue-200">
              <p className="text-xs text-gray-600">
                Se hai domande sulla sicurezza dell'account, contatta l'amministratore del sito.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
