import React from 'react';
import RegistrationForm from '@/components/RegistrationForm';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="flex-1 py-10 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Overview
        </Link>
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A192F] hover:underline"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
          Executive Login
        </Link>
      </div>

      <RegistrationForm />
    </div>
  );
}
