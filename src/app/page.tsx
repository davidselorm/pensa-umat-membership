import React from 'react';
import Link from 'next/link';
import RegistrationForm from '@/components/RegistrationForm';
import {
  Church,
  ShieldCheck,
  Users,
  Compass,
  Sparkles,
  QrCode,
  ArrowDown
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex-1 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#0F294A] via-[#123157] to-[#0F294A] text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle patterned background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Pentecost Students & Associates &bull; UMaT Tarkwa</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none">
            PENSA UMAT <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">MEMBERSHIP</span>
          </h1>

          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Welcome to the official fellowship directory portal. Register your membership, get connected with a Family Unit on campus, and thrive spiritually throughout your stay at UMaT.
          </p>

          {/* Quick Action Badges / Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#register"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm shadow-lg shadow-amber-950/30 flex items-center gap-2 transition-all active:scale-95"
            >
              <span>Register as a Member</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <Link
              href="/login"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 flex items-center gap-2 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Executive Portal</span>
            </Link>
          </div>

          {/* Highlights Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/10 text-left">
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <Users className="w-5 h-5 text-amber-400 mb-1" />
              <div className="text-lg font-bold text-white">Campus Wide</div>
              <div className="text-xs text-slate-300">All Halls, Hostels & Levels</div>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <Compass className="w-5 h-5 text-amber-400 mb-1" />
              <div className="text-lg font-bold text-white">Family Units</div>
              <div className="text-xs text-slate-300">Close-knit fellowship & care</div>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 col-span-2 sm:col-span-1">
              <Church className="w-5 h-5 text-amber-400 mb-1" />
              <div className="text-lg font-bold text-white">7+ Ministries</div>
              <div className="text-xs text-slate-300">Discover and use your gifts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Registration Form Section */}
      <section id="register" className="max-w-4xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        <RegistrationForm />
      </section>
    </div>
  );
}
