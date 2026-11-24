import React from 'react';
import Link from 'next/link';
import { Church, Award, Compass, Users, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const pillars = [
    {
      icon: <Church className="w-5 h-5 text-red-600" />,
      title: 'Spiritual Fervor & Discipleship',
      description: 'Building deep spiritual maturity through consistent prayer vigils, unadulterated Bible teaching, and reliance on the Holy Spirit.',
    },
    {
      icon: <Award className="w-5 h-5 text-[#0038A8]" />,
      title: 'Academic & Professional Excellence',
      description: 'UMaT is known for rigorous engineering and science. We run peer study circles, tutorial sessions, and career mentorship for students.',
    },
    {
      icon: <Compass className="w-5 h-5 text-red-600" />,
      title: 'Close-Knit Family Units',
      description: 'Campus life can feel overwhelming. Our residential cells in KT Hall, Chamber of Mines, Gold Refinery, and Off-Campus hostels ensure pastoral care.',
    },
    {
      icon: <Users className="w-5 h-5 text-[#0038A8]" />,
      title: 'Kingdom Missions & Evangelism',
      description: 'Taking the gospel to hall rooms, lecture blocks, Tarkwa communities, and mission fields, living as ambassadors of Christ.',
    },
  ];

  return (
    <div className="flex-1 bg-white">
      {/* Header Banner */}
      <section className="bg-[#04112B] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#00205B] relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/images/fb/challenge-climax.jpg"
            alt="PENSA UMaT Fellowship"
            className="w-full h-full object-cover object-center opacity-20 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04112B]/80 via-[#04112B]/95 to-[#04112B]" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Dual Official Crests */}
          <div className="flex items-center justify-center gap-3.5 mb-5">
            <img
              src="/images/cop-logo.png"
              alt="The Church of Pentecost"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow brightness-105"
            />
            <div className="h-8 w-px bg-white/20" />
            <img
              src="/images/pensaumatofficial.jpg"
              alt="Official PENSA UMaT Chapter Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-full drop-shadow brightness-105"
            />
          </div>

          <span className="text-xs uppercase tracking-wider font-bold text-yellow-300 bg-yellow-400/10 border border-yellow-400/30 px-3.5 py-1 rounded-full">
            Our Identity &amp; Mission
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-3 text-white">
            About PENSA UMaT
          </h1>
          <p className="mt-3 text-white/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Pentecost Students and Associates (PENSA) at the University of Mines and Technology, Tarkwa. Dedicated to raising godly leaders and mining treasures in people for Christ.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Motto & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#0038A8]/20 shadow-sm hover:border-yellow-400 transition-all">
            <span className="text-xs uppercase font-bold text-red-600 tracking-wider block mb-1">
              Fellowship Motto
            </span>
            <h2 className="text-lg font-bold text-[#00205B] mb-2">
              &ldquo;Christ in You, the Hope of Glory&rdquo;
            </h2>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Derived from Colossians 1:27, our motto reflects the indwelling power of Jesus Christ in every believer. We believe that our academic life, character, and future professions in engineering, technology, and applied sciences must be reflections of His glory.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#0038A8]/20 shadow-sm hover:border-yellow-400 transition-all">
            <span className="text-xs uppercase font-bold text-red-600 tracking-wider block mb-1">
              Church of Pentecost Vision
            </span>
            <h2 className="text-lg font-bold text-[#00205B] mb-2">
              &ldquo;A Glorious Church to Possess the Nations&rdquo;
            </h2>
            <p className="text-xs text-neutral-600 leading-relaxed">
              As a campus wing of The Church of Pentecost (Tarkwa Area), we align fully with the vision to equip every member with Christian values so they can transform their classrooms, campus hostels, mining firms, tech companies, and society at large.
            </p>
          </div>
        </div>

        {/* The 4 Pillars */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs uppercase font-bold text-red-600 tracking-wider block mb-1">
              Foundation Stones
            </span>
            <h2 className="text-2xl font-black text-[#00205B]">Our Core Pillars</h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              What defines the fellowship experience for every student at UMaT
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-[#0038A8]/20 shadow-sm hover:border-yellow-400 transition-all">
                <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center mb-3">
                  {pillar.icon}
                </div>
                <h3 className="text-sm font-bold text-[#00205B] mb-1.5">{pillar.title}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Campus History & Context */}
        <div className="bg-white rounded-2xl border border-[#0038A8]/20 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-[#00205B] mb-3">
            Fellowship on the Tarkwa Campus
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
            <p>
              PENSA UMaT has been a cornerstone of spiritual guidance since the institution&apos;s early foundation in Tarkwa, through to its charter as Ghana&apos;s premier University of Mines and Technology.
            </p>
            <p>
              With thousands of students undergoing intensive academic training in mining, geological, petroleum, renewable energy, computer science, and electrical engineering, PENSA provides the spiritual sanctuary and community that keeps students balanced, prayerful, and ethically grounded.
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xs font-bold text-[#00205B]">Ready to get connected?</h3>
              <p className="text-xs text-neutral-500">Ensure your records are up to date for this semester.</p>
            </div>
            <Link
              href="/register"
              className="px-6 py-3 rounded-xl bg-[#00205B] hover:bg-[#0038A8] text-yellow-400 text-xs font-bold flex items-center gap-2 transition-colors border border-yellow-400/30 shadow-md"
            >
              <span>Complete Membership Census</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
