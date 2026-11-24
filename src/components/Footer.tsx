import React from 'react';
import Link from 'next/link';
import { Church, MapPin, Clock, Mail, Phone, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#071324] border-t border-slate-800 text-slate-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Column 1: Fellowship Motto & Identity */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/cop-logo.png"
                alt="The Church of Pentecost"
                className="w-11 h-11 object-contain drop-shadow brightness-105"
              />
              <img
                src="/images/pensa-umat-logo.png"
                alt="PENSA UMaT"
                className="w-12 h-12 object-contain drop-shadow brightness-105"
              />
              <div>
                <span className="text-white font-bold text-base tracking-tight block">PENSA UMaT</span>
                <span className="text-[11px] text-slate-400">The Church of Pentecost &bull; Tarkwa Area</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Pentecost Students and Associates (PENSA), University of Mines and Technology, Tarkwa. Dedicated to raising godly leaders and mining the treasures in people for Christ.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 max-w-sm flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-500 block">
                  Fellowship Motto
                </span>
                <span className="text-xs text-slate-300 italic">
                  &ldquo;Christ in You, the Hope of Glory&rdquo; (Colossians 1:27)
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <a
                href="https://www.facebook.com/share/15t4RRcwnn/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:text-white hover:bg-blue-600/30 text-xs font-semibold transition-all"
              >
                <span>Follow on Facebook</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>

          {/* Column 2: Service Times */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3.5 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              Service Times
            </h4>
            <ul className="text-xs space-y-2.5 text-slate-300">
              <li>
                <span className="text-slate-400 block font-medium">Sunday Divine Service</span>
                <span>07:30 AM &bull; 09:30 AM (Auditorium)</span>
              </li>
              <li>
                <span className="text-slate-400 block font-medium">Wednesday Midweek Service</span>
                <span>06:30 PM (Fellowship Center)</span>
              </li>
              <li>
                <span className="text-slate-400 block font-medium">Dunamis Friday Vigils</span>
                <span>09:00 PM (Bi-Weekly)</span>
              </li>
              <li>
                <span className="text-slate-400 block font-medium">Family Unit Cells</span>
                <span>Sundays 04:30 PM (Hostels)</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Portals & Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3.5">
              Fellowship Navigation
            </h4>
            <ul className="text-xs space-y-2 text-slate-300">
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  About PENSA UMaT
                </Link>
              </li>
              <li>
                <Link href="/ministries" className="hover:text-amber-400 transition-colors">
                  Ministries &amp; Committees
                </Link>
              </li>
              <li>
                <Link href="/family-units" className="hover:text-amber-400 transition-colors">
                  Family Units (Campus Cells)
                </Link>
              </li>
              <li>
                <Link href="/sermons" className="hover:text-amber-400 transition-colors">
                  Sermons &amp; Audio Vault
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-amber-400 transition-colors">
                  Campus Events Calendar
                </Link>
              </li>
              <li>
                <Link href="/giving" className="hover:text-amber-400 transition-colors">
                  Giving &amp; Welfare Dues
                </Link>
              </li>
              <li>
                <Link href="/leadership" className="hover:text-amber-400 transition-colors">
                  Secretariat &amp; Executive Council
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Secretariat Location & Admin */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3.5 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              Secretariat Location
            </h4>
            <address className="not-italic text-xs text-slate-300 space-y-1 mb-4">
              <p>PENSA Secretariat</p>
              <p>University of Mines &amp; Technology</p>
              <p>P.O. Box 237, Tarkwa</p>
              <p>Western Region, Ghana</p>
            </address>

            <div className="pt-2 border-t border-slate-800">
              <Link
                href="/login"
                className="text-xs inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium"
              >
                Executive Portal Login &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>
            &copy; {new Date().getFullYear()} The Church of Pentecost &bull; PENSA UMaT Chapter. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-500">
            Tarkwa Area Youth Ministry &bull; Official Digital Census &amp; Fellowship Hub
          </p>
        </div>
      </div>
    </footer>
  );
}
