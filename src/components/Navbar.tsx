'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ShieldCheck,
  UserCheck,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
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

  const primaryLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/ministries', label: 'Ministries' },
    { href: '/family-units', label: 'Family Units' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#00205B]/95 backdrop-blur-md text-white border-b border-[#0038A8]/60 shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Identity with Official Logos */}
          <Link href="/" className="flex items-center gap-3 focus:outline-none shrink-0 group">
            <div className="flex items-center gap-2">
              <img
                src="/images/cop-logo.png"
                alt="The Church of Pentecost"
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow brightness-105"
              />
              <img
                src="/images/pensaumatofficial.jpg"
                alt="Official PENSA UMaT Logo"
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow brightness-105 rounded-full group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base text-white tracking-tight leading-tight group-hover:text-[#FACC15] transition-colors">
                PENSA UMaT
              </span>
              <span className="text-[10px] text-yellow-300 font-medium leading-none mt-0.5">
                The Church of Pentecost &bull; Tarkwa
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  pathname === link.href
                    ? 'bg-[#0038A8] text-[#FACC15] shadow-inner'
                    : 'text-white hover:text-[#FACC15] hover:bg-[#002B7F]'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/register"
              className={`ml-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow ${
                pathname === '/register'
                  ? 'bg-white text-[#00205B] ring-2 ring-[#FACC15]'
                  : 'bg-[#FACC15] hover:bg-yellow-400 text-[#00205B]'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-[#00205B]" />
              <span>Membership Census</span>
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className={`ml-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    pathname === '/dashboard'
                      ? 'bg-[#0038A8] text-white'
                      : 'text-yellow-300 hover:text-white hover:bg-[#002B7F]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <LayoutDashboard className="w-3.5 h-3.5 text-[#FACC15]" />
                    Dashboard
                  </span>
                </Link>

                <div className="h-4 w-px bg-white/20 mx-2" />

                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/80 max-w-[100px] truncate">
                    {execUser?.name || 'Executive'}
                  </span>
                  <button
                    onClick={handleLogout}
                    title="Sign Out"
                    className="p-1.5 rounded-md text-red-400 hover:text-white hover:bg-red-600 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="ml-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/30 text-white hover:text-[#FACC15] hover:border-[#FACC15] hover:bg-white/5 transition-colors flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#FACC15]" />
                <span>Executive Login</span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden gap-2">
            <Link
              href="/register"
              className="px-2.5 py-1 rounded bg-[#FACC15] text-[#00205B] text-[11px] font-bold shadow"
            >
              Census
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-white hover:text-[#FACC15] hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#0038A8] bg-[#00205B] px-4 pt-3 pb-6 space-y-1 text-sm">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg font-semibold ${
                pathname === link.href ? 'bg-[#0038A8] text-[#FACC15]' : 'text-white hover:bg-[#002B7F] hover:text-[#FACC15]'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-2">
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg font-bold text-center text-[#00205B] bg-[#FACC15] hover:bg-yellow-400 shadow"
            >
              2025/2026 Membership Census
            </Link>
          </div>

          <div className="pt-2 border-t border-[#0038A8]">
            {isLoggedIn ? (
              <div className="space-y-1">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-[#FACC15] hover:bg-white/5 font-semibold"
                >
                  Executive Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-red-400 hover:text-white hover:bg-red-600 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-white hover:text-[#FACC15] hover:bg-white/5 border border-white/20 text-center font-medium"
              >
                Executive Portal Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
