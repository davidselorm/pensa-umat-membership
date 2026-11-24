'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mic2,
  Tv,
  Flame,
  Globe2,
  Boxes,
  Truck,
  BookOpen,
  Users2,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Filter
} from 'lucide-react';

interface Ministry {
  id: string;
  name: string;
  category: 'music' | 'prayer' | 'media' | 'service';
  icon: React.ReactNode;
  banner: string;
  description: string;
  schedule: string;
}

export default function MinistriesPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'music' | 'prayer' | 'media' | 'service'>('all');

  const ministries: Ministry[] = [
    {
      id: 'choir',
      name: 'The Minstrels & Drama (Music Ministry)',
      category: 'music',
      icon: <Mic2 className="w-5 h-5 text-amber-400" />,
      banner: '/images/departments/music-drama.jpg',
      description: 'Anointed choir and drama ministration leading the fellowship in high praises, deep prophetic worship, and impactful Christian drama.',
      schedule: 'Rehearsals: Saturdays 4:00 PM &bull; Main Auditorium',
    },
    {
      id: 'media',
      name: 'Media & Technical Department',
      category: 'media',
      icon: <Tv className="w-5 h-5 text-amber-400" />,
      banner: '/images/departments/media.jpg',
      description: 'Livestreaming, campus photography, sound engineering, graphic design, projection, social media, and digital broadcast operations.',
      schedule: 'Technical Crew: Sundays 6:30 AM &amp; Midweek Services',
    },
    {
      id: 'prayer',
      name: 'Prayer Force (Intercessory Wing)',
      category: 'prayer',
      icon: <Flame className="w-5 h-5 text-amber-400" />,
      banner: '/images/departments/prayer.jpg',
      description: 'Standing in the gap for the body of Christ, student welfare, exam seasons, and national revival through fervent Holy Ghost intercession.',
      schedule: 'Tuesdays 6:30 PM &amp; Friday Prayer Encounters',
    },
    {
      id: 'evangelism',
      name: 'Evangelism & Missions Committee',
      category: 'prayer',
      icon: <Globe2 className="w-5 h-5 text-amber-400" />,
      banner: '/images/departments/evangelism.jpg',
      description: 'Taking the gospel to campus halls, hostels, lecture theatres, surrounding Tarkwa mining townships, and rural mission fields.',
      schedule: 'Saturday Morning Street &amp; Hall Evangelism: 7:00 AM',
    },
    {
      id: 'bible-study',
      name: 'Bible Study & Discipleship Committee',
      category: 'service',
      icon: <BookOpen className="w-5 h-5 text-amber-400" />,
      banner: '/images/departments/bible-study.jpg',
      description: 'Facilitating systematic doctrinal studies, Sunday Bible discussions, member follow-ups, and freshers discipleship syllabus.',
      schedule: 'Midweek Expository Studies: Wednesdays 6:30 PM',
    },
    {
      id: 'organizing',
      name: 'Organizing & Stage Protocol',
      category: 'service',
      icon: <Boxes className="w-5 h-5 text-amber-400" />,
      banner: '/images/departments/organizing.jpg',
      description: 'Logistics, auditorium seating arrangements, stage management, venue reservations, and coordinating major fellowship conferences.',
      schedule: 'Setup: Saturdays 5:00 PM &amp; Sundays before service',
    },
    {
      id: 'transport',
      name: 'Transport & Logistics Committee',
      category: 'service',
      icon: <Truck className="w-5 h-5 text-amber-400" />,
      banner: '/images/departments/transport.jpg',
      description: 'Coordinating student bus shuttles from off-campus hostels across Tarkwa, logistics movement for crusades, and vehicular operations.',
      schedule: 'Sunday Shuttles: 6:45 AM &amp; 8:45 AM from hostel cell stops',
    },
    {
      id: 'ladies-gents',
      name: 'Ladies&apos; & Gents&apos; Wing',
      category: 'service',
      icon: <Users2 className="w-5 h-5 text-amber-400" />,
      banner: '/images/departments/ladies-gents.jpg',
      description: 'Nurturing godly young men (PEMEN) and virtuous women (Virtuous Ladies) for leadership, relationship purity, and professional excellence.',
      schedule: 'Bi-Weekly Meetings &bull; Alternate Saturdays 4:30 PM',
    },
    {
      id: 'bpc',
      name: 'Business & Political Chamber (BPC)',
      category: 'service',
      icon: <Briefcase className="w-5 h-5 text-amber-400" />,
      banner: '/images/departments/bpc.jpg',
      description: 'Equipping Christian students for ethical governance, student politics, entrepreneurship, finance management, and career leadership.',
      schedule: 'Chamber Sessions: Scheduled Monthly Symposiums',
    },
    {
      id: 'professional-guild',
      name: 'PENSA Professional Guild (PPG)',
      category: 'service',
      icon: <GraduationCap className="w-5 h-5 text-amber-400" />,
      banner: '/images/departments/professional-guild.jpg',
      description: 'Connecting undergraduate engineering and science students with alumni mentors, professional associations, and industrial internships.',
      schedule: 'Mentorship Circles &bull; Academic Semester Clinics',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Ministries' },
    { id: 'music', label: 'Music & Drama' },
    { id: 'media', label: 'Media & Production' },
    { id: 'prayer', label: 'Prayer & Missions' },
    { id: 'service', label: 'Service & Wings' },
  ] as const;

  const filtered = activeCategory === 'all'
    ? ministries
    : ministries.filter((m) => m.category === activeCategory);

  return (
    <div className="flex-1 bg-slate-50 pb-20">
      {/* Header Banner */}
      <section className="bg-[#0A192F] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-80 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Official Dual Crests */}
          <div className="flex items-center justify-center gap-3.5 mb-5">
            <img
              src="/images/cop-logo.png"
              alt="The Church of Pentecost"
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow brightness-105"
            />
            <div className="h-8 w-px bg-slate-700" />
            <img
              src="/images/pensa-umat-logo.png"
              alt="PENSA UMaT Chapter"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow brightness-105 hover:scale-105 transition-transform"
            />
          </div>

          <span className="text-xs uppercase tracking-wider font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
            Fellowship Arms of Service
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-3 text-white">
            Ministries &amp; Departments
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Every member has a grace and a calling. Discover the various departments within PENSA UMaT where you can use your gifts to serve God and build His church.
          </p>

          {/* Interactive Category Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                    : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/15'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Ministries Grid with Authentic Department Banners */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((min) => (
            <div
              key={min.id}
              className="bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 card-hover flex flex-col justify-between overflow-hidden group"
            >
              {/* Department Banner Image */}
              <div className="h-44 w-full relative overflow-hidden bg-slate-900">
                <img
                  src={min.banner}
                  alt={min.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center shadow">
                  {min.icon}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {min.name}
                  </h3>
                </div>
              </div>

              {/* Department Info & Schedule */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{min.description}</p>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span
                    className="text-slate-500 text-[11px]"
                    dangerouslySetInnerHTML={{ __html: min.schedule }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join a Ministry CTA */}
        <div className="mt-12 bg-white rounded-xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 card-hover">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Want to join a department this semester?
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              Indicate your preferred ministry department when filling the official membership census form. The committee heads will connect with you directly.
            </p>
          </div>
          <Link
            href="/#census"
            className="px-6 py-2.5 rounded-lg bg-[#0A192F] hover:bg-[#122A4E] text-white text-xs font-semibold shrink-0 flex items-center gap-2 transition-colors shadow"
          >
            <span>Register &amp; Select Ministry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
