'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Calendar, MapPin } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ServiceCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [nextServiceTitle, setNextServiceTitle] = useState('Sunday Divine Service');
  const [venue, setVenue] = useState('UMaT Main Auditorium');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateNextService = () => {
      const now = new Date();
      const currentDay = now.getDay(); // 0 is Sunday, 3 is Wednesday, 5 is Friday
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      let target = new Date();
      let title = 'Sunday Divine Service';
      let loc = 'UMaT Main Auditorium';

      if (
        (currentDay === 0 && (currentHour < 7 || (currentHour === 7 && currentMinute < 30)))
      ) {
        target.setHours(7, 30, 0, 0);
        title = 'Sunday Divine Service (Session 1)';
        loc = 'UMaT Main Auditorium';
      } else if (
        currentDay < 3 ||
        (currentDay === 3 && (currentHour < 18 || (currentHour === 18 && currentMinute < 30)))
      ) {
        const daysUntilWednesday = (3 - currentDay + 7) % 7 || (currentDay === 3 ? 0 : 7);
        target.setDate(now.getDate() + daysUntilWednesday);
        target.setHours(18, 30, 0, 0);
        title = 'Midweek Word & Miracle Service';
        loc = 'Campus Fellowship Center';
      } else if (
        currentDay < 5 ||
        (currentDay === 5 && currentHour < 21)
      ) {
        const daysUntilFriday = (5 - currentDay + 7) % 7 || (currentDay === 5 ? 0 : 7);
        target.setDate(now.getDate() + daysUntilFriday);
        target.setHours(21, 0, 0, 0);
        title = 'Dunamis Holy Ghost Prayer Encounter';
        loc = 'Auditorium / Fellowship Center';
      } else {
        const daysUntilSunday = (7 - currentDay) % 7 || 7;
        target.setDate(now.getDate() + daysUntilSunday);
        target.setHours(7, 30, 0, 0);
        title = 'Sunday Divine Service';
        loc = 'UMaT Main Auditorium';
      }

      setNextServiceTitle(title);
      setVenue(loc);

      const diff = target.getTime() - now.getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateNextService();
    const interval = setInterval(calculateNextService, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return null;
  }

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="bg-[#00205B] border border-yellow-400/30 rounded-2xl p-5 shadow-2xl text-white max-w-4xl mx-auto backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
          </span>
          <span className="text-xs uppercase font-bold text-yellow-300 tracking-wider">
            Next Fellowship Gathering
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-white/80">
          <MapPin className="w-3.5 h-3.5 text-red-500" />
          <span>{venue}</span>
        </div>
      </div>

      <div className="py-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            {nextServiceTitle}
          </h3>
          <p className="text-xs text-white/70 mt-0.5">
            Count down with us to our next on-campus encounter
          </p>
        </div>

        {/* Counter digits */}
        <div className="flex items-center gap-2 sm:gap-3 text-center">
          <div className="bg-[#04112B] border border-[#0038A8]/60 rounded-xl px-3.5 py-2 min-w-[58px]">
            <span className="text-xl sm:text-2xl font-black text-yellow-400 font-mono">
              {pad(timeLeft.days)}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-white/70 block font-semibold mt-0.5">
              Days
            </span>
          </div>
          <span className="text-yellow-400 font-bold">:</span>

          <div className="bg-[#04112B] border border-[#0038A8]/60 rounded-xl px-3.5 py-2 min-w-[58px]">
            <span className="text-xl sm:text-2xl font-black text-white font-mono">
              {pad(timeLeft.hours)}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-white/70 block font-semibold mt-0.5">
              Hours
            </span>
          </div>
          <span className="text-yellow-400 font-bold">:</span>

          <div className="bg-[#04112B] border border-[#0038A8]/60 rounded-xl px-3.5 py-2 min-w-[58px]">
            <span className="text-xl sm:text-2xl font-black text-white font-mono">
              {pad(timeLeft.minutes)}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-white/70 block font-semibold mt-0.5">
              Mins
            </span>
          </div>
          <span className="text-yellow-400 font-bold">:</span>

          <div className="bg-[#04112B] border border-[#0038A8]/60 rounded-xl px-3.5 py-2 min-w-[58px]">
            <span className="text-xl sm:text-2xl font-black text-red-500 font-mono">
              {pad(timeLeft.seconds)}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-white/70 block font-semibold mt-0.5">
              Secs
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
