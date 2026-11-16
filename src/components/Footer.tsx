import React from 'react';
import Link from 'next/link';
import { Heart, MapPin, Church } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0c223e] border-t border-[#1D4978] text-slate-300 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center font-bold text-slate-950">
                P
              </div>
              <span className="text-white font-bold text-lg">PENSA UMaT</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Pentecost Students and Associates, University of Mines and Technology, Tarkwa. Dedicated to raising godly leaders and mining the treasures in people for Christ.
            </p>
          </div>

          {/* Column 2: Meeting Times & Venue */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
              <Church className="w-4 h-4 text-amber-400" />
              Fellowship & Meetings
            </h4>
            <ul className="text-sm space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Sunday Divine Service:</strong> 7:30 AM & 9:30 AM</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Mid-Week Service:</strong> Wednesday 6:30 PM</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Home Cell / Family Units:</strong> Sunday Afternoons</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Secretariat & Campus Location */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              Secretariat Location
            </h4>
            <p className="text-sm text-slate-300 mb-2">
              University of Mines and Technology (UMaT), Main Campus, Tarkwa, Western Region, Ghana.
            </p>
            <div className="pt-2">
              <Link
                href="/login"
                className="text-xs inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 hover:underline"
              >
                Executive Portal Login &rarr;
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>&copy; {new Date().getFullYear()} PENSA UMaT Secretariat. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-400 fill-current" /> for the body of Christ at UMaT
          </p>
        </div>
      </div>
    </footer>
  );
}
