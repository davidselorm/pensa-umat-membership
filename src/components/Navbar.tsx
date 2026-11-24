'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShieldCheck, UserCheck, Menu, X, LogOut, Home, Info, Users, Church, LayoutDashboard } from 'lucide-react';

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

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/ministries', label: 'Ministries' },
    { href: '/family-units', label: 'Family Units' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A192F]/90 backdrop-blur-md text-white border-b border-slate-800/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Authentic Identity */}
          <Link href="/" className="flex items-center gap-3 focus:outline-none">
            <div className="w-9 h-9 rounded-lg bg-[#D97706] flex items-center justify-center text-white font-bold text-xs tracking-wider shadow-sm">
              <span>PENSA</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base text-white tracking-tight leading-tight">
                PENSA UMaT
              </span>
              <span className="text-[11px] text-slate-400 font-normal leading-none mt-0.5">
                The Church of Pentecost &bull; Tarkwa
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/register"
              className={`ml-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                pathname === '/register'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500 hover:text-slate-950'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Membership Census</span>
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className={`ml-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    pathname === '/dashboard'
                      ? 'bg-white/15 text-white'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
                    Dashboard
                  </span>
                </Link>

                <div className="h-4 w-px bg-slate-700 mx-2" />

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">
                    {execUser?.name || 'Executive'}
                  </span>
                  <button
                    onClick={handleLogout}
                    title="Sign Out"
                    className="p-1.5 rounded-md text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="ml-2 px-3 py-1.5 rounded-md text-xs font-medium border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 hover:bg-white/5 transition-colors flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Executive Login</span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0A192F] px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/register"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30"
          >
            Membership Census &bull; Register
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/5"
              >
                Executive Dashboard
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-red-400 hover:bg-white/5 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-white/5 border border-slate-800"
            >
              Executive Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
