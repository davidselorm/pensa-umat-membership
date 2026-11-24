'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ServiceCountdown from '@/components/ServiceCountdown';
import HostelCellFinder from '@/components/HostelCellFinder';
import CampusLifeGallery from '@/components/CampusLifeGallery';
import {
  Clock,
  MapPin,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  Award,
  Flame,
  CheckCircle2,
  Calendar,
  Sparkles,
  BookOpen,
  Church,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

export default function HomePage() {
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);

  const stats = [
    { label: 'Active Fellowship Members', value: '1,200+', icon: <Users className="w-4 h-4 text-amber-400" /> },
    { label: 'Campus Residential Cells', value: '4 Units', icon: <Compass className="w-4 h-4 text-emerald-400" /> },
    { label: 'Specialized Ministries', value: '10 Arms', icon: <Award className="w-4 h-4 text-sky-400" /> },
    { label: 'Sunday Divine Sessions', value: '2 Services', icon: <Church className="w-4 h-4 text-purple-400" /> },
  ];

  const serviceSchedule = [
    {
      id: 'sunday',
      title: 'Sunday Divine Service',
      badge: 'Main Campus Gathering',
      time: 'Session 1: 07:30 AM &bull; Session 2: 09:30 AM',
      venue: 'UMaT Main Auditorium',
      desc: 'High praises, anointed worship by The Minstrels, ministry of the Word, and prophetic prayers tailored for university students.',
      highlights: ['Over 1,200 students gather weekly', 'Intensive Word ministration', 'Freshers & visitor welcome', 'Communion & prayer sessions'],
      gradient: 'from-amber-500/10 via-slate-900/60 to-[#0A192F]',
      accentColor: 'border-amber-500/30 text-amber-400',
    },
    {
      id: 'midweek',
      title: 'Midweek Teaching & Miracle Service',
      badge: 'Bible Exposition',
      time: 'Wednesdays &bull; 6:30 PM &ndash; 8:15 PM',
      venue: 'Campus Fellowship Center',
      desc: 'Systematic expository Bible study, practical student life discussions, spiritual warfare, and miracles.',
      highlights: ['Interactive scripture analysis', 'Campus Christian ethics & relationships', 'Examination & career guidance', 'Miracle & deliverance ministry'],
      gradient: 'from-sky-500/10 via-slate-900/60 to-[#0A192F]',
      accentColor: 'border-sky-500/30 text-sky-400',
    },
    {
      id: 'dunamis',
      title: 'Dunamis Hour & Friday Encounters',
      badge: 'Holy Ghost Prayer Vigils',
      time: 'Fridays &bull; 9:00 PM (Bi-Weekly)',
      venue: 'UMaT Main Auditorium / Fellowship Center',
      desc: 'Intense Holy Ghost prayer vigils, revival impartation, semester examination intercession, and breakthrough sessions.',
      highlights: ['Fervent Holy Ghost prayer rounds', 'Impartation for academic excellence', 'Spiritual gifts activation', 'All-night breakthrough prayer'],
      gradient: 'from-rose-500/10 via-slate-900/60 to-[#0A192F]',
      accentColor: 'border-rose-500/30 text-rose-400',
    },
    {
      id: 'cells',
      title: 'Residential Family Units (Cells)',
      badge: 'Hostel Fellowships',
      time: 'Sundays &bull; 4:30 PM &ndash; 5:30 PM',
      venue: 'KT Hall, Chamber of Mines, Gold Refinery & Off-Campus',
      desc: 'Close-knit fellowship, pastoral check-ins, prayer walks, and academic brotherhood right where you live.',
      highlights: ['Hostel room-to-room follow ups', 'Calculus & engineering study circles', 'Personal welfare support', 'Discipleship & close friendship'],
      gradient: 'from-emerald-500/10 via-slate-900/60 to-[#0A192F]',
      accentColor: 'border-emerald-500/30 text-emerald-400',
    },
  ];

  const pillars = [
    {
      icon: <Flame className="w-5 h-5 text-amber-400" />,
      title: 'Spiritual Fervor & Holy Ghost Power',
      description: 'We believe prayer changes atmospheres. Through morning dawn prayers, Friday Dunamis encounters, and uncompromised Bible teaching, students maintain a burning passion for Jesus Christ.',
      gradient: 'hover:border-amber-500/40',
      badge: 'Spiritual Grounding',
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-sky-400" />,
      title: 'Academic & Engineering Excellence',
      description: 'UMaT engineering courses require rigorous diligence. Our Academic Committee coordinates calculus clinics, engineering mechanics tutorials, and past question banks to help members graduate with top honours.',
      gradient: 'hover:border-sky-500/40',
      badge: 'Academic Mentorship',
    },
    {
      icon: <Compass className="w-5 h-5 text-emerald-400" />,
      title: 'Close-Knit Residential Care (Cells)',
      description: 'Whether you reside in KT Hall, Chamber of Mines, Gold Refinery, or off-campus in Tarkwa Banso, our Family Units ensure you have an immediate spiritual family, prayer support, and welfare coverage.',
      gradient: 'hover:border-emerald-500/40',
      badge: 'Pastoral Care',
    },
  ];

  const censusBenefits = [
    { title: 'Immediate Hostel Cell Allocation', desc: 'Placed in your designated residential cell in KT Hall, Chamber, or Tarkwa Banso.' },
    { title: 'Academic Tutorial Groups', desc: 'Connected to seniors and high-GPA peers in your engineering or science programme.' },
    { title: 'Ministry & Wings Placement', desc: 'Find your area of service in Choir, Media, Prayer Force, Protocol, or BPC.' },
    { title: 'Fellowship Welfare Coverage', desc: 'Pastoral support, emergency check-ins, and semester welfare assistance.' },
  ];

  return (
    <div className="flex-1 bg-slate-50 pb-20 overflow-x-hidden">
      {/* Premier Hero Section with Fluid Transitions & Tri-Crest Badges */}
      <section className="bg-[#0A192F] text-white pt-16 sm:pt-20 pb-28 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        {/* Dynamic Glowing Mesh Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/20 via-slate-900/50 to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-25" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none animate-glow" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Official Tri-Crest Badge */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6">
            <div className="inline-flex items-center gap-2.5 sm:gap-3.5 bg-slate-900/80 px-4 py-2 rounded-2xl border border-slate-700/70 shadow-2xl backdrop-blur-md transition-all hover:border-amber-500/40">
              <img
                src="/images/cop-logo.png"
                alt="The Church of Pentecost"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow brightness-105"
              />
              <div className="h-6 w-px bg-slate-700" />
              <img
                src="/images/pensaumatofficial.jpg"
                alt="Official PENSA UMaT Logo"
                className="w-11 h-11 sm:w-14 sm:h-14 object-contain rounded-full drop-shadow-xl hover:scale-105 transition-transform"
              />
              <div className="h-6 w-px bg-slate-700" />
              <img
                src="/images/umat-logo.jpg"
                alt="UMaT Crest"
                className="w-9 h-9 sm:w-11 sm:h-11 object-contain rounded drop-shadow brightness-105"
              />
            </div>
          </div>

          {/* Academic Session Indicator */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold mb-5 tracking-wide uppercase shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>The Church of Pentecost &bull; UMaT Chapter, Tarkwa</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            MINING THE TREASURES IN PEOPLE FOR CHRIST
          </h1>

          <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Welcome to PENSA UMaT. A family of faith, academic excellence, and purposeful student leadership on the campus of the University of Mines and Technology.
          </p>

          {/* Interactive CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/register"
              className="px-6 py-3 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-xs sm:text-sm font-semibold shadow-xl shadow-amber-950/25 transition-all active:scale-95 flex items-center gap-2 group"
            >
              <span>Membership Census 2025/2026</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#cell-finder"
              className="px-5 py-3 rounded-lg border border-slate-700 bg-white/5 hover:bg-white/10 text-slate-200 text-xs sm:text-sm font-medium transition-all"
            >
              Find Your Campus Cell
            </a>

            <Link
              href="/ministries"
              className="px-5 py-3 rounded-lg border border-transparent hover:border-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition-all"
            >
              Explore Ministries &rarr;
            </Link>
          </div>

          {/* Fellowship Stats Ribbon */}
          <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm hover:border-slate-700 transition-all card-hover"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xl sm:text-2xl font-black text-white font-mono">{s.value}</span>
                  {s.icon}
                </div>
                <span className="text-[11px] text-slate-400 font-medium leading-tight block">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Service Countdown Widget */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 -mt-12 relative z-20">
        <ServiceCountdown />
      </section>

      {/* Interactive Fellowship Rhythm & Service Explorer */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
          <div>
            <span className="text-xs uppercase font-bold text-amber-600 tracking-wider">
              Fellowship Rhythm
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Weekly Service Schedules
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Click on each gathering to view exact meeting times, campus venues, and program highlights.
            </p>
          </div>

          {/* Interactive Service Switcher Pills */}
          <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
            {serviceSchedule.map((svc, idx) => (
              <button
                key={svc.id}
                onClick={() => setActiveServiceIdx(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeServiceIdx === idx
                    ? 'bg-[#0A192F] text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {svc.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Active Service Spotlight Card with Smooth Transition */}
        <div className="bg-[#0A192F] text-white rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl mb-6 relative overflow-hidden transition-all duration-300">
          <div className="absolute right-0 top-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border mb-3 inline-block ${serviceSchedule[activeServiceIdx].accentColor}`}>
                {serviceSchedule[activeServiceIdx].badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {serviceSchedule[activeServiceIdx].title}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                {serviceSchedule[activeServiceIdx].desc}
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: serviceSchedule[activeServiceIdx].time }} />
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{serviceSchedule[activeServiceIdx].venue}</span>
                </div>
              </div>
            </div>

            {/* Highlights Box */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 min-w-[280px]">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-2.5">
                Service Highlights:
              </span>
              <ul className="space-y-2 text-xs text-slate-300">
                {serviceSchedule[activeServiceIdx].highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 4 Quick Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceSchedule.map((svc, idx) => (
            <div
              key={idx}
              onClick={() => setActiveServiceIdx(idx)}
              className={`p-5 rounded-xl border cursor-pointer transition-all card-hover flex flex-col justify-between ${
                activeServiceIdx === idx
                  ? 'bg-amber-50/60 border-amber-500/60 shadow-md ring-1 ring-amber-500/20'
                  : 'bg-white border-slate-200/90 hover:bg-slate-50'
              }`}
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block mb-1">
                  Gathering {idx + 1}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                  {svc.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3">
                  {svc.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 flex items-center justify-between">
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{svc.time.split('&bull;')[0]}</span>
                </span>
                <span className={`text-xs font-semibold ${activeServiceIdx === idx ? 'text-amber-600' : 'text-slate-400'}`}>
                  {activeServiceIdx === idx ? 'Active' : 'View'} &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Campus Life & Fellowship Media Gallery */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <CampusLifeGallery />
      </section>

      {/* Interactive Hostel Cell Locator */}
      <section id="cell-finder" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <HostelCellFinder />
      </section>

      {/* Pillars of PENSA UMaT */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold text-amber-600 tracking-wider">
            Why We Are Here
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Built for Your Campus Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            Balancing rigorous engineering and science studies with a vibrant, uncompromised Christian walk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className={`bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm card-hover flex flex-col justify-between ${p.gradient}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
                    {p.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{p.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <Link
                  href="/about"
                  className="text-[11px] font-semibold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
                >
                  <span>Learn about our mission</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Membership Census Showcase (Replacing bulky form with sleek CTA experience) */}
      <section id="census" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-gradient-to-br from-[#0A192F] via-[#0E2442] to-[#0A192F] rounded-2xl border border-slate-800 p-8 sm:p-12 shadow-2xl text-white relative overflow-hidden">
          {/* Ambient Glow & Mesh */}
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-30 pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 mb-4 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 rounded-full w-fit">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs uppercase font-bold text-amber-300 tracking-wider">
                Official 2025/2026 Directory &bull; PENSA UMaT
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Ready for the Academic Session? Complete Your Census
            </h2>

            <p className="mt-3 text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
              All freshmen, continuing students, postgraduate researchers, and associates are required to complete the official census for the current semester. It takes less than 2 minutes.
            </p>

            {/* Value Checkpoints */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {censusBenefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-slate-900/60 border border-slate-800/80 p-3.5 rounded-xl backdrop-blur-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">{b.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="px-7 py-3 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-xs sm:text-sm font-semibold shadow-xl shadow-amber-950/30 transition-all active:scale-95 flex items-center gap-2 group"
              >
                <span>Complete Membership Census Online</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/login"
                className="px-5 py-3 rounded-lg border border-slate-700 bg-white/5 hover:bg-white/10 text-slate-300 text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>Executive Login</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
