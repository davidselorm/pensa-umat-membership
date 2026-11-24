import React from 'react';
import Link from 'next/link';
import {
  Users,
  Award,
  GraduationCap,
  ShieldCheck,
  Mail,
  Phone,
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface Leader {
  name: string;
  role: string;
  programme?: string;
  contact?: string;
  category: 'patron' | 'executive';
}

export default function LeadershipPage() {
  const patrons: Leader[] = [
    {
      name: 'Ps. Emmanuel K. Addo',
      role: 'Tarkwa Area Youth Pastor &amp; Chaplain',
      contact: 'secretariat@pensa-umat.org',
      category: 'patron',
    },
    {
      name: 'Eld. Dr. Francis Boateng',
      role: 'Senior Lecturer, UMaT &amp; Senior Staff Patron',
      contact: 'fboateng@umat.edu.gh',
      category: 'patron',
    },
    {
      name: 'Eld. Emmanuel Ofori',
      role: 'Staff Patron &amp; Hall Advisor',
      contact: 'eofori@umat.edu.gh',
      category: 'patron',
    },
  ];

  const executives: Leader[] = [
    {
      name: 'Bro. David Selorm Walker',
      role: 'President',
      programme: 'BSc Computer Science &amp; Engineering &bull; Level 400',
      contact: 'president@pensa-umat.org',
      category: 'executive',
    },
    {
      name: 'Sis. Abena Serwaa Prempeh',
      role: 'Vice President',
      programme: 'BSc Mining Engineering &bull; Level 400',
      contact: 'vice@pensa-umat.org',
      category: 'executive',
    },
    {
      name: 'Bro. Kwadwo Asare Boateng',
      role: 'General Secretary',
      programme: 'BSc Electrical &amp; Electronic Engineering &bull; Level 300',
      contact: 'secretary@pensa-umat.org',
      category: 'executive',
    },
    {
      name: 'Sis. Mercy Esi Mensah',
      role: 'Financial Secretary',
      programme: 'BSc Petroleum Engineering &bull; Level 300',
      contact: 'finance@pensa-umat.org',
      category: 'executive',
    },
    {
      name: 'Bro. Samuel Mensah',
      role: 'Organizing Secretary',
      programme: 'BSc Mechanical Engineering &bull; Level 300',
      contact: 'organizing@pensa-umat.org',
      category: 'executive',
    },
    {
      name: 'Sis. Abigail Osei',
      role: 'Prayer Secretary',
      programme: 'BSc Minerals Engineering &bull; Level 300',
      contact: 'prayer@pensa-umat.org',
      category: 'executive',
    },
    {
      name: 'Bro. Daniel Antwi',
      role: 'Evangelism Secretary',
      programme: 'BSc Geomatic Engineering &bull; Level 300',
      contact: 'evangelism@pensa-umat.org',
      category: 'executive',
    },
    {
      name: 'Sis. Priscilla Addo',
      role: 'Welfare Secretary',
      programme: 'BSc Environmental &amp; Safety Engineering &bull; Level 300',
      contact: 'welfare@pensa-umat.org',
      category: 'executive',
    },
  ];

  return (
    <div className="flex-1 bg-slate-50 pb-20">
      {/* Header Banner */}
      <section className="bg-[#0A192F] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/images/gallery/leadership-conference.jpg"
            alt="PENSA Leadership"
            className="w-full h-full object-cover object-center opacity-15 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/80 via-[#0A192F]/95 to-[#0A192F]" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-3.5 mb-4">
            <img
              src="/images/cop-logo.png"
              alt="The Church of Pentecost"
              className="w-12 h-12 object-contain drop-shadow brightness-105"
            />
            <div className="h-7 w-px bg-slate-700" />
            <img
              src="/images/pensa-umat-logo.png"
              alt="PENSA UMaT Chapter"
              className="w-14 h-14 object-contain drop-shadow brightness-105"
            />
          </div>

          <span className="text-xs uppercase tracking-wider font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
            Secretariat &bull; 2025/2026 Academic Year
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-3 text-white">
            Fellowship Leadership
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Meet the pastoral patrons, university advisors, and elected student executives dedicated to shepherding the body of Christ at UMaT.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-12">
        {/* Pastoral & Patron Advisory Board */}
        <div>
          <div className="mb-6">
            <span className="text-xs uppercase font-bold text-amber-600 tracking-wider">
              Spiritual &amp; Institutional Oversight
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Patrons &amp; Pastoral Board
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {patrons.map((p, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm card-hover"
              >
                <div className="w-12 h-12 rounded-full bg-[#0A192F] text-white font-bold flex items-center justify-center text-sm mb-4 border border-amber-400/30">
                  {p.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">{p.name}</h3>
                <p className="text-xs font-semibold text-amber-700 mb-3" dangerouslySetInnerHTML={{ __html: p.role }} />
                <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{p.contact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Committee 2025/2026 */}
        <div>
          <div className="mb-6">
            <span className="text-xs uppercase font-bold text-amber-600 tracking-wider">
              Student Secretariat
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Executive Council (2025 / 2026)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {executives.map((exec, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs mb-3 shadow-sm">
                    {exec.name.split(' ').slice(1, 3).map((n) => n[0]).join('')}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 block mb-1">
                    {exec.role}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{exec.name}</h4>
                  <p
                    className="text-[11px] text-slate-500 leading-snug mb-3"
                    dangerouslySetInnerHTML={{ __html: exec.programme || '' }}
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 truncate">
                  {exec.contact}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Portal Access CTA */}
        <div className="bg-[#0A192F] text-white rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Are you an executive or hall representative?
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-lg leading-relaxed">
              Log in to the secure Executive Hub to view real-time member records, export filtered spreadsheets, and manage Family Unit allocations.
            </p>
          </div>
          <Link
            href="/login"
            className="px-6 py-2.5 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold shrink-0 flex items-center gap-2 transition-colors shadow"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Executive Portal Login</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
