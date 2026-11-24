'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock, Mail, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const fillQuickCredentials = () => {
    setEmail('admin@pensa-umat.org');
    setPassword('pensa2026!');
    setError(null);
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center py-14 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="w-full max-w-md">
        <div className="mb-5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Public Registration
          </Link>
        </div>

        <div className="bg-white rounded-lg border border-slate-300 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-[#0A192F] text-white p-6 border-b border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-[#D97706] flex items-center justify-center font-bold text-white text-xs">
                P
              </div>
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                Secretariat Administration
              </span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">Executive Login</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Authorized access for PENSA UMaT committee heads and executives.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {error && (
              <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Executive Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="admin@pensa-umat.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-md border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white outline-none focus:border-[#0A192F] focus:ring-1 focus:ring-[#0A192F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-md border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white outline-none focus:border-[#0A192F] focus:ring-1 focus:ring-[#0A192F]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-md font-semibold text-white bg-[#0A192F] hover:bg-[#122A4E] transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Sign In to Executive Dashboard</span>
              )}
            </button>

            {/* Default Credentials Notice */}
            <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span>Demo admin access:</span>
              <button
                type="button"
                onClick={fillQuickCredentials}
                className="text-[11px] font-semibold text-amber-700 hover:text-amber-800 underline"
              >
                Auto-fill credentials
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
