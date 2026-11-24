'use client';

import React, { useState } from 'react';
import {
  Camera,
  Eye,
  X,
  Calendar,
  MapPin,
  Users,
  Flame,
  Award,
  Sparkles,
  ExternalLink,
  BookOpen,
  Church,
  Compass,
  ArrowRight
} from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  tag: 'worship' | 'prayer' | 'cells' | 'academics' | 'outreach';
  date: string;
  venue: string;
  gradient: string;
  icon: React.ReactNode;
  caption: string;
  badge: string;
  highlights: string[];
}

export default function CampusLifeGallery() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'worship' | 'prayer' | 'cells' | 'academics' | 'outreach'>('all');

  const gallery: GalleryItem[] = [
    {
      id: 'gallery-1',
      title: 'Sunday Divine Service & Worship Sessions',
      tag: 'worship',
      date: 'Sundays &bull; 07:30 AM & 09:30 AM',
      venue: 'UMaT Main Auditorium',
      gradient: 'from-amber-600 via-slate-900 to-[#0A192F]',
      icon: <Church className="w-6 h-6 text-amber-300" />,
      caption: 'Over 1,200 students gather across two spirit-filled sessions in the prestigious UMaT Main Auditorium. High praises, deep prophetic worship led by The Minstrels, and transformative expository sermons for campus life.',
      badge: 'Main Auditorium Service',
      highlights: ['Session 1: 07:30 AM', 'Session 2: 09:30 AM', 'Holy Ghost Ministration', 'The Word of God'],
    },
    {
      id: 'gallery-2',
      title: 'Dunamis Hour & Friday Campus All-Night Vigils',
      tag: 'prayer',
      date: 'Bi-Weekly Fridays &bull; 9:00 PM',
      venue: 'Fellowship Center / Auditorium',
      gradient: 'from-rose-600 via-slate-900 to-[#0A192F]',
      icon: <Flame className="w-6 h-6 text-rose-300" />,
      caption: 'Intense Holy Ghost encounters and revival impartation. Students dedicate their academic semesters, intercede against examination stress, and contend for spiritual fire and miraculous breakthroughs.',
      badge: 'Holy Ghost Encounter',
      highlights: ['Breakthrough Intercession', 'Revival Impartation', 'Exam Shield of Prayer'],
    },
    {
      id: 'gallery-3',
      title: 'Midweek Teaching & Miracle Service',
      tag: 'worship',
      date: 'Wednesdays &bull; 6:30 PM',
      venue: 'Campus Fellowship Center',
      gradient: 'from-blue-600 via-slate-900 to-[#0A192F]',
      icon: <BookOpen className="w-6 h-6 text-sky-300" />,
      caption: 'Systematic expository study of scriptures tailored to university life. Addressing Christian ethics, personal discipline, courtship, and practical victorious Christian living on campus.',
      badge: 'Expository Bible Study',
      highlights: ['Scripture Exposition', 'Q&A Discussions', 'Miracle Ministry'],
    },
    {
      id: 'gallery-4',
      title: 'KT Hall Residential Family Unit',
      tag: 'cells',
      date: 'Sundays &bull; 4:30 PM',
      venue: 'KT Hall Quadrangle / Common Room',
      gradient: 'from-emerald-600 via-slate-900 to-[#0A192F]',
      icon: <Users className="w-6 h-6 text-emerald-300" />,
      caption: 'Close-knit fellowship covering all blocks of Kofi Tavern Hall. Hall members gather weekly for pastoral check-ins, prayer walks across hostel blocks, and academic accountability.',
      badge: 'KT Hall Fellowship',
      highlights: ['Hostel Pastoral Care', 'Room Evangelism', 'Peer Encouragement'],
    },
    {
      id: 'gallery-5',
      title: 'Chamber of Mines & Gold Refinery Cell',
      tag: 'cells',
      date: 'Sundays &bull; 5:00 PM',
      venue: 'Chamber Forecourt / Study Lounge',
      gradient: 'from-indigo-600 via-slate-900 to-[#0A192F]',
      icon: <Compass className="w-6 h-6 text-indigo-300" />,
      caption: 'Serving engineering and science students residing in Chamber of Mines and Gold Refinery Halls. Creating a haven of brotherhood, joint study circles, and spiritual encouragement.',
      badge: 'Engineering Hall Cell',
      highlights: ['Chamber Forecourt', 'Gold Refinery Wing', 'Brotherhood & Fellowship'],
    },
    {
      id: 'gallery-6',
      title: 'Tarkwa Banso & Off-Campus Fellowships',
      tag: 'cells',
      date: 'Sundays &bull; 4:00 PM',
      venue: 'Grace Hostel Lounge &bull; Tarkwa Banso',
      gradient: 'from-teal-600 via-slate-900 to-[#0A192F]',
      icon: <MapPin className="w-6 h-6 text-teal-300" />,
      caption: 'Pastoral coverage for the vast student body living in off-campus hostels across Tarkwa Banso, New Town, Jerusalem, Railway Quarters, and Aboso. Ensuring no student is isolated.',
      badge: 'Off-Campus Pastoral Care',
      highlights: ['Grace Hostel Hub', 'Tarkwa Banso Hostels', 'Commuter Welfare Support'],
    },
    {
      id: 'gallery-7',
      title: 'Engineering & Technology Academic Clinics',
      tag: 'academics',
      date: 'Mid-Semester & Pre-Exam Periods',
      venue: 'Engineering Lecture Complex (ELC)',
      gradient: 'from-amber-700 via-slate-900 to-[#0A192F]',
      icon: <Award className="w-6 h-6 text-amber-300" />,
      caption: 'UMaT engineering courses require rigorous academic diligence. Our Academic Committee organizes peer calculus clinics, engineering mechanics tutorials, and past question repositories.',
      badge: 'Academic Mentorship',
      highlights: ['Calculus & Physics Clinics', 'Engineering Tutorials', 'Past Question Bank'],
    },
    {
      id: 'gallery-8',
      title: 'Tarkwa Mining Communities Evangelism',
      tag: 'outreach',
      date: 'Saturday Mornings & Semester Missions',
      venue: 'Tarkwa Banso & Mining Settlements',
      gradient: 'from-emerald-700 via-slate-900 to-[#0A192F]',
      icon: <Sparkles className="w-6 h-6 text-emerald-300" />,
      caption: 'Students taking the gospel beyond campus walls into the townships, market centres, and mining settlements of Tarkwa through tracts, one-on-one witness, medical screening, and charity.',
      badge: 'Kingdom Missions',
      highlights: ['Street & Hall Evangelism', 'Tarkwa Mining Environs', 'Charity & Tract Distribution'],
    },
    {
      id: 'gallery-9',
      title: 'PENSA Professional Guild & Alumni Mentorship',
      tag: 'academics',
      date: 'Scheduled Semester Symposiums',
      venue: 'UMaT Main Auditorium / Hybrid',
      gradient: 'from-purple-600 via-slate-900 to-[#0A192F]',
      icon: <Award className="w-6 h-6 text-purple-300" />,
      caption: 'Connecting undergraduate mining engineers, petroleum technologists, computer scientists, and geologists with PENSA alumni working across multinational mining firms and technology hubs.',
      badge: 'Career & Industry Guild',
      highlights: ['Mining Industry Mentors', 'CV & Internship Clinics', 'Leadership Ethics'],
    },
  ];

  const categories = [
    { id: 'all', label: 'All Life at UMaT' },
    { id: 'worship', label: 'Auditorium Services' },
    { id: 'prayer', label: 'Prayer & Vigils' },
    { id: 'cells', label: 'Residential Cells' },
    { id: 'academics', label: 'Engineering Clinics' },
    { id: 'outreach', label: 'Missions & Outreach' },
  ] as const;

  const filtered = filter === 'all' ? gallery : gallery.filter((g) => g.tag === filter);

  return (
    <div className="w-full">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-amber-600 tracking-wider flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5" />
            Official Campus Fellowship Rhythm
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Life at PENSA UMaT
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Explore the vibrant campus gatherings, spirit-filled auditorium services, residential cell fellowships, and engineering tutorials in Tarkwa.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                filter === c.id
                  ? 'bg-[#0A192F] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid with Themed Visual Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group cursor-pointer rounded-xl overflow-hidden border border-slate-200/90 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between card-hover"
          >
            {/* Themed Visual Header */}
            <div className={`h-48 p-5 bg-gradient-to-br ${item.gradient} text-white relative overflow-hidden flex flex-col justify-between`}>
              {/* Radial ambient glow effect */}
              <div className="absolute right-0 top-0 translate-x-6 -translate-y-6 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30 pointer-events-none" />

              {/* Top Badges */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/40 backdrop-blur-md text-amber-300 border border-white/15">
                  {item.badge}
                </span>
                <span className="p-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow">
                  <Eye className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Center Icon & Title */}
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-2 shadow">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <span className="text-[11px] text-slate-300 flex items-center gap-1 font-medium mt-0.5">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  <span dangerouslySetInnerHTML={{ __html: item.date }} />
                </span>
              </div>
            </div>

            {/* Card Content Footer */}
            <div className="p-4 bg-white text-xs text-slate-600 flex-1 flex flex-col justify-between">
              <p className="line-clamp-2 leading-relaxed text-slate-600 mb-3">
                {item.caption}
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span className="flex items-center gap-1 text-slate-500">
                  <MapPin className="w-3 h-3 text-amber-500" />
                  <span>{item.venue}</span>
                </span>
                <span className="text-amber-600 font-semibold group-hover:underline">
                  View Details &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Detail Modal / Lightbox */}
      {activeItem && (
        <div
          onClick={() => setActiveItem(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in-50 duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-700 animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
          >
            {/* Modal Header View */}
            <div className={`p-8 bg-gradient-to-br ${activeItem.gradient} text-white relative overflow-hidden`}>
              <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors z-10 shadow"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Crest Badge */}
              <div className="flex items-center gap-2 mb-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 w-fit">
                <img src="/images/cop-logo.png" alt="COP" className="w-4 h-4 object-contain" />
                <img src="/images/pensa-umat-logo.png" alt="PENSA" className="w-4 h-4 object-contain" />
                <span className="text-[10px] font-bold text-amber-300 tracking-wide uppercase">
                  PENSA UMaT Fellowship
                </span>
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block mb-1">
                {activeItem.badge}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {activeItem.title}
              </h2>
            </div>

            {/* Modal Body & Details */}
            <div className="p-6 sm:p-7 space-y-4 text-sm text-slate-700 overflow-y-auto">
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-3 border-b border-slate-100">
                <span className="flex items-center gap-1.5 font-medium text-slate-800">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span dangerouslySetInnerHTML={{ __html: activeItem.date }} />
                </span>
                <span className="flex items-center gap-1.5 font-medium text-slate-800">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>{activeItem.venue}</span>
                </span>
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-slate-500 tracking-wider block mb-1">
                  Fellowship Description
                </span>
                <p className="leading-relaxed text-slate-700 text-sm">
                  {activeItem.caption}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <span className="text-xs uppercase font-bold text-slate-500 tracking-wider block mb-2">
                  Key Focus Areas
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeItem.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium"
                    >
                      &bull; {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
                <Users className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block mb-0.5">
                    Connect with PENSA UMaT
                  </span>
                  Are you a student in Tarkwa? Complete your official 2025/2026 census registration to be assigned to your hall cell and preferred ministry wing.
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <a
                  href="https://www.youtube.com/@Pensaumat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-800 font-semibold"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Official YouTube (@Pensaumat)</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveItem(null)}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
                  >
                    Close
                  </button>
                  <a
                    href="#census"
                    onClick={() => setActiveItem(null)}
                    className="px-5 py-2 rounded-lg bg-[#0A192F] hover:bg-[#122A4E] text-white text-xs font-semibold shadow"
                  >
                    Register in Census
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
