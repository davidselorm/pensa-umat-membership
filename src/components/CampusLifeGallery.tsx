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
  tag: 'worship' | 'praise' | 'conferences' | 'arts' | 'community';
  date: string;
  venue: string;
  image: string;
  caption: string;
  badge: string;
  fbUrl: string;
}

export default function CampusLifeGallery() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'worship' | 'praise' | 'conferences' | 'arts' | 'community'>('all');

  const gallery: GalleryItem[] = [
    {
      id: 'gallery-1',
      title: 'Freshers Akwaaba Service',
      tag: 'community',
      date: 'Semester Matriculation Season',
      venue: 'UMaT Main Auditorium',
      image: '/images/fb/freshers-akwaaba.jpg',
      caption: 'Welcoming newly admitted freshmen into the PENSA UMaT family. Assigning residential cell leaders, course tutorial seniors, and prayer partners.',
      badge: 'Akwaaba Service',
      fbUrl: 'https://www.facebook.com/share/p/1Db7dTHSWs/',
    },
    {
      id: 'gallery-2',
      title: 'Climax of Challenge Conference',
      tag: 'conferences',
      date: 'Annual Semester Conference',
      venue: 'UMaT Main Auditorium',
      image: '/images/fb/challenge-climax.jpg',
      caption: 'The glorious climax of CHALLENGE \'26 campus conference. Over 1,200 students experiencing spiritual revival, fire impartation, and breakthrough.',
      badge: 'Challenge \'26',
      fbUrl: 'https://www.facebook.com/share/p/1CQmU7BMCb/',
    },
    {
      id: 'gallery-3',
      title: 'Deep Campus Worship & Adoration',
      tag: 'worship',
      date: 'Sunday Divine Service',
      venue: 'UMaT Main Auditorium',
      image: '/images/fb/worship-adoration.jpg',
      caption: 'Students pressing into God\'s presence in intimate worship. Hearts aligned, spirits lifted as academic stress melts in the presence of God.',
      badge: 'Divine Worship',
      fbUrl: 'https://www.facebook.com/share/p/152kAKRodcK/',
    },
    {
      id: 'gallery-4',
      title: 'Heralds of Zion Music Ministry',
      tag: 'praise',
      date: 'Midweek & Sunday Services',
      venue: 'Fellowship Center Stage',
      image: '/images/fb/heralds-of-zion.jpg',
      caption: 'The Heralds of Zion ministering not just songs, but sounds from heaven! Anointed praise, powerful vocals, and prophetic ministration.',
      badge: 'Music Ministry',
      fbUrl: 'https://www.facebook.com/share/p/1A7dt482v9/',
    },
    {
      id: 'gallery-5',
      title: 'Joyful Praise & Ghanaian Highlife',
      tag: 'praise',
      date: 'Sunday Praise Sessions',
      venue: 'UMaT Main Auditorium',
      image: '/images/fb/praise-ministry.jpg',
      caption: 'A sound of joyful praise filling the atmosphere! Students dancing and celebrating the goodness of the Lord across campus.',
      badge: 'Praise Ministry',
      fbUrl: 'https://www.facebook.com/share/p/1JUgLkmFUa/',
    },
    {
      id: 'gallery-6',
      title: 'In His Presence - Student Intimacy',
      tag: 'worship',
      date: 'Friday Dunamis Vigils',
      venue: 'Campus Fellowship Center',
      image: '/images/fb/in-his-presence.jpg',
      caption: 'In His presence, everything else fades away. Deep adoration, intercession for semester examinations, and holy surrender.',
      badge: 'Dunamis Vigil',
      fbUrl: 'https://www.facebook.com/share/p/192fvFbf2w/',
    },
    {
      id: 'gallery-7',
      title: 'Scenes from Challenge Conference',
      tag: 'conferences',
      date: 'Day 2 Revival Encounters',
      venue: 'UMaT Main Auditorium',
      image: '/images/fb/challenge-day2.jpg',
      caption: 'Spiritual revival and Holy Ghost impartation as students dedicate their academic journey and campus life to God Almighty.',
      badge: 'Conference Revival',
      fbUrl: 'https://www.facebook.com/share/p/1FjMj1pfn8/',
    },
    {
      id: 'gallery-8',
      title: 'Creative Arts, Dance & Christian Drama',
      tag: 'arts',
      date: 'Special Program Services',
      venue: 'Fellowship Center Auditorium',
      image: '/images/fb/drama-dance.jpg',
      caption: 'Through music, choreography, and dramatic ministration, the living word of God is brought to life powerfully on the campus stage.',
      badge: 'Creative Arts',
      fbUrl: 'https://www.facebook.com/share/p/19x1uf6tFc/',
    },
    {
      id: 'gallery-9',
      title: 'Christ in You - The Hope of Glory',
      tag: 'worship',
      date: 'Sunday Divine Service Session 2',
      venue: 'UMaT Main Auditorium',
      image: '/images/fb/hope-of-glory.jpg',
      caption: 'Living out our motto: "Christ in You, the Hope of Glory". Equipping tertiary students with kingdom character and intellectual excellence.',
      badge: 'Fellowship Motto',
      fbUrl: 'https://www.facebook.com/share/p/1ARVVH5EGJ/',
    },
    {
      id: 'gallery-10',
      title: 'Fellowship Early Birds & Arrival Moments',
      tag: 'community',
      date: 'Sunday Morning 06:30 AM',
      venue: 'Auditorium Forecourt',
      image: '/images/fb/arrival-moments.jpg',
      caption: 'The early birds ready for a powerful moment in God\'s house. Students arriving early with smiles, bibles, and expectant hearts.',
      badge: 'Campus Fellowship',
      fbUrl: 'https://www.facebook.com/share/p/1F2qYPHU7E/',
    },
    {
      id: 'gallery-11',
      title: 'Alumni Mentorship & Recognition',
      tag: 'community',
      date: 'Alumni Symposium Series',
      venue: 'Alumni Hall & Campus',
      image: '/images/fb/alumni-spotlight.jpg',
      caption: 'Celebrating our distinguished alumni like Ms. Claudia Asare. Connecting undergraduate engineering students with proven industry professionals.',
      badge: 'Alumni Guild',
      fbUrl: 'https://www.facebook.com/share/p/1DziQVgaxM/',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Moments' },
    { id: 'worship', label: 'Worship & Prayer' },
    { id: 'praise', label: 'Praise & Music' },
    { id: 'conferences', label: 'Conferences' },
    { id: 'arts', label: 'Creative Arts' },
    { id: 'community', label: 'Campus Life' },
  ] as const;

  const filtered = filter === 'all' ? gallery : gallery.filter((g) => g.tag === filter);

  return (
    <div className="w-full">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-amber-600 tracking-wider flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5" />
            Official Campus Photography
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Life at PENSA UMaT
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Authentic photographs of Sunday services, campus prayer vigils, praise ministration, and fellowship life in Tarkwa.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === c.id
                  ? 'bg-[#0A192F] text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid with Authentic Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group cursor-pointer rounded-2xl overflow-hidden border border-slate-200/90 bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between card-hover"
          >
            {/* Authentic Photo Image Container */}
            <div className="h-60 relative overflow-hidden bg-slate-900">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Top Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-amber-300 border border-white/15">
                  {item.badge}
                </span>
                <span className="p-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow">
                  <Eye className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Bottom Info on Image */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[11px] text-slate-300 flex items-center gap-1 font-medium mb-0.5">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  <span>{item.date}</span>
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
                  <span>{item.venue}</span>
                </span>
                <span className="text-amber-600 font-semibold group-hover:underline">
                  View Photo &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Photo Lightbox Modal */}
      {activeItem && (
        <div
          onClick={() => setActiveItem(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in-50 duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-700 animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
          >
            {/* Modal Image View */}
            <div className="relative h-80 sm:h-96 bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-contain object-center"
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
                <img src="/images/cop-logo.png" alt="COP" className="w-4 h-4 object-contain" />
                <img src="/images/pensaumatofficial.jpg" alt="Official PENSA UMaT Logo" className="w-4 h-4 object-contain rounded-full" />
                <span className="text-[10px] font-bold text-amber-300 tracking-wide uppercase">
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
                <span className="flex items-center gap-1.5 font-medium text-slate-800">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>{activeItem.date}</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium text-slate-800">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>{activeItem.venue}</span>
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

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <a
                  href={activeItem.fbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Original Post on Facebook</span>
                </a>

                <div className="flex items-center gap-2">
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
