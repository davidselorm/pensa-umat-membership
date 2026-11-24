'use client';

import React, { useState } from 'react';
import { Camera, Eye, X, Calendar, MapPin, Users, Heart, Share2, Sparkles } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  tag: 'worship' | 'prayer' | 'wings' | 'outreach';
  date: string;
  venue: string;
  image: string;
  caption: string;
  badge: string;
}

export default function CampusLifeGallery() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'worship' | 'prayer' | 'wings' | 'outreach'>('all');

  const gallery: GalleryItem[] = [
    {
      id: 'gallery-1',
      title: 'Divine Service at UMaT Main Auditorium',
      tag: 'worship',
      date: 'Sunday Morning Services',
      venue: 'UMaT Main Auditorium',
      image: '/images/hero/hero-worship-1.jpg',
      caption: 'Over 1,200 students gathering in the prestigious UMaT Main Auditorium for the Sunday Divine Service sessions. High praises, deep worship, and life-transforming expository teaching.',
      badge: 'Sunday Service',
    },
    {
      id: 'gallery-2',
      title: 'Campus Praise & Anointed Worship Ministry',
      tag: 'worship',
      date: 'Midweek & Sunday Praise',
      venue: 'Fellowship Center Stage',
      image: '/images/hero/hero-fellowship-2.jpg',
      caption: 'The Minstrels and instrumentalists leading the congregation into glorious Ghanaian highlife praises, intimate worship, and deep spiritual fervor.',
      badge: 'Music Ministry',
    },
    {
      id: 'gallery-3',
      title: 'Ablaze Conference & Holy Ghost Encounters',
      tag: 'prayer',
      date: 'Annual Semester Conference',
      venue: 'UMaT Auditorium',
      image: '/images/hero/hero-conference-3.jpg',
      caption: 'Spiritual revival, fire impartation, and divine breakthrough as students dedicate their academic journey and campus life to God Almighty.',
      badge: 'Conference',
    },
    {
      id: 'gallery-4',
      title: 'Dunamis Friday Campus All-Night Vigil',
      tag: 'prayer',
      date: 'Bi-Weekly Friday 9:00 PM',
      venue: 'Campus Fellowship Center',
      image: '/images/gallery/slide-campus-night.jpg',
      caption: 'Students pressing into God&apos;s presence late into the night. Interceding for semester examinations, spiritual revival, academic excellence, and family breakthroughs.',
      badge: 'All-Night Vigil',
    },
    {
      id: 'gallery-5',
      title: 'PENSA UMaT Alumni & Associates Homecoming',
      tag: 'wings',
      date: 'Annual Alumni Gathering',
      venue: 'Alumni Hall & Campus',
      image: '/images/gallery/alumni-homecoming.jpg',
      caption: 'Alumni mining engineers, computer scientists, geologists, and industry leaders returning to campus to inspire, mentor, and network with undergraduate students.',
      badge: 'Alumni & Mentorship',
    },
    {
      id: 'gallery-6',
      title: 'Freshers Welcome & Orientation Service',
      tag: 'worship',
      date: 'Semester Matriculation Season',
      venue: 'Fellowship Center',
      image: '/images/gallery/welcome-service.jpg',
      caption: 'Welcoming newly admitted freshmen into the PENSA UMaT family. Assigning residential cell leaders, course tutorial seniors, and prayer partners.',
      badge: 'Freshers Welcome',
    },
    {
      id: 'gallery-7',
      title: 'Tarkwa Mining Communities Evangelism',
      tag: 'outreach',
      date: 'Saturday Morning Missions',
      venue: 'Tarkwa Banso & Environs',
      image: '/images/gallery/rural-outreach.webp',
      caption: 'PENSA UMaT taking the gospel outside campus lecture halls into the communities and townships of Tarkwa through tracts, one-on-one witness, and practical charity.',
      badge: 'Missions Outreach',
    },
    {
      id: 'gallery-8',
      title: 'PENSA Gents&apos; Wing Campus Fellowship',
      tag: 'wings',
      date: 'Alternate Saturdays',
      venue: 'KT Hall Forecourt',
      image: '/images/gallery/gents-wing.jpeg',
      caption: 'Empowering young Christian gentlemen for leadership, integrity, academic discipline, and purposeful career advancement in the mining and engineering industries.',
      badge: 'PEMEN Gents',
    },
    {
      id: 'gallery-9',
      title: 'Prayer Force Intercessory Encounters',
      tag: 'prayer',
      date: 'Tuesdays & Pre-Service Vigils',
      venue: 'Prayer Mountain & Center',
      image: '/images/gallery/prayer-force.webp',
      caption: 'Dedicated student intercessors lifting a shield of prayer over the university administration, faculty, students&apos; health, and examination seasons.',
      badge: 'Prayer Force',
    },
    {
      id: 'gallery-10',
      title: 'International & Francophone Students Assembly',
      tag: 'wings',
      date: 'Monthly Assembly',
      venue: 'Fellowship Chapel',
      image: '/images/gallery/international-assembly.webp',
      caption: 'Providing a welcoming bilingual spiritual home for international students studying engineering and science at UMaT from across West Africa and beyond.',
      badge: 'International Assembly',
    },
    {
      id: 'gallery-11',
      title: 'Rural Crusades & Hall Evangelism Teams',
      tag: 'outreach',
      date: 'Semester Missions Trip',
      venue: 'Western Region Field',
      image: '/images/gallery/missions-field.jpg',
      caption: 'Equipping students for lifelong evangelism. Hundreds of souls saved and established in local Pentecost assemblies during annual mission outreaches.',
      badge: 'Rural Missions',
    },
    {
      id: 'gallery-12',
      title: 'Executive Council & Leadership Retreat',
      tag: 'wings',
      date: 'Annual Leadership Retreat',
      venue: 'Fellowship Secretariat',
      image: '/images/gallery/leadership-conference.jpg',
      caption: 'Pastoral board, patrons, and elected committee heads converging to pray, strategize, and coordinate seamless welfare and spiritual oversight.',
      badge: 'Secretariat Leadership',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Moments' },
    { id: 'worship', label: 'Auditorium Services' },
    { id: 'prayer', label: 'Prayer & Vigils' },
    { id: 'wings', label: 'Wings & Fellowship' },
    { id: 'outreach', label: 'Evangelism & Missions' },
  ] as const;

  const filtered = filter === 'all' ? gallery : gallery.filter((g) => g.tag === filter);

  return (
    <div className="w-full">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-amber-600 tracking-wider flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5" />
            Official Campus Media &amp; Moments
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Life at PENSA UMaT
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Authentic photographs of Sunday services, campus prayer vigils, engineering tutorials, residential cells, and fellowship life in Tarkwa.
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

      {/* Gallery Grid with High-Res Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group cursor-pointer rounded-xl overflow-hidden border border-slate-200/90 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            {/* Real Photo Thumbnail with Zoom & Badges */}
            <div className="h-56 relative overflow-hidden bg-slate-900">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              {/* Gradient Scrim for readable badges */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Top Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/30">
                  {item.badge}
                </span>
                <span className="p-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow">
                  <Eye className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Bottom Info on Image */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[11px] text-slate-300 flex items-center gap-1 mb-1 font-medium">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  {item.date}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                  {item.title}
                </h3>
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
                  {item.venue}
                </span>
                <span className="text-amber-600 font-semibold group-hover:underline">
                  View Photo &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Photo Modal / Lightbox */}
      {activeItem && (
        <div
          onClick={() => setActiveItem(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in-50 duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-700 animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
          >
            {/* Modal Image View */}
            <div className="relative h-72 sm:h-96 bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors z-10 shadow"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Watermark Crest */}
              <div className="absolute top-4 left-4 flex items-center gap-2 z-10 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                <img src="/images/cop-logo.png" alt="COP" className="w-5 h-5 object-contain" />
                <img src="/images/pensa-umat-logo.png" alt="PENSA" className="w-5 h-5 object-contain" />
                <span className="text-[11px] font-bold text-amber-300 tracking-wide uppercase">
                  PENSA UMaT Media
                </span>
              </div>

              {/* Image Title on Cover */}
              <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block mb-1">
                  {activeItem.badge}
                </span>
                <h2 className="text-lg sm:text-2xl font-black text-white leading-tight">
                  {activeItem.title}
                </h2>
              </div>
            </div>

            {/* Modal Body & Details */}
            <div className="p-6 sm:p-7 space-y-4 text-sm text-slate-700 overflow-y-auto">
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-3 border-b border-slate-100">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  {activeItem.date}
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  {activeItem.venue}
                </span>
                <span className="text-slate-400">&bull; The Church of Pentecost &bull; Tarkwa Area</span>
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-slate-500 tracking-wider block mb-1">
                  Fellowship Context &amp; Story
                </span>
                <p className="leading-relaxed text-slate-700 text-sm sm:text-base">
                  {activeItem.caption}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
                <Users className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block mb-0.5">
                    Connect with PENSA UMaT on Campus
                  </span>
                  Are you a student in Tarkwa? Complete your official 2025/2026 census registration to be assigned to your hall cell and preferred ministry wing.
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <a
                  href="https://www.facebook.com/share/15t4RRcwnn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>View More on Facebook</span>
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
                    Join Fellowship
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
