import React from 'react';
import Link from 'next/link';
import {
  Mic2,
  Tv,
  Flame,
  Globe2,
  Boxes,
  HeartHandshake,
  Music,
  GraduationCap,
  ArrowRight
} from 'lucide-react';

export default function MinistriesPage() {
  const ministries = [
    {
      name: 'The Minstrels (PENSA Choir)',
      icon: <Mic2 className="w-5 h-5 text-amber-500" />,
      description: 'Anointed choir leading the fellowship in high praises, deep worship, and specialized choral ministrations.',
      schedule: 'Rehearsals: Saturdays 4:00 PM &bull; Main Auditorium',
    },
    {
      name: 'Instrumentalists & Audio Engineering',
      icon: <Music className="w-5 h-5 text-amber-500" />,
      description: 'Keyboardists, bassists, lead guitarists, drummers, and acoustic sound engineers managing church audio equipment.',
      schedule: 'Sound Checks: Sunday 6:30 AM &bull; Rehearsals: Fridays',
    },
    {
      name: 'Media & Technical Department',
      icon: <Tv className="w-5 h-5 text-amber-500" />,
      description: 'Livestreaming, campus photography, graphic design, video documentary, projection, and official digital communications.',
      schedule: 'Technical Crew: Sundays &amp; Midweek Services',
    },
    {
      name: 'Prayer Force (Intercessory Wing)',
      icon: <Flame className="w-5 h-5 text-amber-500" />,
      description: 'Standing in the gap for the body of Christ, student welfare, exam seasons, and national revival through intense intercession.',
      schedule: 'Tuesdays 6:30 PM &amp; Friday Prayer Encounters',
    },
    {
      name: 'Evangelism & Missions Committee',
      icon: <Globe2 className="w-5 h-5 text-amber-500" />,
      description: 'Outreach to campus halls, hostels, lecture theatres, surrounding Tarkwa mining communities, and annual rural crusades.',
      schedule: 'Saturday Morning Street &amp; Hall Evangelism: 7:00 AM',
    },
    {
      name: 'Organizing & Logistics Committee',
      icon: <Boxes className="w-5 h-5 text-amber-500" />,
      description: 'Logistics, seating arrangement, stage management, venue booking, and coordinating major fellowship conferences.',
      schedule: 'Setup: Saturdays 5:00 PM &amp; Sundays before service',
    },
    {
      name: 'Ushering, Protocol & Welfare',
      icon: <HeartHandshake className="w-5 h-5 text-amber-500" />,
      description: 'Warmly welcoming worshippers, maintaining orderly service atmosphere, offering pastoral protocol, and member welfare support.',
      schedule: 'Duty Roster: All church gatherings &amp; services',
    },
    {
      name: 'Academic & Professional Committee',
      icon: <GraduationCap className="w-5 h-5 text-amber-500" />,
      description: 'Organizing peer tutorials across UMaT engineering programmes, past question banks, career seminars, and academic mentorship.',
      schedule: 'Study Sessions: Weekday Evenings in Lecture Blocks',
    },
  ];

  return (
    <div className="flex-1 bg-slate-50">
      {/* Header Banner */}
      <section className="bg-[#0A192F] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase tracking-wider font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded">
            Fellowship Arms of Service
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 text-white">
            Ministries &amp; Committees
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Every member has a grace and a calling. Discover the various departments within PENSA UMaT where you can use your gifts to serve God and build His church.
          </p>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {ministries.map((min, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg border border-slate-300 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded bg-amber-50 border border-amber-200 flex items-center justify-center mb-3">
                  {min.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{min.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{min.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span
                  className="text-slate-500 text-[11px]"
                  dangerouslySetInnerHTML={{ __html: min.schedule }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Join a Ministry CTA */}
        <div className="mt-12 bg-white rounded-lg border border-slate-300 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Want to join a department this semester?
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              Indicate your preferred ministry department when filling the official membership census form. The committee heads will connect with you directly.
            </p>
          </div>
          <Link
            href="/register"
            className="px-5 py-2.5 rounded-md bg-[#0A192F] hover:bg-[#122A4E] text-white text-xs font-semibold shrink-0 flex items-center gap-2 transition-colors"
          >
            <span>Register &amp; Select Ministry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
