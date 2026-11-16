'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShieldCheck, UserCheck, Menu, X, LogOut, ChevronRight, Home } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [execUser, setExecUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setIsLoggedIn(data.authenticated);
        setExecUser(data.user);
      } else {
        setIsLoggedIn(false);
        setExecUser(null);
      }
    } catch {
      setIsLoggedIn(false);
      setExecUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsLoggedIn(false);
      setExecUser(null);
      router.push('/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0F294A] text-white shadow-md border-b border-[#1D4978]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D97706] to-[#F59E0B] flex items-center justify-center text-white font-bold shadow-md shadow-amber-900/20 group-hover:scale-105 transition-transform">
              <span className="text-xl tracking-tighter">P</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-white text-base sm:text-lg">PENSA UMaT</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  PORTAL
                </span>
              </div>
              <span className="text-[11px] text-slate-300 font-medium tracking-wide">
                Pentecost Students and Associates
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === '/'
                  ? 'bg-white/10 text-white'
                  : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Home className="w-4 h-4 text-amber-400" />
                Home
              </span>
            </Link>

            <Link
              href="/register"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === '/register'
                  ? 'bg-white/10 text-white'
                  : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-amber-400" />
                Member Registration
              </span>
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                    pathname.startsWith('/dashboard')
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  Dashboard
                </Link>

                <div className="flex items-center gap-2 pl-2 border-l border-white/20 ml-1">
                  <div className="text-right text-xs">
                    <div className="font-semibold text-amber-300">{execUser?.name || 'Executive'}</div>
                    <div className="text-slate-400 text-[10px]">Administrator</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    title="Log out"
                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-300 hover:text-red-300 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-sm transition-all hover:shadow active:scale-95"
              >
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                Executive Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {isLoggedIn && (
              <Link
                href="/dashboard"
                className="px-2.5 py-1 text-xs font-semibold bg-amber-500 text-slate-950 rounded-md"
              >
                Admin
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1D4978] bg-[#0c223e] px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top duration-200">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/10"
          >
            <span className="flex items-center gap-2">
              <Home className="w-4 h-4 text-amber-400" />
              Home
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>

          <Link
            href="/register"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/10"
          >
            <span className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-amber-400" />
              Member Self-Registration
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  Executive Dashboard
                </span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-red-300 hover:bg-red-500/10 text-left"
              >
                <span className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Log Out ({execUser?.name || 'Executive'})
                </span>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 mt-2 w-full py-2.5 px-4 rounded-lg text-sm font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md"
            >
              <ShieldCheck className="w-4 h-4 text-slate-950" />
              Executive Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
