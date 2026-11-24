'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';

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
    <div className="flex-1 flex flex-col justify-center items-center py-14 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="w-full max-w-md">
        <div className="mb-5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00205B] hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Public Overview
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-[#0038A8]/20 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#00205B] text-white p-6 border-b border-[#0038A8]">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#FACC15] flex items-center justify-center font-black text-[#00205B] text-xs">
                P
              </div>
              <span className="text-xs uppercase tracking-wider text-yellow-300 font-bold">
                Secretariat Administration
              </span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">Executive Login</h2>
            <p className="text-xs text-white/80 mt-0.5">
              Authorized access for PENSA UMaT committee heads and executives.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#00205B] mb-1">
                Executive Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="admin@pensa-umat.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm text-neutral-900 bg-white outline-none focus:border-[#0038A8] focus:ring-1 focus:ring-[#0038A8]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#00205B] mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm text-neutral-900 bg-white outline-none focus:border-[#0038A8] focus:ring-1 focus:ring-[#0038A8]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-bold text-yellow-400 bg-[#00205B] hover:bg-[#0038A8] transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm disabled:opacity-60 border border-yellow-400/40 shadow-md"
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
            <div className="mt-4 pt-3 border-t border-neutral-200 text-xs text-neutral-600 flex items-center justify-between">
              <span>Demo admin access:</span>
              <button
                type="button"
                onClick={fillQuickCredentials}
                className="text-[11px] font-bold text-red-600 hover:text-red-700 underline"
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
