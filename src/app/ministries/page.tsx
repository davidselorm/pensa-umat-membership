'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mic2,
  Tv,
  Flame,
  Globe2,
  Boxes,
  BookOpen,
  Users2,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface Ministry {
  id: string;
  name: string;
  category: 'music' | 'prayer' | 'media' | 'service';
  icon: React.ReactNode;
  image?: string;
  badge: string;
  description: string;
  schedule: string;
}

export default function MinistriesPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'music' | 'prayer' | 'media' | 'service'>('all');

  const ministries: Ministry[] = [
    {
      id: 'choir',
      name: 'The Minstrels & Heralds of Zion',
      category: 'music',
      icon: <Mic2 className="w-5 h-5 text-yellow-300" />,
      image: '/images/fb/heralds-of-zion.jpg',
      badge: 'Music & Prophetic Praise',
      description: 'Anointed choir and instrumentalists leading the fellowship in high praises, deep prophetic worship, and sounds from heaven.',
      schedule: 'Rehearsals: Saturdays 4:00 PM &bull; Main Auditorium',
    },
    {
      id: 'media',
      name: 'Media & Technical Department',
      category: 'media',
      icon: <Tv className="w-5 h-5 text-white" />,
      badge: 'Livestreaming & Sound Engineering',
      description: 'Livestreaming, campus photography, sound engineering, graphic design, projection, social media, and digital broadcast operations.',
      schedule: 'Technical Crew: Sundays 6:30 AM &amp; Midweek Services',
    },
    {
      id: 'prayer',
      name: 'Prayer Force (Intercessory Wing)',
      category: 'prayer',
      icon: <Flame className="w-5 h-5 text-red-400" />,
      image: '/images/fb/in-his-presence.jpg',
      badge: 'Campus Intercession',
      description: 'Standing in the gap for the body of Christ, student welfare, exam seasons, and national revival through fervent Holy Ghost intercession.',
      schedule: 'Tuesdays 6:30 PM &amp; Friday Prayer Encounters',
    },
    {
      id: 'evangelism',
      name: 'Evangelism & Missions Committee',
      category: 'prayer',
      icon: <Globe2 className="w-5 h-5 text-yellow-300" />,
      image: '/images/fb/challenge-climax.jpg',
      badge: 'Soul Winning & Missions',
      description: 'Taking the gospel to campus halls, hostels, lecture theatres, surrounding Tarkwa mining townships, and rural mission fields.',
      schedule: 'Saturday Morning Street &amp; Hall Evangelism: 7:00 AM',
    },
    {
      id: 'bible-study',
      name: 'Bible Study & Discipleship Committee',
      category: 'service',
      icon: <BookOpen className="w-5 h-5 text-white" />,
      image: '/images/fb/hope-of-glory.jpg',
      badge: 'Doctrinal Grounding',
      description: 'Facilitating systematic doctrinal studies, Sunday Bible discussions, member follow-ups, and freshers discipleship syllabus.',
      schedule: 'Midweek Expository Studies: Wednesdays 6:30 PM',
    },
    {
      id: 'organizing',
      name: 'Organizing & Stage Protocol',
      category: 'service',
      icon: <Boxes className="w-5 h-5 text-yellow-300" />,
      image: '/images/fb/arrival-moments.jpg',
      badge: 'Auditorium Protocol & Logistics',
      description: 'Logistics, auditorium seating arrangements, stage management, venue reservations, and coordinating major fellowship conferences.',
      schedule: 'Setup: Saturdays 5:00 PM &amp; Sundays before service',
    },
    {
      id: 'drama',
      name: 'Creative Arts & Christian Drama',
      category: 'music',
      icon: <Sparkles className="w-5 h-5 text-red-400" />,
      image: '/images/fb/drama-dance.jpg',
      badge: 'Drama & Choreography',
      description: 'Proclaiming the living gospel of Jesus Christ through powerful drama productions, choreography, and spoken word ministration.',
      schedule: 'Rehearsals: Scheduled Weekly Rehearsals',
    },
    {
      id: 'ladies-gents',
      name: 'Ladies&apos; & Gents&apos; Wing',
      category: 'service',
      icon: <Users2 className="w-5 h-5 text-white" />,
      image: '/images/fb/praise-ministry.jpg',
      badge: 'PEMEN & Virtuous Ladies',
      description: 'Nurturing godly young men (PEMEN) and virtuous women (Virtuous Ladies) for leadership, relationship purity, and professional excellence.',
      schedule: 'Bi-Weekly Meetings &bull; Alternate Saturdays 4:30 PM',
    },
    {
      id: 'bpc',
      name: 'Business & Political Chamber (BPC)',
      category: 'service',
      icon: <Briefcase className="w-5 h-5 text-yellow-300" />,
      image: '/images/fb/challenge-day2.jpg',
      badge: 'Governance & Enterprise',
      description: 'Equipping Christian students for ethical governance, student politics, entrepreneurship, finance management, and career leadership.',
      schedule: 'Chamber Sessions: Scheduled Monthly Symposiums',
    },
    {
      id: 'professional-guild',
      name: 'PENSA Professional Guild (PPG)',
      category: 'service',
      icon: <GraduationCap className="w-5 h-5 text-white" />,
      image: '/images/fb/alumni-spotlight.jpg',
      badge: 'Engineering & Alumni Mentorship',
      description: 'Connecting undergraduate engineering and science students with alumni mentors, professional associations, and industrial internships.',
      schedule: 'Mentorship Circles &bull; Academic Semester Clinics',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Ministries' },
    { id: 'music', label: 'Music & Creative Arts' },
    { id: 'media', label: 'Media & Production' },
    { id: 'prayer', label: 'Prayer & Missions' },
    { id: 'service', label: 'Service & Wings' },
  ] as const;

  const filtered = activeCategory === 'all'
    ? ministries
    : ministries.filter((m) => m.category === activeCategory);

  return (
    <div className="flex-1 bg-white pb-20">
      {/* Header Banner */}
      <section className="bg-[#04112B] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#00205B] relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-400/10 via-[#04112B]/40 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Official Tri-Crest Institutional Badge */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5">
            <div className="flex items-center gap-2.5 bg-[#00205B]/85 px-3.5 py-1.5 rounded-2xl border border-yellow-400/30 shadow-xl backdrop-blur-md">
              <img
                src="/images/cop-logo.png"
                alt="The Church of Pentecost"
                className="w-10 h-10 object-contain drop-shadow brightness-105"
              />
              <div className="h-6 w-px bg-white/20" />
              <img
                src="/images/pensaumatofficial.jpg"
                alt="Official PENSA UMaT Crest"
                className="w-11 h-11 object-contain rounded-full drop-shadow hover:scale-105 transition-transform"
              />
              <div className="h-6 w-px bg-white/20" />
              <img
                src="/images/umat-logo.jpg"
                alt="UMaT Crest"
                className="w-8 h-8 object-contain rounded drop-shadow brightness-105"
              />
            </div>
          </div>

          <span className="text-xs uppercase tracking-wider font-bold text-yellow-300 bg-yellow-400/10 border border-yellow-400/30 px-3.5 py-1 rounded-full">
            Fellowship Arms of Service
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-3 text-white">
            Ministries &amp; Departments
          </h1>
          <p className="mt-3 text-white/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Every member has a grace and a calling. Discover the various departments within PENSA UMaT where you can use your gifts to serve God and build His church.
          </p>

          {/* Interactive Category Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#FACC15] text-[#00205B] shadow-md scale-105 border border-yellow-400'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((min) => (
            <div
              key={min.id}
              className="bg-white rounded-2xl border border-[#0038A8]/20 shadow-sm hover:shadow-xl hover:border-yellow-400 transition-all duration-300 card-hover flex flex-col justify-between overflow-hidden group"
            >
              {/* Header Image or Gradient Banner */}
              <div className="h-48 relative overflow-hidden bg-[#04112B] flex flex-col justify-between p-5 text-white">
                {min.image && (
                  <img
                    src={min.image}
                    alt={min.name}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className={`absolute inset-0 bg-gradient-to-t ${min.image ? 'from-black/90 via-black/50 to-black/30' : 'from-[#00205B] to-[#04112B]'}`} />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#00205B]/80 backdrop-blur-md border border-yellow-400/30 flex items-center justify-center shadow">
                    {min.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#00205B]/90 backdrop-blur-md border border-yellow-400/30 text-yellow-300">
                    {min.badge}
                  </span>
                </div>

                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-white group-hover:text-yellow-300 transition-colors">
                    {min.name}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between text-xs text-neutral-600">
                <div>
                  <p className="leading-relaxed mb-4 text-neutral-700">{min.description}</p>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span
                    className="text-[11px] text-[#00205B] font-medium"
                    dangerouslySetInnerHTML={{ __html: min.schedule }}
                  />
                  <Link
                    href="/register"
                    className="px-4 py-2 rounded-xl bg-[#00205B] hover:bg-[#0038A8] text-yellow-400 font-bold text-xs inline-flex items-center gap-1.5 self-start sm:self-auto transition-colors border border-yellow-400/30 shadow-sm"
                  >
                    <span>Join Ministry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
