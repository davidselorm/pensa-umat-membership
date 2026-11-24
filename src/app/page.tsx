'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CampusLifeGallery from '@/components/CampusLifeGallery';
import ServiceCountdown from '@/components/ServiceCountdown';
import {
  Clock,
  MapPin,
  Users,
  Compass,
  ArrowRight,
  Award,
  Flame,
  CheckCircle2,
  Calendar,
  Sparkles,
  BookOpen,
  Church,
  ChevronRight,
  GraduationCap,
  Heart,
  Music,
  Tv
} from 'lucide-react';

export default function HomePage() {
  // Hero Background Carousel
  const heroSlides = [
    {
      image: '/images/fb/challenge-climax.jpg',
      caption: 'The Climax of Challenge \'26 &bull; UMaT Main Auditorium',
    },
    {
      image: '/images/fb/worship-adoration.jpg',
      caption: 'Deep Campus Worship & Prophetic Adoration',
    },
    {
      image: '/images/fb/heralds-of-zion.jpg',
      caption: 'Heralds of Zion &bull; Sounds from Heaven',
    },
    {
      image: '/images/fb/in-his-presence.jpg',
      caption: 'Dunamis Encounters &bull; Hearts Aligned with God',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const stats = [
    { label: 'Student Members', value: '1,200+', icon: <Users className="w-4 h-4 text-yellow-400" /> },
    { label: 'Campus Residential Units', value: '4 Cells', icon: <Compass className="w-4 h-4 text-red-500" /> },
    { label: 'Fellowship Ministries', value: '10 Arms', icon: <Award className="w-4 h-4 text-yellow-400" /> },
    { label: 'Sunday Divine Sessions', value: '2 Services', icon: <Church className="w-4 h-4 text-white" /> },
  ];

  const weeklyServices = [
    {
      title: 'Sunday Divine Service',
      badge: 'Main Worship Gathering',
      time: 'Session 1: 07:30 AM &bull; Session 2: 09:30 AM',
      venue: 'UMaT Main Auditorium',
      desc: 'High praises, anointed prophetic worship, life-transforming Word ministration, and communion.',
      image: '/images/fb/worship-adoration.jpg',
    },
    {
      title: 'Midweek Teaching & Miracle Service',
      badge: 'Bible Exposition',
      time: 'Wednesdays &bull; 6:30 PM &ndash; 8:15 PM',
      venue: 'Campus Fellowship Center',
      desc: 'Systematic expository Bible study, practical student life discussions, spiritual warfare, and miracles.',
      image: '/images/fb/hope-of-glory.jpg',
    },
    {
      title: 'Dunamis Friday Encounters',
      badge: 'Holy Ghost Vigils',
      time: 'Fridays &bull; 9:00 PM (Bi-Weekly)',
      venue: 'Auditorium / Fellowship Center',
      desc: 'Intense Holy Ghost prayer vigils, revival impartation, semester examination intercession, and breakthroughs.',
      image: '/images/fb/in-his-presence.jpg',
    },
    {
      title: 'Residential Family Units',
      badge: 'Hostel Fellowships',
      time: 'Sundays &bull; 4:30 PM &ndash; 5:30 PM',
      venue: 'KT Hall, Chamber &amp; Off-Campus Cells',
      desc: 'Close-knit fellowship, pastoral check-ins, prayer walks, and academic brotherhood right where you live.',
      image: '/images/fb/arrival-moments.jpg',
    },
  ];

  const featuredMinistries = [
    {
      name: 'Heralds of Zion (Music Ministry)',
      role: 'Praise & Prophetic Worship',
      image: '/images/fb/heralds-of-zion.jpg',
      desc: 'Leading the campus in high praises, intimate worship, and anointed choral presentations.',
    },
    {
      name: 'Creative Arts & Christian Drama',
      role: 'Drama & Choreography',
      image: '/images/fb/drama-dance.jpg',
      desc: 'Communicating the living gospel through inspiring drama, choreography, and spoken word.',
    },
    {
      name: 'Prayer Force & Missions',
      role: 'Intercession & Soul Winning',
      image: '/images/fb/challenge-day2.jpg',
      desc: 'Standing in the gap for students, semester exams, and evangelizing Tarkwa mining communities.',
    },
    {
      name: 'Professional Guild & Alumni',
      role: 'Industry & Engineering Mentorship',
      image: '/images/fb/alumni-spotlight.jpg',
      desc: 'Connecting engineering and science undergraduates with accomplished PENSA alumni mentors.',
    },
  ];

  return (
    <div className="flex-1 bg-white pb-20 overflow-x-hidden">
      {/* Cinematic Hero Section with Cross-Fading Photography */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] bg-[#04112B] text-white flex items-center justify-center overflow-hidden border-b border-[#00205B]">
        {/* Background Photo Slider with Cinema Ken-Burns Motion */}
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-40 scale-105 transition-transform duration-[7000ms]' : 'opacity-0 scale-100'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.caption}
              className="w-full h-full object-cover object-center filter contrast-110"
            />
          </div>
        ))}

        {/* Ambient Dark Ultramarine Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04112B] via-[#04112B]/80 to-[#00205B]/60 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-400/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10 flex flex-col items-center">
          {/* Official Tri-Crest Institutional Badge */}
          <div className="inline-flex items-center gap-2.5 sm:gap-3.5 bg-[#00205B]/85 px-4 py-2 rounded-2xl border border-yellow-400/30 shadow-2xl backdrop-blur-md mb-6 hover:border-yellow-400/60 transition-all">
            <img
              src="/images/cop-logo.png"
              alt="The Church of Pentecost"
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow brightness-105"
            />
            <div className="h-6 w-px bg-white/20" />
            <img
              src="/images/pensaumatofficial.jpg"
              alt="Official PENSA UMaT Logo"
              className="w-11 h-11 sm:w-13 sm:h-13 object-contain rounded-full drop-shadow-xl hover:scale-105 transition-transform"
            />
            <div className="h-6 w-px bg-white/20" />
            <img
              src="/images/umat-logo.jpg"
              alt="UMaT Crest"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded drop-shadow brightness-105"
            />
          </div>

          {/* Academic Session Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-yellow-400/40 bg-yellow-400/10 text-yellow-300 text-xs font-semibold mb-5 tracking-wide uppercase shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            <span>The Church of Pentecost &bull; UMaT Chapter, Tarkwa</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight max-w-4xl drop-shadow-md">
            MINING THE TREASURES IN PEOPLE FOR CHRIST
          </h1>

          <p className="mt-4 text-white/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed drop-shadow">
            Welcome to PENSA UMaT. A family of faith, prayer, and academic excellence on the campus of Ghana&apos;s premier University of Mines and Technology.
          </p>

          {/* Action Hub */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/register"
              className="px-7 py-3.5 rounded-xl bg-[#FACC15] hover:bg-yellow-300 text-[#00205B] text-xs sm:text-sm font-bold shadow-xl shadow-black/25 transition-all active:scale-95 flex items-center gap-2 group border border-yellow-400"
            >
              <span>Membership Census 2025/2026</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/ministries"
              className="px-6 py-3.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-all backdrop-blur-sm"
            >
              Explore Ministries
            </Link>

            <Link
              href="/family-units"
              className="px-6 py-3.5 rounded-xl border border-red-600/30 bg-red-600/15 hover:bg-red-600/25 text-white text-xs sm:text-sm font-semibold transition-all backdrop-blur-sm"
            >
              Residential Cells &rarr;
            </Link>
          </div>

          {/* Slide Indicator Dots */}
          <div className="mt-8 flex items-center gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === i ? 'w-7 bg-[#FACC15]' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Live Stats Ribbon */}
          <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl text-left">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="bg-[#00205B]/80 border border-[#0038A8]/50 rounded-xl p-3.5 backdrop-blur-md hover:border-yellow-400/50 transition-all card-hover"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xl sm:text-2xl font-black text-white font-mono">{s.value}</span>
                  {s.icon}
                </div>
                <span className="text-[11px] text-white/70 font-medium leading-tight block">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real-time Countdown Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <ServiceCountdown />
      </section>

      {/* Chapter Identity & Welcome (Split Layout) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs uppercase font-bold text-red-600 tracking-wider block mb-2">
              Our Vision &amp; Campus Mission
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#00205B] leading-tight">
              A Spiritual Sanctuary for University Students in Tarkwa
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
              At the University of Mines and Technology, academic training in engineering, geology, computing, and applied sciences demands extreme dedication. PENSA UMaT provides the spiritual foundation, close-knit brotherhood, and pastoral care that equips every student to excel spiritually and intellectually.
            </p>

            <div className="mt-6 p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/40">
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 block mb-1">
                Fellowship Motto &bull; Colossians 1:27
              </span>
              <p className="text-sm font-bold text-[#00205B] italic">
                &ldquo;Christ in You, the Hope of Glory&rdquo;
              </p>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Link
                href="/about"
                className="text-xs font-bold text-[#00205B] hover:text-red-600 inline-flex items-center gap-1.5 group transition-colors"
              >
                <span>Read our story and core pillars</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Visual Showcase Stack */}
          <div className="grid grid-cols-2 gap-4 relative">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#0038A8]/20 h-64 sm:h-72">
              <img
                src="/images/fb/freshers-akwaaba.jpg"
                alt="Freshers Akwaaba Service"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#0038A8]/20 h-64 sm:h-72 mt-6">
              <img
                src="/images/fb/arrival-moments.jpg"
                alt="Fellowship Arrival Moments"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Worship Rhythm & Weekly Gathering Hours */}
      <section className="bg-[#04112B] text-white py-16 border-y border-[#00205B] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#00205B] gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-yellow-400 tracking-wider">
                Gathering Rhythm
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Weekly Service Schedules
              </h2>
            </div>
            <p className="text-xs text-white/70 max-w-md">
              Join thousands of Christian students gathering for spirit-filled services across UMaT campus.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {weeklyServices.map((svc, idx) => (
              <div
                key={idx}
                className="bg-[#00205B] border border-[#0038A8]/40 rounded-2xl overflow-hidden shadow-md flex flex-col justify-between hover:border-yellow-400 transition-all card-hover group"
              >
                {/* Photo Thumbnail */}
                <div className="h-44 relative overflow-hidden bg-black">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00205B] via-[#00205B]/30 to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#00205B]/90 backdrop-blur-md text-yellow-300 border border-yellow-400/30">
                    {svc.badge}
                  </span>
                </div>

                {/* Card Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-yellow-300 transition-colors leading-snug mb-2">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-white/75 leading-relaxed mb-4">
                      {svc.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#0038A8]/40 space-y-1.5 text-[11px] text-white/80">
                    <div className="flex items-start gap-1.5 text-yellow-400 font-semibold">
                      <Clock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span dangerouslySetInnerHTML={{ __html: svc.time }} />
                    </div>
                    <div className="flex items-center gap-1.5 text-white/70">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-red-500" />
                      <span>{svc.venue}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Campus Life & Moments Media Gallery */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CampusLifeGallery />
      </section>

      {/* Fellowship Ministries & Arms of Service Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-neutral-200 gap-4">
          <div>
            <span className="text-xs uppercase font-bold text-red-600 tracking-wider">
              Arms of Service
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00205B] mt-1">
              Ministries &amp; Departments
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Every member has a grace and a calling. Discover the various arms where you can serve God on campus.
            </p>
          </div>
          <Link
            href="/ministries"
            className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>Explore All 10 Ministries</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredMinistries.map((min, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#0038A8]/20 shadow-sm overflow-hidden flex flex-col justify-between card-hover group hover:border-yellow-400 transition-all"
            >
              <div className="h-44 relative overflow-hidden bg-black">
                <img
                  src={min.image}
                  alt={min.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#00205B]/90 backdrop-blur-md text-yellow-300 border border-yellow-400/30">
                  {min.role}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#00205B] group-hover:text-red-600 transition-colors leading-snug mb-1">
                    {min.name}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed mb-3">{min.desc}</p>
                </div>
                <Link
                  href="/ministries"
                  className="text-[11px] font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1"
                >
                  <span>Learn more</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cinema-Grade Membership Census Invitation */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-gradient-to-br from-[#00205B] via-[#0038A8] to-[#04112B] rounded-3xl border border-yellow-400/30 p-8 sm:p-12 shadow-2xl text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4 bg-yellow-400/10 border border-yellow-400/30 px-3.5 py-1 rounded-full w-fit">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-xs uppercase font-bold text-yellow-300 tracking-wider">
                Official 2025/2026 Directory &bull; PENSA UMaT
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Ready for the Academic Session? Complete Your Census
            </h2>

            <p className="mt-3 text-white/90 text-xs sm:text-sm leading-relaxed max-w-2xl">
              All freshmen, continuing students, postgraduate researchers, and associates are required to complete the official census for the current semester. It takes less than 2 minutes and assigns you to your residential cell and engineering tutorial groups.
            </p>

            {/* Value Checkpoints */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>Immediate Hostel Cell Placement (KT, Chamber, Off-Campus)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>Engineering &amp; Science Course Tutorial Groups</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>Ministry Arm &amp; Department Placement</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>Pastoral Care &amp; Student Welfare Coverage</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="px-7 py-3.5 rounded-xl bg-[#FACC15] hover:bg-yellow-300 text-[#00205B] text-xs sm:text-sm font-bold shadow-xl shadow-black/30 transition-all active:scale-95 flex items-center gap-2 group border border-yellow-400"
              >
                <span>Complete Membership Census Online</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/family-units"
                className="px-6 py-3.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-all backdrop-blur-sm"
              >
                View Family Units
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
