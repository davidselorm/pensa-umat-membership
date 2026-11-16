'use client';

import React, { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  Calendar,
  GraduationCap,
  Building2,
  Home,
  Users2,
  HeartHandshake,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ShieldAlert,
  Sparkles
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
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!form.full_name.trim()) {
      newErrors.full_name = 'Please enter your full name';
    } else if (form.full_name.trim().split(' ').length < 2) {
      newErrors.full_name = 'Please provide both your first and last name';
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required for church communications';
    } else if (!/^[+0-9\s-]{9,15}$/.test(form.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number (e.g. 0244123456 or +233...)';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!form.dob) {
      newErrors.dob = 'Date of birth is required';
    }

    if (!form.programme.trim()) {
      newErrors.programme = 'Please enter or select your programme of study';
    }

    if (!form.year_level) {
      newErrors.year_level = 'Please select your current year level';
    }

    if (!form.hostel.trim()) {
      newErrors.hostel = 'Please specify your hall of residence or hostel';
    }

    if (!form.membership_status) {
      newErrors.membership_status = 'Please indicate your membership status';
    }

    if (!form.home_location.trim()) {
      newErrors.home_location = 'Please state your hometown or city when on vacation';
    }

    if (!form.department) {
      newErrors.department = 'Please select your church department';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      // Scroll to the first error
      window.scrollTo({ top: 300, behavior: 'smooth' });
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

      setSubmittedData({ ...form });
      setForm(initialForm);
      setErrors({});
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedData) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-10 text-center max-w-2xl mx-auto animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F294A] tracking-tight">
          Registration Complete!
        </h2>
        <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-md mx-auto">
          Ayekoo & Welcome! Your details have been successfully recorded in the official PENSA UMaT directory.
        </p>

        {/* Summary Card */}
        <div className="mt-6 text-left bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2">
            Submitted Profile Summary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div>
              <span className="text-slate-500 block">Full Name</span>
              <span className="font-semibold text-slate-800">{submittedData.full_name}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Phone (WhatsApp)</span>
              <span className="font-semibold text-slate-800">{submittedData.phone}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Email</span>
              <span className="font-semibold text-slate-800 break-all">{submittedData.email}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Programme & Level</span>
              <span className="font-semibold text-slate-800">
                {submittedData.year_level} &bull; {submittedData.programme}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Hall / Hostel</span>
              <span className="font-semibold text-slate-800">{submittedData.hostel}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Membership Status</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800">
                {submittedData.membership_status}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Church Department</span>
              <span className="font-semibold text-[#0F294A]">{submittedData.department}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Vacation Hometown</span>
              <span className="font-semibold text-slate-800">{submittedData.home_location}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setSubmittedData(null)}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#0F294A] hover:bg-[#153A68] text-white rounded-xl text-sm font-semibold shadow transition-all active:scale-95"
          >
            Register Another Member
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden max-w-3xl mx-auto">
      {/* Form Header Banner */}
      <div className="bg-gradient-to-r from-[#0F294A] via-[#153A68] to-[#0F294A] px-6 py-6 sm:px-8 text-white relative">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          Official Campus Fellowship Registration
        </div>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight">
          PENSA UMaT Member Registration
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
          Please fill out the form accurately below. Your details help our executives and committee heads connect with you for fellowship, pastoral care, and family unit activities.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
        {submitError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Registration submission failed</p>
              <p className="text-xs mt-0.5">{submitError}</p>
            </div>
          </div>
        )}

        {/* Section 1: Personal & Contact */}
        <div className="space-y-4">
          <div className="border-b border-slate-200 pb-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F294A] flex items-center gap-2">
              <User className="w-4 h-4 text-amber-500" />
              1. Personal & Contact Information
            </h3>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Kwadwo Mensah Boateng"
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border text-sm bg-slate-50/50 focus:bg-white transition-all outline-none ${
                  errors.full_name
                    ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                    : 'border-slate-300 focus:border-[#0F294A] focus:ring-2 focus:ring-blue-100'
                }`}
              />
            </div>
            {errors.full_name && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.full_name}
              </p>
            )}
          </div>

          {/* Phone & Email Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone Number (WhatsApp) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  placeholder="e.g. 0244123456 or +233..."
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={`w-full pl-9 pr-3 py-3 rounded-xl border text-sm bg-slate-50/50 focus:bg-white transition-all outline-none ${
                    errors.phone
                      ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                      : 'border-slate-300 focus:border-[#0F294A] focus:ring-2 focus:ring-blue-100'
                  }`}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">This will be used for official notices & WhatsApp outreach</p>
              {errors.phone && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  placeholder="e.g. name@st.umat.edu.gh"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`w-full pl-9 pr-3 py-3 rounded-xl border text-sm bg-slate-50/50 focus:bg-white transition-all outline-none ${
                    errors.email
                      ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                      : 'border-slate-300 focus:border-[#0F294A] focus:ring-2 focus:ring-blue-100'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Date of Birth & Where You Stay Back at Home */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* DOB */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  className={`w-full pl-9 pr-3 py-3 rounded-xl border text-sm bg-slate-50/50 focus:bg-white transition-all outline-none ${
                    errors.dob
                      ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                      : 'border-slate-300 focus:border-[#0F294A] focus:ring-2 focus:ring-blue-100'
                  }`}
                />
              </div>
              {errors.dob && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.dob}
                </p>
              )}
            </div>

            {/* Where You Stay Back at Home */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Where You Stay Back at Home <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Home className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="e.g. Kumasi, Bantama or Accra, Madina"
                  value={form.home_location}
                  onChange={(e) => setForm({ ...form, home_location: e.target.value })}
                  className={`w-full pl-9 pr-3 py-3 rounded-xl border text-sm bg-slate-50/50 focus:bg-white transition-all outline-none ${
                    errors.home_location
                      ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                      : 'border-slate-300 focus:border-[#0F294A] focus:ring-2 focus:ring-blue-100'
                  }`}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Hometown/City when school is on vacation</p>
              {errors.home_location && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.home_location}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Academic & Campus Residence */}
        <div className="space-y-4 pt-2">
          <div className="border-b border-slate-200 pb-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F294A] flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-amber-500" />
              2. Academic & Campus Residence
            </h3>
          </div>

          {/* Programme of Study */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Programme of Study <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              list="programme-suggestions"
              placeholder="e.g. BSc Computer Science and Engineering"
              value={form.programme}
              onChange={(e) => setForm({ ...form, programme: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border text-sm bg-slate-50/50 focus:bg-white transition-all outline-none ${
                errors.programme
                  ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                  : 'border-slate-300 focus:border-[#0F294A] focus:ring-2 focus:ring-blue-100'
              }`}
            />
            <datalist id="programme-suggestions">
              {SUGGESTED_PROGRAMMES.map((prog) => (
                <option key={prog} value={prog} />
              ))}
            </datalist>
            {errors.programme && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.programme}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Year Level */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Year Level <span className="text-red-500">*</span>
              </label>
              <select
                value={form.year_level}
                onChange={(e) => setForm({ ...form, year_level: e.target.value as YearLevel })}
                className={`w-full px-3 py-3 rounded-xl border text-sm bg-slate-50/50 focus:bg-white transition-all outline-none ${
                  errors.year_level
                    ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                    : 'border-slate-300 focus:border-[#0F294A] focus:ring-2 focus:ring-blue-100'
                }`}
              >
                <option value="">-- Select Year Level --</option>
                {YEAR_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {errors.year_level && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.year_level}
                </p>
              )}
            </div>

            {/* Hostel / Hall of Residence */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Hostel / Hall of Residence <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Building2 className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  list="hostel-suggestions"
                  placeholder="e.g. KT Hall, Chamber, Grace Hostel"
                  value={form.hostel}
                  onChange={(e) => setForm({ ...form, hostel: e.target.value })}
                  className={`w-full pl-9 pr-3 py-3 rounded-xl border text-sm bg-slate-50/50 focus:bg-white transition-all outline-none ${
                    errors.hostel
                      ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                      : 'border-slate-300 focus:border-[#0F294A] focus:ring-2 focus:ring-blue-100'
                  }`}
                />
              </div>
              <datalist id="hostel-suggestions">
                {SUGGESTED_HOSTELS.map((hostel) => (
                  <option key={hostel} value={hostel} />
                ))}
              </datalist>
              {errors.hostel && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.hostel}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Fellowship & Church Ministry */}
        <div className="space-y-4 pt-2">
          <div className="border-b border-slate-200 pb-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F294A] flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-amber-500" />
              3. Church Membership & Ministry
            </h3>
          </div>

          {/* Membership Status */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Membership Status <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MEMBERSHIP_STATUSES.map((status) => {
                const isSelected = form.membership_status === status;
                return (
                  <label
                    key={status}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#0F294A] bg-blue-50/60 ring-2 ring-[#0F294A]/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="membership_status"
                      value={status}
                      checked={isSelected}
                      onChange={() => setForm({ ...form, membership_status: status })}
                      className="text-[#0F294A] focus:ring-[#0F294A]"
                    />
                    <div>
                      <span className="text-sm font-semibold text-slate-800">{status}</span>
                      <p className="text-xs text-slate-500">
                        {status === 'Pentecost Member'
                          ? 'Baptized/Member of The Church of Pentecost'
                          : 'From another church / non-denominational brother/sister'}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
            {errors.membership_status && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.membership_status}
              </p>
            )}
          </div>

          {/* Church Department */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Department You Serve in Church <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Users2 className="w-4 h-4" />
              </div>
              <select
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value as ChurchDepartment })}
                className={`w-full pl-9 pr-3 py-3 rounded-xl border text-sm bg-slate-50/50 focus:bg-white transition-all outline-none ${
                  errors.department
                    ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                    : 'border-slate-300 focus:border-[#0F294A] focus:ring-2 focus:ring-blue-100'
                }`}
              >
                {CHURCH_DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Select &quot;None / General Member&quot; if you have not joined a department yet or wish to explore.
            </p>
            {errors.department && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.department}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-[#0F294A] via-[#153A68] to-[#0F294A] hover:opacity-95 shadow-lg shadow-blue-950/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-base disabled:opacity-50 cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting Your Registration...</span>
              </>
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowRight className="w-5 h-5 text-amber-400" />
              </>
            )}
          </button>
          <p className="text-center text-xs text-slate-400 mt-3">
            By submitting, you agree to receive official PENSA UMaT fellowship communications.
          </p>
        </div>
      </form>
    </div>
  );
}
