import React from 'react';
import RegistrationForm from '@/components/RegistrationForm';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="flex-1 py-10 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00205B] hover:text-red-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Overview
        </Link>
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00205B] hover:text-red-600 transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
          Executive Login
        </Link>
      </div>

      <RegistrationForm />
    </div>
  );
}
