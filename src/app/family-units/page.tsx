import React from 'react';
import Link from 'next/link';
import HostelCellFinder from '@/components/HostelCellFinder';
import { Home, Users, MapPin, Phone, MessageSquare, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function FamilyUnitsPage() {
  const units = [
    {
      name: 'KT Hall Family Unit',
      coverage: 'KT Hall (Kofi Tavern Hall) & Surrounding Blocks',
      leader: 'Eld. Emmanuel Ofori',
      phone: '+233541234567',
      time: 'Sundays &bull; 4:30 PM',
      venue: 'KT Hall Common Room / Quadrangle',
      description: 'Serving all male and female residents in KT Hall. A lively fellowship focused on campus evangelism, academic accountability, and prayer.',
    },
    {
      name: 'Chamber & Gold Refinery Cell',
      coverage: 'Chamber of Mines Hall & Gold Refinery Hall',
      leader: 'Dcn. Samuel Mensah',
      phone: '+233249876543',
      time: 'Sundays &bull; 5:00 PM',
      venue: 'Chamber Forecourt / Study Lounge',
      description: 'Bringing together engineering and science students residing in Chamber of Mines and Gold Refinery Halls for spiritual grounding and mutual encouragement.',
    },
    {
      name: 'Tarkwa Banso & Off-Campus Cell',
      coverage: 'Grace, Executive, Jerusalem, Railway Quarters, New Town & Aboso Hostels',
      leader: 'Sis. Priscilla Addo',
      phone: '+233501122334',
      time: 'Sundays &bull; 4:00 PM',
      venue: 'Grace Hostel Lounge &bull; Tarkwa Banso',
      description: 'Dedicated pastoral coverage for our vast off-campus student body. Ensuring students living outside campus walls stay closely knit into the fellowship family.',
    },
  ];

  return (
    <div className="flex-1 bg-slate-50 pb-20">
      {/* Header Banner */}
      <section className="bg-[#0A192F] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/images/gallery/slide-campus-night.jpg"
            alt="Campus Cells"
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
            Residential Campus Cells
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-3 text-white">
            Family Units &amp; Home Cells
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Campus is bigger than just services. Our Family Units group members by hostel and residential area so you receive personal care, prayer support, and close friendship.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-12">
        {/* Interactive Hostel Lookup */}
        <HostelCellFinder />

        {/* What Happens Notice */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                What Happens at a Family Unit Meeting?
              </h2>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Every Sunday afternoon, members gather in their halls or hostels for 1 hour of interactive Bible discussion, personal prayer, academic check-ins, and fellowship. If you fall ill, miss classes, or face challenges, your Cell Leader and family unit members are your first circle of support.
              </p>
            </div>
          </div>
        </div>

        {/* All Units Cards */}
        <div>
          <div className="mb-6">
            <span className="text-xs uppercase font-bold text-amber-600 tracking-wider">
              Campus Coverage
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">
              All Residential Fellowship Cells
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {units.map((unit, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-6 card-hover flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 block mb-1">
                    {unit.coverage}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {unit.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {unit.description}
                  </p>

                  <div className="space-y-2 border-t border-slate-100 pt-3 text-xs text-slate-700">
                    <div className="flex items-start gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span dangerouslySetInnerHTML={{ __html: unit.time }} />
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{unit.venue}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>Leader: <strong>{unit.leader}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-2">
                  <a
                    href={`tel:${unit.phone.replace(/[^0-9+]/g, '')}`}
                    className="flex-1 py-2 px-2 rounded-md border border-slate-200 hover:bg-slate-50 text-[11px] font-semibold text-slate-700 text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>Call Leader</span>
                  </a>
                  <a
                    href={`https://wa.me/${unit.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hi ${unit.leader}, I'm a student at UMaT and would like to join your Family Unit.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-[11px] font-semibold text-white text-center flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Allocation Notice Banner */}
        <div className="bg-[#0A192F] text-white rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Haven&apos;t been placed in a Family Unit yet?
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Fill out the annual membership census with your hostel and level. The executive secretariat automatically routes you to your designated residential cell.
            </p>
          </div>
          <Link
            href="/register"
            className="px-6 py-2.5 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold shrink-0 flex items-center gap-2 transition-colors shadow"
          >
            <span>Register for Cell Placement</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
