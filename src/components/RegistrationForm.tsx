'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown,
  Building,
  GraduationCap,
  User,
  Users
} from 'lucide-react';
import {
  YEAR_LEVELS,
  MEMBERSHIP_STATUSES,
  CHURCH_DEPARTMENTS,
  SUGGESTED_HOSTELS,
  SUGGESTED_PROGRAMMES,
  YearLevel,
  MembershipStatus,
  ChurchDepartment
} from '@/lib/types';

interface FormData {
  full_name: string;
  phone: string;
  email: string;
  dob: string;
  programme: string;
  year_level: YearLevel | '';
  hostel: string;
  membership_status: MembershipStatus | '';
  home_location: string;
  department: ChurchDepartment | '';
}

const initialForm: FormData = {
  full_name: '',
  phone: '',
  email: '',
  dob: '',
  programme: '',
  year_level: '',
  hostel: '',
  membership_status: 'Pentecost Member',
  home_location: '',
  department: 'None / General Member',
};

export default function RegistrationForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{ form: FormData; id: string } | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!form.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    } else if (form.full_name.trim().split(' ').length < 2) {
      newErrors.full_name = 'Please provide both your first name and surname';
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required for follow-up';
    } else if (!/^[+0-9\s-]{9,15}$/.test(form.phone.trim())) {
      newErrors.phone = 'Enter a valid phone number (e.g. 0244123456)';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!form.dob) {
      newErrors.dob = 'Date of birth is required';
    }

    if (!form.programme.trim()) {
      newErrors.programme = 'Select or enter your programme of study';
    }

    if (!form.year_level) {
      newErrors.year_level = 'Select your year level';
    }

    if (!form.hostel.trim()) {
      newErrors.hostel = 'Specify your campus hall or hostel';
    }

    if (!form.home_location.trim()) {
      newErrors.home_location = 'Enter your hometown or vacation location';
    }

    if (!form.membership_status) {
      newErrors.membership_status = 'Select your membership status';
    }

    if (!form.department) {
      newErrors.department = 'Select your church department or General Member';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      window.scrollTo({ top: 250, behavior: 'smooth' });
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit registration');
      }

      setSubmittedData({ form: { ...form }, id: data.memberId || 'REC-' + Date.now().toString().slice(-6) });
      setForm(initialForm);
      setErrors({});
      window.scrollTo({ top: 150, behavior: 'smooth' });
    } catch (err: any) {
      setSubmitError(err.message || 'An error occurred while submitting your registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedData) {
    return (
      <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6 sm:p-8 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Registration Recorded
            </h2>
            <p className="text-xs text-slate-500">
              Reference: <span className="font-mono text-slate-800 font-semibold">{submittedData.id}</span>
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
          Thank you, <strong className="text-slate-900">{submittedData.form.full_name}</strong>. Your record has been submitted to the PENSA UMaT Secretariat. You will be contacted regarding your Family Unit allocation.
        </p>

        {/* Tabular Profile Summary */}
        <div className="border border-slate-200 rounded-md bg-slate-50/50 p-4 mb-6 text-xs text-slate-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <span className="text-slate-500 block">Full Name</span>
              <span className="font-medium text-slate-900">{submittedData.form.full_name}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Phone</span>
              <span className="font-medium text-slate-900">{submittedData.form.phone}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Programme</span>
              <span className="font-medium text-slate-900">{submittedData.form.programme}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Year Level</span>
              <span className="font-medium text-slate-900">{submittedData.form.year_level}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Hall / Hostel</span>
              <span className="font-medium text-slate-900">{submittedData.form.hostel}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Membership Status</span>
              <span className="font-medium text-slate-900">{submittedData.form.membership_status}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Department</span>
              <span className="font-medium text-slate-900">{submittedData.form.department}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Hometown / Vacation Location</span>
              <span className="font-medium text-slate-900">{submittedData.form.home_location}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setSubmittedData(null)}
          className="w-full sm:w-auto px-5 py-2 rounded-md bg-[#0A192F] hover:bg-[#122A4E] text-white text-xs font-semibold transition-colors"
        >
          Submit Another Registration
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-300 shadow-sm overflow-hidden">
      {/* Form Header */}
      <div className="border-b border-slate-200 px-6 py-5 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Membership Registration Form
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Please enter your academic, residential, and fellowship details below.
            </p>
          </div>
          <span className="hidden sm:inline-block text-[11px] font-medium px-2 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200">
            All fields mandatory
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
        {submitError && (
          <div className="p-3.5 rounded-md bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Unable to complete registration</p>
              <p className="mt-0.5 text-amber-800">{submitError}</p>
            </div>
          </div>
        )}

        {/* Section 1: Personal Details */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-200 mb-4">
            1. Personal Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Kwadwo Asare Boateng"
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                className={`w-full px-3 py-2 rounded-md border text-xs sm:text-sm text-slate-900 outline-none transition-colors ${
                  errors.full_name ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-[#0A192F] focus:ring-1 focus:ring-[#0A192F]'
                }`}
              />
              {errors.full_name && <p className="text-[11px] text-red-600 mt-1">{errors.full_name}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number (WhatsApp) <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="024 123 4567"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={`w-full px-3 py-2 rounded-md border text-xs sm:text-sm text-slate-900 outline-none transition-colors ${
                  errors.phone ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-[#0A192F] focus:ring-1 focus:ring-[#0A192F]'
                }`}
              />
              {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="kboateng@st.umat.edu.gh"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full px-3 py-2 rounded-md border text-xs sm:text-sm text-slate-900 outline-none transition-colors ${
                  errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-[#0A192F] focus:ring-1 focus:ring-[#0A192F]'
                }`}
              />
              {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
                className={`w-full px-3 py-2 rounded-md border text-xs sm:text-sm text-slate-900 outline-none transition-colors ${
                  errors.dob ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-[#0A192F] focus:ring-1 focus:ring-[#0A192F]'
                }`}
              />
              {errors.dob && <p className="text-[11px] text-red-600 mt-1">{errors.dob}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hometown / Vacation Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Kumasi, Ashanti Region"
                value={form.home_location}
                onChange={(e) => setForm({ ...form, home_location: e.target.value })}
                className={`w-full px-3 py-2 rounded-md border text-xs sm:text-sm text-slate-900 outline-none transition-colors ${
                  errors.home_location ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-[#0A192F] focus:ring-1 focus:ring-[#0A192F]'
                }`}
              />
              {errors.home_location && <p className="text-[11px] text-red-600 mt-1">{errors.home_location}</p>}
            </div>
          </div>
        </div>

        {/* Section 2: Academic Details */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-200 mb-4">
            2. Academic Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Programme of Study <span className="text-red-500">*</span>
              </label>
              <input
                list="programmes-list"
                type="text"
                placeholder="Select or type your programme"
                value={form.programme}
                onChange={(e) => setForm({ ...form, programme: e.target.value })}
                className={`w-full px-3 py-2 rounded-md border text-xs sm:text-sm text-slate-900 outline-none transition-colors ${
                  errors.programme ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-[#0A192F] focus:ring-1 focus:ring-[#0A192F]'
                }`}
              />
              <datalist id="programmes-list">
                {SUGGESTED_PROGRAMMES.map((prog) => (
                  <option key={prog} value={prog} />
                ))}
              </datalist>
              {errors.programme && <p className="text-[11px] text-red-600 mt-1">{errors.programme}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Current Year Level <span className="text-red-500">*</span>
              </label>
              <select
                value={form.year_level}
                onChange={(e) => setForm({ ...form, year_level: e.target.value as YearLevel })}
                className={`w-full px-3 py-2 rounded-md border text-xs sm:text-sm text-slate-900 bg-white outline-none transition-colors ${
                  errors.year_level ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-[#0A192F] focus:ring-1 focus:ring-[#0A192F]'
                }`}
              >
                <option value="">Select Level</option>
                {YEAR_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
              {errors.year_level && <p className="text-[11px] text-red-600 mt-1">{errors.year_level}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hall of Residence / Hostel <span className="text-red-500">*</span>
              </label>
              <input
                list="hostels-list"
                type="text"
                placeholder="e.g. KT Hall, Chamber of Mines, Grace Hostel"
                value={form.hostel}
                onChange={(e) => setForm({ ...form, hostel: e.target.value })}
                className={`w-full px-3 py-2 rounded-md border text-xs sm:text-sm text-slate-900 outline-none transition-colors ${
                  errors.hostel ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-[#0A192F] focus:ring-1 focus:ring-[#0A192F]'
                }`}
              />
              <datalist id="hostels-list">
                {SUGGESTED_HOSTELS.map((h) => (
                  <option key={h} value={h} />
                ))}
              </datalist>
              {errors.hostel && <p className="text-[11px] text-red-600 mt-1">{errors.hostel}</p>}
            </div>
          </div>
        </div>

        {/* Section 3: Fellowship Details */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-200 mb-4">
            3. Fellowship Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Membership Status <span className="text-red-500">*</span>
              </label>
              <select
                value={form.membership_status}
                onChange={(e) => setForm({ ...form, membership_status: e.target.value as MembershipStatus })}
                className="w-full px-3 py-2 rounded-md border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white outline-none focus:border-[#0A192F] focus:ring-1 focus:ring-[#0A192F]"
              >
                {MEMBERSHIP_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500 mt-1">
                Select Associate if you belong to another denomination but fellowship with PENSA.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Church Department / Ministry <span className="text-red-500">*</span>
              </label>
              <select
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value as ChurchDepartment })}
                className="w-full px-3 py-2 rounded-md border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white outline-none focus:border-[#0A192F] focus:ring-1 focus:ring-[#0A192F]"
              >
                {CHURCH_DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500 mt-1">
                Select None / General Member if not currently serving on a committee.
              </p>
            </div>
          </div>
        </div>

        {/* Submission Button */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-500 order-2 sm:order-1">
            By submitting, you confirm that the information provided is accurate.
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto px-6 py-2.5 rounded-md bg-[#0A192F] hover:bg-[#122A4E] text-white text-xs sm:text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2 order-1 sm:order-2"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{submitting ? 'Submitting Registration...' : 'Submit Registration'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
