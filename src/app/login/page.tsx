'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/area-riservata';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createClient();

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(
          signInError.message === 'Invalid login credentials'
            ? 'Email o password non corretti'
            : signInError.message
        );
        setLoading(false);
        return;
      }

      router.push(redirect);
    } catch {
      setError('Si è verificato un errore durante l\'accesso');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg">
          <div className="text-white text-4xl font-bold">LC</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-amber-500">
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-8">
          <h1 className="text-2xl font-bold text-white text-center">
            Accedi all&apos;Area Riservata
          </h1>
          <p className="text-blue-100 text-center text-sm mt-2">
            Lions Club Massafra Mottola &quot;Le Cripte&quot;
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              placeholder="nome@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Accesso in corso...
              </>
            ) : (
              'Accedi'
            )}
          </button>
        </form>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">
            Hai problemi di accesso?{' '}
            <a href="/contatti" className="text-blue-900 hover:text-blue-800 font-semibold">
              Contattaci
            </a>
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-center space-x-4">
        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
        <div className="w-2 h-2 rounded-full bg-blue-900"></div>
        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <Suspense fallback={
        <div className="w-full max-w-md flex justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-900 border-t-transparent rounded-full"></div>
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
