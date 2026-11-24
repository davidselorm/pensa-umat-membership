import React from 'react';
import Link from 'next/link';
import { Church, MapPin, Clock, Mail, Phone, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#00205B] border-t border-[#0038A8] text-white/80 text-sm mt-auto">
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
                src="/images/pensaumatofficial.jpg"
                alt="Official PENSA UMaT Logo"
                className="w-12 h-12 object-contain drop-shadow brightness-105 rounded-full"
              />
              <div>
                <span className="text-white font-bold text-base tracking-tight block">PENSA UMaT</span>
                <span className="text-[11px] text-yellow-300">The Church of Pentecost &bull; Tarkwa Area</span>
              </div>
            </div>
            <p className="text-xs text-white/80 leading-relaxed max-w-sm">
              Pentecost Students and Associates (PENSA), University of Mines and Technology, Tarkwa. Dedicated to raising godly leaders and mining the treasures in people for Christ.
            </p>
            <div className="mt-4 pt-3 border-t border-[#0038A8] max-w-sm flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FACC15] block">
                  Fellowship Motto
                </span>
                <span className="text-xs text-white italic">
                  &ldquo;Christ in You, the Hope of Glory&rdquo; (Colossians 1:27)
                </span>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a
                href="https://www.facebook.com/share/15t4RRcwnn/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0038A8] border border-blue-400/40 text-white hover:text-[#FACC15] text-xs font-semibold transition-all shadow-sm"
              >
                <span>Facebook</span>
                <span>&rarr;</span>
              </a>
              <a
                href="https://www.youtube.com/@Pensaumat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#DC2626] border border-red-500 text-white hover:bg-red-700 text-xs font-semibold transition-all shadow-sm"
              >
                <span>YouTube (@Pensaumat)</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>

          {/* Column 2: Service Times */}
          <div>
            <h4 className="text-[#FACC15] font-bold text-xs uppercase tracking-wider mb-3.5 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#FACC15]" />
              Service Times
            </h4>
            <ul className="text-xs space-y-2.5 text-white/90">
              <li>
                <span className="text-yellow-300 block font-semibold">Sunday Divine Service</span>
                <span>07:30 AM &bull; 09:30 AM (Auditorium)</span>
              </li>
              <li>
                <span className="text-yellow-300 block font-semibold">Wednesday Midweek Service</span>
                <span>06:30 PM (Fellowship Center)</span>
              </li>
              <li>
                <span className="text-yellow-300 block font-semibold">Dunamis Friday Vigils</span>
                <span>09:00 PM (Bi-Weekly)</span>
              </li>
              <li>
                <span className="text-yellow-300 block font-semibold">Family Unit Cells</span>
                <span>Sundays 04:30 PM (Hostels)</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Portals & Quick Links */}
          <div>
            <h4 className="text-[#FACC15] font-bold text-xs uppercase tracking-wider mb-3.5">
              Fellowship Navigation
            </h4>
            <ul className="text-xs space-y-2 text-white/90">
              <li>
                <Link href="/about" className="hover:text-[#FACC15] transition-colors">
                  About PENSA UMaT
                </Link>
              </li>
              <li>
                <Link href="/ministries" className="hover:text-[#FACC15] transition-colors">
                  Ministries &amp; Departments
                </Link>
              </li>
              <li>
                <Link href="/family-units" className="hover:text-[#FACC15] transition-colors">
                  Family Units (Campus Cells)
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-yellow-300 transition-colors font-bold text-[#FACC15]">
                  2025/2026 Membership Census &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Secretariat Location & Admin */}
          <div>
            <h4 className="text-[#FACC15] font-bold text-xs uppercase tracking-wider mb-3.5 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#FACC15]" />
              Secretariat Location
            </h4>
            <address className="not-italic text-xs text-white/90 space-y-1 mb-4">
              <p>PENSA Secretariat</p>
              <p>University of Mines &amp; Technology</p>
              <p>P.O. Box 237, Tarkwa</p>
              <p>Western Region, Ghana</p>
            </address>

            <div className="pt-2 border-t border-[#0038A8]">
              <Link
                href="/login"
                className="text-xs inline-flex items-center gap-1.5 text-[#FACC15] hover:text-white font-semibold"
              >
                Executive Portal Login &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#0038A8] flex flex-col sm:flex-row items-center justify-between text-xs text-white/70 gap-3">
          <p>
            &copy; {new Date().getFullYear()} The Church of Pentecost &bull; PENSA UMaT Chapter. All rights reserved.
          </p>
          <p className="text-[11px] text-white/60">
            Tarkwa Area Youth Ministry &bull; Official Digital Census &amp; Fellowship Hub
          </p>
        </div>
      </div>
    </footer>
  );
}
