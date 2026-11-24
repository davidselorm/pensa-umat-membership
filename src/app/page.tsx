import React from 'react';
import Link from 'next/link';
import RegistrationForm from '@/components/RegistrationForm';
import ServiceCountdown from '@/components/ServiceCountdown';
import HostelCellFinder from '@/components/HostelCellFinder';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  Award,
  Flame,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function HomePage() {
  const serviceSchedule = [
    {
      title: 'Sunday Divine Service',
      time: '07:30 AM &bull; Session 1<br/>09:30 AM &bull; Session 2',
      venue: 'UMaT Main Auditorium',
      desc: 'High praises, anointed worship, ministry of the Word, and prophetic prayers.',
    },
    {
      title: 'Midweek Teaching &amp; Miracle Service',
      time: 'Wednesdays &bull; 6:30 PM',
      venue: 'Campus Fellowship Center',
      desc: 'Systematic expository Bible study, practical student life discussions, and miracles.',
    },
    {
      title: 'Dunamis Hour &amp; Friday Encounters',
      time: 'Fridays &bull; 9:00 PM (Bi-Weekly)',
      venue: 'Fellowship Center / Auditorium',
      desc: 'Intense Holy Ghost prayer vigils, revival impartation, and breakthrough sessions.',
    },
    {
      title: 'Residential Family Units',
      time: 'Sundays &bull; 4:30 PM',
      venue: 'KT Hall, Chamber &amp; Off-Campus Cells',
      desc: 'Close-knit fellowship, pastoral check-ins, prayer, and brotherhood in hostels.',
    },
  ];

  return (
    <div className="flex-1 bg-slate-50 pb-20">
      {/* Premier Hero Section */}
      <section className="bg-[#0A192F] text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        {/* Subtle ambient lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold mb-6 tracking-wide uppercase">
            <span>The Church of Pentecost &bull; UMaT Chapter, Tarkwa</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            MINING THE TREASURES IN PEOPLE FOR CHRIST
          </h1>

          <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Welcome to PENSA UMaT. We are a family of faith, academic excellence, and purposeful student leadership on the campus of the University of Mines and Technology.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#census"
              className="px-6 py-3 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-amber-950/20 transition-all active:scale-95 flex items-center gap-2 group"
            >
              <span>Membership Census 2025/2026</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#cell-finder"
              className="px-5 py-3 rounded-lg border border-slate-700 bg-white/5 hover:bg-white/10 text-slate-200 text-xs sm:text-sm font-medium transition-all"
            >
              Find Your Campus Cell
            </a>

            <Link
              href="/about"
              className="px-4 py-3 rounded-lg text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition-colors"
            >
              About Fellowship &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Live Service Countdown Widget */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 -mt-12 relative z-20">
        <ServiceCountdown />
      </section>

      {/* Weekly Service Schedules */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
          <div>
            <span className="text-xs uppercase font-bold text-amber-600 tracking-wider">
              Fellowship Rhythm
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Weekly Service Schedule
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            Join thousands of Christian students gathering for spirit-filled services across UMaT campus.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceSchedule.map((svc, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm card-hover flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block mb-1">
                  Gathering
                </span>
                <h3
                  className="text-sm font-bold text-slate-900 mb-2 leading-snug"
                  dangerouslySetInnerHTML={{ __html: svc.title }}
                />
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{svc.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-700 space-y-1.5">
                <div className="flex items-start gap-1.5 font-semibold text-slate-900">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span dangerouslySetInnerHTML={{ __html: svc.time }} />
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{svc.venue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
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
            Balancing intense engineering &amp; technology studies with vibrant spiritual life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm card-hover">
            <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mb-3">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">Spiritual Fervor &amp; Prayer</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We believe in prayer that produces real results. Through dawn prayers, Friday Dunamis encounters, and uncompromised Bible teaching, you stay spiritually alive throughout your semester.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm card-hover">
            <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">Academic Mentorship</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              UMaT engineering courses demand discipline. Our Academic Committee coordinates study groups, peer tutorials, and past question repositories to ensure every PENSA member excels academically.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm card-hover">
            <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mb-3">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">Residential Care (Cells)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Whether you reside in KT Hall, Chamber of Mines, Gold Refinery, or off-campus in Tarkwa Banso, our Family Units ensure you have a spiritual home and immediate welfare support.
            </p>
          </div>
        </div>
      </section>

      {/* Official Census Registration Form */}
      <section id="census" className="max-w-3xl mx-auto px-4 sm:px-6 pt-4">
        <div className="mb-6 text-center">
          <span className="text-xs uppercase font-bold text-amber-600 tracking-wider">
            Official Fellowship Directory
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
            2025 / 2026 Membership Census
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg mx-auto">
            All students, freshers, continuing members, and associates are required to complete this form for the current academic session.
          </p>
        </div>

        <RegistrationForm />
      </section>
    </div>
  );
}
