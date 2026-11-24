import React from 'react';
import Link from 'next/link';
import { Church, MapPin, Clock, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#071324] border-t border-slate-800 text-slate-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Fellowship Motto & Identity */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded bg-[#D97706] flex items-center justify-center font-bold text-white text-xs">
                P
              </div>
              <span className="text-white font-bold text-base tracking-tight">PENSA UMaT</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pentecost Students and Associates (PENSA), University of Mines and Technology, Tarkwa.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800/80">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-500 block">
                Motto
              </span>
              <span className="text-xs text-slate-300 italic">
                &ldquo;Christ in You, the Hope of Glory&rdquo; (Colossians 1:27)
              </span>
            </div>
          </div>

          {/* Column 2: Weekly Fellowship Times */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              Service Times
            </h4>
            <ul className="text-xs space-y-2 text-slate-300">
              <li>
                <span className="text-slate-400 block font-medium">Sunday Main Service</span>
                <span>7:30 AM &amp; 9:30 AM &bull; UMaT Auditorium</span>
              </li>
              <li>
                <span className="text-slate-400 block font-medium">Wednesday Mid-Week Service</span>
                <span>6:30 PM &bull; Campus Fellowship Center</span>
              </li>
              <li>
                <span className="text-slate-400 block font-medium">Family Unit (Cell) Meetings</span>
                <span>Sunday Afternoons &bull; Halls &amp; Hostels</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Secretariat & Campus Location */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              Campus Location
            </h4>
            <address className="not-italic text-xs text-slate-300 space-y-1">
              <p>PENSA Secretariat</p>
              <p>University of Mines and Technology</p>
              <p>P.O. Box 237, Tarkwa</p>
              <p>Western Region, Ghana</p>
            </address>
          </div>

          {/* Column 4: Quick Portals & Contact */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
              <Church className="w-3.5 h-3.5 text-amber-500" />
              Quick Links
            </h4>
            <ul className="text-xs space-y-2">
              <li>
                <Link href="/register" className="text-slate-300 hover:text-white transition-colors">
                  Member Registration
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-slate-300 hover:text-white transition-colors">
                  Executive Dashboard Login
                </Link>
              </li>
              <li className="pt-2 text-slate-400 text-[11px]">
                Technical support or registration issues? Contact your Hall Rep or Cell Leader.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>
            &copy; {new Date().getFullYear()} The Church of Pentecost &bull; PENSA UMaT Chapter. All rights reserved.
          </p>
          <p className="text-[11px]">
            Official Membership Directory &bull; Tarkwa District
          </p>
        </div>
      </div>
    </footer>
  );
}
