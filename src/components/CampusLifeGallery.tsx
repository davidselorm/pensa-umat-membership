'use client';

import React, { useState } from 'react';
import { Camera, Eye, X, Calendar, MapPin, Users, Heart } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  tag: string;
  date: string;
  venue: string;
  gradient: string;
  caption: string;
  accent: string;
}

export default function CampusLifeGallery() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'worship' | 'prayer' | 'cells' | 'outreach'>('all');

  const gallery: GalleryItem[] = [
    {
      id: 'gallery-1',
      title: 'Divine Service at UMaT Main Auditorium',
      tag: 'worship',
      date: 'Sunday Morning Services',
      venue: 'UMaT Main Auditorium',
      gradient: 'from-[#0A192F] via-[#1E3A8A] to-[#0A192F]',
      caption: 'Over 1,200 students gathering in the prestigious UMaT Main Auditorium for the 1st and 2nd sessions of Sunday Divine Service. Anointed praise, worship, and expository Word.',
      accent: 'text-amber-400',
    },
    {
      id: 'gallery-2',
      title: 'The Minstrels & Instrumentalists Live',
      tag: 'worship',
      date: 'Annual Choral Evening',
      venue: 'Auditorium Stage',
      gradient: 'from-[#1E1B4B] via-[#4338CA] to-[#0F172A]',
      caption: 'The official choir of PENSA UMaT leading the fellowship in deep prophetic worship and glorious Ghanaian highlife praises backed by full brass and rhythm sections.',
      accent: 'text-sky-300',
    },
    {
      id: 'gallery-3',
      title: 'Dunamis Night of Fire & Intercession',
      tag: 'prayer',
      date: 'Bi-Weekly Friday All-Night',
      venue: 'Campus Fellowship Center',
      caption: 'Students pressing into God&apos;s presence during all-night prayer vigils. Interceding for semester examinations, spiritual revival, academic excellence, and family breakthroughs.',
      accent: 'text-orange-400',
    },
    {
      id: 'gallery-4',
      title: 'KT Hall Family Unit Fellowship Gathering',
      tag: 'cells',
      date: 'Sunday 4:30 PM',
      venue: 'KT Hall Common Room',
      caption: 'Residential campus cells meeting in small circles. Students sharing personal testimonies, reviewing Sunday sermon notes, and encouraging one another.',
      accent: 'text-emerald-400',
    },
    {
      id: 'gallery-5',
      title: 'Engineering Academic Exam Clinic',
      tag: 'cells',
      date: 'Semester Exam Season',
      venue: 'Engineering Block A',
      caption: 'Senior engineering students and teaching assistants organizing free peer tutorials on engineering mathematics, applied mechanics, circuit analysis, and thermodynamics.',
      accent: 'text-amber-300',
    },
    {
      id: 'gallery-6',
      title: 'Tarkwa Community Evangelism & Missions',
      tag: 'outreach',
      date: 'Saturday Morning Outreach',
      venue: 'Tarkwa Banso & Market Area',
      caption: 'PENSA UMaT members taking the gospel outside campus walls into the mining townships and communities of Tarkwa with tracts, prayer, and practical charity.',
      accent: 'text-rose-400',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Moments' },
    { id: 'worship', label: 'Auditorium Services' },
    { id: 'prayer', label: 'Prayer & Vigils' },
    { id: 'cells', label: 'Hostel Cells & Academics' },
    { id: 'outreach', label: 'Evangelism & Missions' },
  ] as const;

  const filtered = filter === 'all' ? gallery : gallery.filter((g) => g.tag === filter);

  return (
    <div className="w-full">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-amber-600 tracking-wider">
            Campus Life &amp; Community
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Life at PENSA UMaT
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg">
            Glimpses of fellowship, intense prayer, choir ministrations, and vibrant student community at the University of Mines and Technology.
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

      {/* Gallery Grid with Visual Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group cursor-pointer rounded-xl overflow-hidden border border-slate-200/90 bg-white shadow-sm card-hover flex flex-col justify-between"
          >
            {/* Visual Cover Banner with Authentic Logos & Typography */}
            <div
              className={`h-48 bg-gradient-to-br ${item.gradient} p-5 flex flex-col justify-between relative overflow-hidden text-white`}
            >
              <div className="flex items-center justify-between relative z-10">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm border border-white/20 ${item.accent}`}>
                  {item.venue}
                </span>
                <span className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 text-white transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Watermark Logo in background */}
              <div className="absolute right-3 -bottom-4 opacity-15 pointer-events-none w-32 h-32">
                <img src="/images/pensa-umat-logo.svg" alt="PENSA" className="w-full h-full object-contain" />
              </div>

              <div className="relative z-10">
                <span className="text-[11px] text-slate-300 block font-medium mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  {item.date}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>

            {/* Bottom Card Summary */}
            <div className="p-4 bg-white text-xs text-slate-600 flex-1 flex flex-col justify-between">
              <p className="line-clamp-2 leading-relaxed mb-3">
                {item.caption}
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>The Church of Pentecost &bull; UMaT</span>
                <span className="text-amber-600 font-semibold group-hover:underline">
                  View Story &rarr;
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
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in-50 duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-700 animate-in zoom-in-95 duration-200"
          >
            {/* Modal Header Banner */}
            <div className={`p-8 bg-gradient-to-br ${activeItem.gradient} text-white relative`}>
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <img src="/images/cop-logo.svg" alt="COP" className="w-6 h-6 object-contain" />
                <img src="/images/pensa-umat-logo.svg" alt="PENSA" className="w-6 h-6 object-contain" />
                <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                  PENSA UMaT &bull; Official Archive
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight mt-1">
                {activeItem.title}
              </h2>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  {activeItem.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {activeItem.venue}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-5 text-sm text-slate-700">
              <div>
                <span className="text-xs uppercase font-bold text-slate-500 tracking-wider block mb-1">
                  Fellowship Experience
                </span>
                <p className="leading-relaxed text-slate-700 text-sm sm:text-base">
                  {activeItem.caption}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
                <Users className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block mb-0.5">
                    Want to be part of these campus moments?
                  </span>
                  Register for the 2025/2026 Academic Census and join an active Family Unit or ministry department.
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  onClick={() => setActiveItem(null)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
                >
                  Close
                </button>
                <a
                  href="/register"
                  onClick={() => setActiveItem(null)}
                  className="px-5 py-2 rounded-lg bg-[#0A192F] hover:bg-[#122A4E] text-white text-xs font-semibold shadow"
                >
                  Register in Census
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
