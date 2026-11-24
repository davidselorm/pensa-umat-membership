import React from 'react';
import Link from 'next/link';
import RegistrationForm from '@/components/RegistrationForm';
import { ArrowDown, ShieldCheck, ClipboardCheck, Users, Home } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex-1 pb-16 bg-slate-50">
      {/* Institutional Hero Banner */}
      <section className="bg-[#0A192F] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold mb-4 tracking-wide uppercase">
            <span>2025 / 2026 Academic Year &bull; Membership Census</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            PENSA UMaT Membership Portal
          </h1>

          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Pentecost Students and Associates, University of Mines and Technology, Tarkwa. Complete the registration below to be assigned to a campus Family Unit and receive fellowship updates.
          </p>

          {/* Practical Notice Card */}
          <div className="mt-6 max-w-2xl mx-auto bg-slate-800/60 border border-slate-700/80 rounded-lg p-3.5 text-xs text-slate-300 text-left flex items-start gap-3">
            <ClipboardCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Notice for Students &amp; Associates: </span>
              All newly admitted students (Level 100) and continuing students across KT Hall, Chamber of Mines Hall, Gold Refinery Hall, and all off-campus hostels are expected to complete their registration.
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <a
              href="#form"
              className="px-5 py-2.5 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold shadow-sm flex items-center gap-2 transition-colors"
            >
              <span>Go to Registration Form</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <Link
              href="/login"
              className="px-4 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Executive Portal</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Registration Form Section */}
      <section id="form" className="max-w-3xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <RegistrationForm />
      </section>
    </div>
  );
}
