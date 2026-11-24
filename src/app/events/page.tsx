'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CalendarPlus,
  ArrowRight,
  Sparkles,
  Filter,
  CheckCircle2
} from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  category: 'worship' | 'prayer' | 'academics' | 'outreach';
  dateStr: string;
  dayBadge: { month: string; day: string };
  time: string;
  venue: string;
  description: string;
  targetAudience: string;
}

export default function EventsPage() {
  const [filter, setFilter] = useState<'all' | 'worship' | 'prayer' | 'academics' | 'outreach'>('all');

  const events: EventItem[] = [
    {
      id: 'event-1',
      title: "Fresher's Akwaaba Divine Service &amp; Welcome Banquet",
      category: 'worship',
      dateStr: 'Sunday, November 29, 2026',
      dayBadge: { month: 'NOV', day: '29' },
      time: '07:30 AM &bull; 1st Session | 09:30 AM &bull; 2nd Session',
      venue: 'UMaT Main Auditorium',
      description: 'Official welcome service for all newly admitted Level 100 students. Includes Family Unit allocations, executive introductions, and a special Akwaaba reception banquet.',
      targetAudience: 'All Freshers, Continuing Students &amp; Associates',
    },
    {
      id: 'event-2',
      title: 'Dunamis Night of Fire &amp; Holy Ghost Vigil',
      category: 'prayer',
      dateStr: 'Friday, December 04, 2026',
      dayBadge: { month: 'DEC', day: '04' },
      time: '09:00 PM &ndash; 04:00 AM (All-Night Vigil)',
      venue: 'Campus Fellowship Center',
      description: 'Intense 7-hour prayer encounter standing in the gap for semester examinations, spiritual empowerment, deliverance, and campus revival.',
      targetAudience: 'Entire Fellowship &amp; Campus Believers',
    },
    {
      id: 'event-3',
      title: 'Engineering &amp; Sciences Academic Exam Clinic',
      category: 'academics',
      dateStr: 'Saturday, December 12, 2026',
      dayBadge: { month: 'DEC', day: '12' },
      time: '09:00 AM &ndash; 01:00 PM',
      venue: 'Faculty of Engineering Block A &bull; Lecture Halls 1-4',
      description: 'Coordinated by the PENSA Academic Committee. Senior colleagues and teaching assistants solving tricky engineering math, physics, thermodynamics, and circuit analysis past questions.',
      targetAudience: 'Level 100, 200 &amp; 300 Students',
    },
    {
      id: 'event-4',
      title: 'Tarkwa Community Evangelism &amp; Medical Outreach',
      category: 'outreach',
      dateStr: 'Saturday, January 09, 2027',
      dayBadge: { month: 'JAN', day: '09' },
      time: '07:00 AM &ndash; 12:00 PM',
      venue: 'Tarkwa Banso &bull; Community Market Square',
      description: 'Taking Christ outside campus walls through one-on-one soul winning, prayer for the sick, distribution of Christian literature, and free basic health screening.',
      targetAudience: 'Evangelism Team &amp; Volunteer Members',
    },
    {
      id: 'event-5',
      title: 'Possessing the Campus Annual Conference 2027',
      category: 'worship',
      dateStr: 'February 19 &ndash; 21, 2027',
      dayBadge: { month: 'FEB', day: '19' },
      time: '06:00 PM Daily | Sunday Climax 08:00 AM',
      venue: 'UMaT Main Auditorium',
      description: 'Flagship annual fellowship conference featuring anointed guest ministers, Christian corporate executives, and musical ministrations from The Minstrels.',
      targetAudience: 'Campus Wide &amp; PENSA Alumni',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'worship', label: 'Divine Services' },
    { id: 'prayer', label: 'Prayer & Vigils' },
    { id: 'academics', label: 'Academic Tutorials' },
    { id: 'outreach', label: 'Evangelism' },
  ] as const;

  const filtered = filter === 'all' ? events : events.filter((e) => e.category === filter);

  const getCalendarLink = (event: EventItem) => {
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      'PENSA UMaT - ' + event.title.replace(/&amp;/g, '&')
    )}&location=${encodeURIComponent(event.venue.replace(/&bull;/g, '-'))}&details=${encodeURIComponent(
      event.description
    )}`;
  };

  return (
    <div className="flex-1 bg-slate-50 pb-20">
      {/* Header Banner */}
      <section className="bg-[#0A192F] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/images/hero/hero-conference-3.jpg"
            alt="PENSA Events"
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
            Campus Calendar &bull; 2025/2026
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-3 text-white">
            Upcoming Fellowship Events
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Mark your calendar. Don&apos;t miss any of our powerful campus services, academic clinics, all-night prayer vigils, and outreach programmes at UMaT.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  filter === c.id
                    ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                    : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/15'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Listing */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-5">
        {filtered.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-sm card-hover flex flex-col sm:flex-row sm:items-start gap-6"
          >
            {/* Date Badge */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#0A192F] text-white flex flex-col items-center justify-center shrink-0 border border-slate-800 shadow-sm">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                {event.dayBadge.month}
              </span>
              <span className="text-2xl sm:text-3xl font-black font-mono leading-none mt-0.5">
                {event.dayBadge.day}
              </span>
            </div>

            {/* Event Info */}
            <div className="flex-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 block mb-1">
                {event.dateStr}
              </span>
              <h2
                className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-2"
                dangerouslySetInnerHTML={{ __html: event.title }}
              />
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {event.description}
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-700 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span dangerouslySetInnerHTML={{ __html: event.time }} />
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span dangerouslySetInnerHTML={{ __html: event.venue }} />
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span dangerouslySetInnerHTML={{ __html: event.targetAudience }} />
                </div>
              </div>
            </div>

            {/* Add to Calendar Button */}
            <div className="shrink-0 self-start sm:self-center">
              <a
                href={getCalendarLink(event)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-lg border border-slate-300 hover:border-[#0A192F] hover:bg-[#0A192F] hover:text-white text-slate-700 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
              >
                <CalendarPlus className="w-3.5 h-3.5 text-amber-500" />
                <span>Add to Calendar</span>
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* Suggest or Register CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-[#0A192F] text-white rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Want to receive SMS / WhatsApp Event Reminders?
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-lg leading-relaxed">
              Register your phone number in the official membership census so our Secretariat can send you weekly announcements, venue notices, and cell alerts.
            </p>
          </div>
          <Link
            href="/register"
            className="px-6 py-2.5 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold shrink-0 flex items-center gap-2 transition-colors shadow"
          >
            <span>Register in Census</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
