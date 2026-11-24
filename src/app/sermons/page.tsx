'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Headphones,
  Calendar,
  User,
  Search,
  Filter,
  Download,
  Play,
  Volume2,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface Sermon {
  id: string;
  title: string;
  series: string;
  speaker: string;
  role: string;
  date: string;
  scripture: string;
  duration: string;
  category: 'faith' | 'prayer' | 'academics' | 'leadership';
  summary: string;
}

export default function SermonsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'faith' | 'prayer' | 'academics' | 'leadership'>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const sermons: Sermon[] = [
    {
      id: 'sermon-1',
      title: 'Excelling in Babylon: Faith, Academics and Integrity',
      series: 'Possessing the Campus Sphere',
      speaker: 'Ps. Emmanuel K. Addo',
      role: 'Tarkwa Area Youth &amp; PENSA Patron',
      date: 'November 17, 2026',
      scripture: 'Daniel 1:8, Colossians 3:23',
      duration: '48 mins',
      category: 'academics',
      summary: 'How Christian students in engineering and technical faculties can maintain uncompromised spiritual integrity while graduating with flying colors.',
    },
    {
      id: 'sermon-2',
      title: 'The Dunamis Dimension: Walking in Supernatural Power',
      series: 'Holy Ghost Impartation',
      speaker: 'Eld. Dr. Francis Boateng',
      role: 'Senior Lecturer &amp; Patron, UMaT',
      date: 'November 10, 2026',
      scripture: 'Acts 1:8, 1 Corinthians 2:4-5',
      duration: '54 mins',
      category: 'prayer',
      summary: 'A deep examination of the baptism and continuous filling of the Holy Spirit for campus warfare, daily purity, and effective witness.',
    },
    {
      id: 'sermon-3',
      title: 'Mining the Inward Treasure: Christ in You',
      series: 'Colossians 1 Expository',
      speaker: 'Bro. David Selorm',
      role: 'PENSA President, UMaT',
      date: 'November 03, 2026',
      scripture: 'Colossians 1:26-29, 2 Corinthians 4:7',
      duration: '42 mins',
      category: 'faith',
      summary: 'Unpacking the fellowship motto. Realizing that the greatest treasure beneath the earth of UMaT is the resident power of Christ within every believer.',
    },
    {
      id: 'sermon-4',
      title: 'Kingdom Stewardship & Professional Excellence',
      series: 'Marketplace Apostles',
      speaker: 'Eld. Ing. Samuel Mensah',
      role: 'Mining Executive &amp; PENSA Alumnus',
      date: 'October 27, 2026',
      scripture: 'Proverbs 22:29, Genesis 41:38-40',
      duration: '50 mins',
      category: 'leadership',
      summary: 'Practical guidance for students entering the global mining, petrochemical, and tech sectors to dominate with godly wisdom and technical brilliance.',
    },
    {
      id: 'sermon-5',
      title: 'Watch and Pray: Overcoming Campus Distractions',
      series: 'Spiritual Vigilance',
      speaker: 'Sis. Abigail Serwaa',
      role: 'Prayer Secretary, PENSA UMaT',
      date: 'October 20, 2026',
      scripture: 'Matthew 26:41, Ephesians 6:18',
      duration: '39 mins',
      category: 'prayer',
      summary: 'Navigating peer pressure, relationship pitfalls, and academic anxiety through a disciplined personal prayer altar and fasting.',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Sermons' },
    { id: 'academics', label: 'Faith & Academics' },
    { id: 'prayer', label: 'Prayer & Holy Spirit' },
    { id: 'faith', label: 'Word Expository' },
    { id: 'leadership', label: 'Career & Leadership' },
  ] as const;

  const filteredSermons = sermons.filter((s) => {
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.speaker.toLowerCase().includes(search.toLowerCase()) ||
      s.scripture.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 bg-slate-50 pb-20">
      {/* Header Banner */}
      <section className="bg-[#0A192F] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase tracking-wider font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
            Word &amp; Podcast Vault
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-3 text-white">
            Sermons &amp; Bible Teachings
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Listen to life-transforming messages preached at the UMaT Main Auditorium, Midweek services, and Dunamis encounters. Feed your spirit wherever you are on campus.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-lg mx-auto relative">
            <input
              type="text"
              placeholder="Search by topic, speaker, or scripture..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-700 bg-slate-900/90 text-sm text-white placeholder-slate-400 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          {/* Category Filter Pills */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  selectedCategory === c.id
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/15'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sermons Listing */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-4">
        {filteredSermons.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center border border-slate-200">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">No sermons matched your search</h3>
            <p className="text-xs text-slate-500 mt-1">Try another keyword or select All Sermons.</p>
          </div>
        ) : (
          filteredSermons.map((sermon) => (
            <div
              key={sermon.id}
              className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-sm card-hover flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
                    {sermon.series}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                    <Calendar className="w-3 h-3" /> {sermon.date}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                    <Clock className="w-3 h-3" /> {sermon.duration}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 leading-snug">
                  {sermon.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3">
                  {sermon.summary}
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                  <div className="flex items-center gap-1 text-slate-700 font-semibold">
                    <User className="w-3.5 h-3.5 text-amber-500" />
                    <span>{sermon.speaker}</span>
                    <span className="text-slate-400 font-normal" dangerouslySetInnerHTML={{ __html: `(${sermon.role})` }} />
                  </div>
                  <div className="flex items-center gap-1 text-slate-600 font-medium">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>{sermon.scripture}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
                <button
                  onClick={() => setPlayingId(playingId === sermon.id ? null : sermon.id)}
                  className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                    playingId === sermon.id
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-[#0A192F] text-white hover:bg-[#122A4E]'
                  }`}
                >
                  {playingId === sermon.id ? (
                    <>
                      <Volume2 className="w-4 h-4 animate-pulse" />
                      <span>Listening Now</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Listen to Audio</span>
                    </>
                  )}
                </button>

                <a
                  href={`#sermon-${sermon.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Audio download for "${sermon.title}" will begin shortly. High quality MP3.`);
                  }}
                  title="Download MP3 Audio"
                  className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Sunday Service Audio Stream CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-[#0A192F] text-white rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Missed Sunday Service at the Auditorium?
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-lg leading-relaxed">
                Full Sunday message recordings, Bible study outlines, and Friday Dunamis prayer audio are uploaded weekly by the PENSA UMaT Media &amp; Sound Department.
              </p>
            </div>
          </div>
          <Link
            href="/register"
            className="px-5 py-2.5 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold shrink-0 flex items-center gap-2 transition-colors"
          >
            <span>Register for Weekly Broadcasts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
