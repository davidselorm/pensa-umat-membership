import React from 'react';
import Link from 'next/link';
import { Church, Target, BookOpen, Compass, Award, Users, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const pillars = [
    {
      icon: <Church className="w-5 h-5 text-amber-500" />,
      title: 'Spiritual Fervor & Discipleship',
      description: 'Building deep spiritual maturity through consistent prayer vigils, unadulterated Bible teaching, and reliance on the Holy Spirit.',
    },
    {
      icon: <Award className="w-5 h-5 text-amber-500" />,
      title: 'Academic & Professional Excellence',
      description: 'UMaT is known for rigorous engineering and science. We run peer study circles, tutorial sessions, and career mentorship for students.',
    },
    {
      icon: <Compass className="w-5 h-5 text-amber-500" />,
      title: 'Close-Knit Family Units',
      description: 'Campus life can feel overwhelming. Our residential cells in KT Hall, Chamber of Mines, Gold Refinery, and Off-Campus hostels ensure pastoral care.',
    },
    {
      icon: <Users className="w-5 h-5 text-amber-500" />,
      title: 'Kingdom Missions & Evangelism',
      description: 'Taking the gospel to hall rooms, lecture blocks, Tarkwa communities, and mission fields, living as ambassadors of Christ.',
    },
  ];

  return (
    <div className="flex-1 bg-slate-50">
      {/* Header Banner */}
      <section className="bg-[#0A192F] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          {/* Dual Official Crests */}
          <div className="flex items-center justify-center gap-3.5 mb-5">
            <img
              src="/images/cop-logo.svg"
              alt="The Church of Pentecost"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow"
            />
            <div className="h-8 w-px bg-slate-700" />
            <img
              src="/images/pensa-umat-logo.svg"
              alt="PENSA UMaT Chapter"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow"
            />
          </div>

          <span className="text-xs uppercase tracking-wider font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
            Our Identity &amp; Mission
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-3 text-white">
            About PENSA UMaT
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Pentecost Students and Associates (PENSA) at the University of Mines and Technology, Tarkwa. Dedicated to raising godly leaders and mining treasures in people for Christ.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Motto & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-slate-300 shadow-sm">
            <span className="text-xs uppercase font-bold text-amber-600 tracking-wider block mb-1">
              Fellowship Motto
            </span>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              &ldquo;Christ in You, the Hope of Glory&rdquo;
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Derived from Colossians 1:27, our motto reflects the indwelling power of Jesus Christ in every believer. We believe that our academic life, character, and future professions in engineering, technology, and applied sciences must be reflections of His glory.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-300 shadow-sm">
            <span className="text-xs uppercase font-bold text-amber-600 tracking-wider block mb-1">
              Church of Pentecost Vision
            </span>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              &ldquo;A Glorious Church to Possess the Nations&rdquo;
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              As a campus wing of The Church of Pentecost (Tarkwa Area), we align fully with the vision to equip every member with Christian values so they can transform their classrooms, campus hostels, mining firms, tech companies, and society at large.
            </p>
          </div>
        </div>

        {/* The 4 Pillars */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Our Core Pillars</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              What defines the fellowship experience for every student at UMaT
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                <div className="w-9 h-9 rounded bg-amber-50 border border-amber-200 flex items-center justify-center mb-3">
                  {pillar.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{pillar.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Campus History & Context */}
        <div className="bg-white rounded-lg border border-slate-300 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-3">
            Fellowship on the Tarkwa Campus
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              PENSA UMaT has been a cornerstone of spiritual guidance since the institution&apos;s early days as the KNUST School of Mines and later Western University College, through to its charter as the University of Mines and Technology.
            </p>
            <p>
              With thousands of students undergoing intensive academic training in mining, geological, petroleum, renewable energy, computer science, and electrical engineering, PENSA provides the spiritual sanctuary and community that keeps students balanced, prayerful, and ethically grounded.
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xs font-bold text-slate-900">Ready to get connected?</h3>
              <p className="text-xs text-slate-500">Ensure your records are up to date for this semester.</p>
            </div>
            <Link
              href="/register"
              className="px-5 py-2.5 rounded-md bg-[#0A192F] hover:bg-[#122A4E] text-white text-xs font-semibold flex items-center gap-2 transition-colors"
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
