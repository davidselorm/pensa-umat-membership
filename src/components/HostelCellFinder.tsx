'use client';

import React, { useState } from 'react';
import { Building2, Search, MapPin, Clock, Users, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';
import { SUGGESTED_HOSTELS } from '@/lib/types';

interface CellInfo {
  unitName: string;
  leaderName: string;
  leaderPhone: string;
  meetingTime: string;
  meetingVenue: string;
  description: string;
}

const CELL_MAPPING: Record<string, CellInfo> = {
  'KT Hall': {
    unitName: 'KT Hall Family Unit',
    leaderName: 'Eld. Emmanuel Ofori',
    leaderPhone: '+233541234567',
    meetingTime: 'Sundays &bull; 4:30 PM',
    meetingVenue: 'KT Hall Common Room / Quadrangle',
    description: 'Active residential cell covering all rooms in KT Hall. Regular prayer walks, academic accountability, and pastoral care.',
  },
  'Chamber of Mines Hall': {
    unitName: 'Chamber & Gold Refinery Cell',
    leaderName: 'Dcn. Samuel Mensah',
    leaderPhone: '+233249876543',
    meetingTime: 'Sundays &bull; 5:00 PM',
    meetingVenue: 'Chamber Forecourt / Study Lounge',
    description: 'Serving engineering and science students residing in Chamber of Mines Hall with fellowship and brotherhood.',
  },
  'Gold Refinery Hall': {
    unitName: 'Chamber & Gold Refinery Cell',
    leaderName: 'Dcn. Samuel Mensah',
    leaderPhone: '+233249876543',
    meetingTime: 'Sundays &bull; 5:00 PM',
    meetingVenue: 'Chamber Forecourt / Study Lounge',
    description: 'Serving engineering and science students residing in Gold Refinery Hall with fellowship and brotherhood.',
  },
  'University Hall': {
    unitName: 'Chamber & Gold Refinery Cell',
    leaderName: 'Dcn. Samuel Mensah',
    leaderPhone: '+233249876543',
    meetingTime: 'Sundays &bull; 5:00 PM',
    meetingVenue: 'Chamber Forecourt / Study Lounge',
    description: 'Campus hall coverage ensuring students in University Hall are supported spiritually.',
  },
};

const DEFAULT_OFF_CAMPUS: CellInfo = {
  unitName: 'Tarkwa Banso & Off-Campus Cell',
  leaderName: 'Sis. Priscilla Addo',
  leaderPhone: '+233501122334',
  meetingTime: 'Sundays &bull; 4:00 PM',
  meetingVenue: 'Grace Hostel Lounge &bull; Tarkwa Banso',
  description: 'Dedicated off-campus pastoral cell covering Grace, Executive, Jerusalem, Railway Quarters, New Town, and Aboso hostels.',
};

export default function HostelCellFinder() {
  const [selectedHostel, setSelectedHostel] = useState('KT Hall');

  const cell = CELL_MAPPING[selectedHostel] || DEFAULT_OFF_CAMPUS;

  const getCleanPhone = (phone: string) => phone.replace(/[^0-9]/g, '');

  return (
    <div className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden max-w-4xl mx-auto">
      <div className="bg-[#0A192F] text-white p-6 sm:p-8">
        <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
          Campus Cell Locator
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
          Find Your Assigned Family Unit
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
          Select your hall of residence or off-campus hostel to instantly connect with your cell leader and meeting venue.
        </p>

        {/* Hostel Selector */}
        <div className="mt-5">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Select Your Hall or Hostel:
          </label>
          <div className="relative max-w-md">
            <select
              value={selectedHostel}
              onChange={(e) => setSelectedHostel(e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 rounded-lg border border-slate-700 bg-slate-900 text-sm text-white font-medium outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            >
              {SUGGESTED_HOSTELS.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Result Card */}
      <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-200">
        <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
            <div>
              <span className="text-[11px] font-bold uppercase text-amber-600 tracking-wide block">
                Assigned Fellowship Cell
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                {cell.unitName}
              </h3>
            </div>
            <span className="self-start sm:self-auto px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Covers {selectedHostel}</span>
            </span>
          </div>

          <p className="text-xs text-slate-600 my-4 leading-relaxed">
            {cell.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs text-slate-700">
            <div>
              <span className="text-slate-400 block text-[11px] font-medium">Meeting Time</span>
              <span className="font-semibold text-slate-900" dangerouslySetInnerHTML={{ __html: cell.meetingTime }} />
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] font-medium">Meeting Venue</span>
              <span className="font-semibold text-slate-900" dangerouslySetInnerHTML={{ __html: cell.meetingVenue }} />
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] font-medium">Cell Leader</span>
              <span className="font-semibold text-slate-900">{cell.leaderName}</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={`https://wa.me/${getCleanPhone(cell.leaderPhone)}?text=${encodeURIComponent(
                `Hi ${cell.leaderName}, I reside at ${selectedHostel} on campus and would like to connect with our ${cell.unitName}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect on WhatsApp</span>
            </a>

            <a
              href={`tel:${cell.leaderPhone}`}
              className="w-full sm:w-auto px-5 py-2.5 rounded-md border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>Call Cell Leader ({cell.leaderPhone})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
