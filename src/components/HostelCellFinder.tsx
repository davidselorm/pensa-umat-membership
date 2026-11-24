'use client';

import React, { useState } from 'react';
import { Building2, Search, MapPin, Clock, Users, MessageSquare, CheckCircle2 } from 'lucide-react';
import { SUGGESTED_HOSTELS } from '@/lib/types';

interface CellInfo {
  unitName: string;
  coordinator: string;
  meetingTime: string;
  meetingVenue: string;
  description: string;
}

const CELL_MAPPING: Record<string, CellInfo> = {
  'KT Hall': {
    unitName: 'KT Hall Family Unit',
    coordinator: 'PENSA Secretariat & KT Hall Shepherds',
    meetingTime: 'Sundays &bull; 4:30 PM',
    meetingVenue: 'KT Hall Common Room / Quadrangle',
    description: 'Active residential fellowship covering all blocks in KT Hall. Academic accountability, prayer walks, and mutual encouragement.',
  },
  'Chamber of Mines Hall': {
    unitName: 'Chamber & Gold Refinery Cell',
    coordinator: 'PENSA Secretariat & Chamber Shepherds',
    meetingTime: 'Sundays &bull; 5:00 PM',
    meetingVenue: 'Chamber Forecourt / Study Lounge',
    description: 'Serving engineering and science students residing in Chamber of Mines Hall with fellowship, study support, and prayer.',
  },
  'Gold Refinery Hall': {
    unitName: 'Chamber & Gold Refinery Cell',
    coordinator: 'PENSA Secretariat & Gold Refinery Shepherds',
    meetingTime: 'Sundays &bull; 5:00 PM',
    meetingVenue: 'Chamber Forecourt / Study Lounge',
    description: 'Serving engineering and science students residing in Gold Refinery Hall with fellowship and mutual encouragement.',
  },
  'University Hall': {
    unitName: 'Chamber & Gold Refinery Cell',
    coordinator: 'PENSA Secretariat & University Hall Shepherds',
    meetingTime: 'Sundays &bull; 5:00 PM',
    meetingVenue: 'Chamber Forecourt / Study Lounge',
    description: 'Campus hall coverage ensuring students in University Hall are supported spiritually and academically.',
  },
};

const DEFAULT_OFF_CAMPUS: CellInfo = {
  unitName: 'Tarkwa Banso & Off-Campus Cell',
  coordinator: 'PENSA Secretariat & Off-Campus Shepherds',
  meetingTime: 'Sundays &bull; 4:00 PM',
  meetingVenue: 'Grace Hostel Lounge &bull; Tarkwa Banso',
  description: 'Dedicated off-campus pastoral cell covering Grace, Executive, Jerusalem, Railway Quarters, New Town, and Aboso hostels.',
};

export default function HostelCellFinder() {
  const [selectedHostel, setSelectedHostel] = useState('KT Hall');

  const cell = CELL_MAPPING[selectedHostel] || DEFAULT_OFF_CAMPUS;

  return (
    <div className="bg-white rounded-2xl border border-[#0038A8]/20 shadow-md overflow-hidden max-w-4xl mx-auto">
      <div className="bg-[#00205B] text-white p-6 sm:p-8 border-b border-[#0038A8]">
        <span className="text-xs uppercase font-bold text-yellow-300 tracking-wider">
          Campus Cell Locator
        </span>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
          Find Your Assigned Family Unit
        </h2>
        <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
          Select your hall of residence or off-campus hostel to view your designated cell meeting venue and weekly schedule.
        </p>

        {/* Hostel Selector */}
        <div className="mt-5">
          <label className="block text-xs font-semibold text-white/90 mb-1.5">
            Select Your Hall or Hostel:
          </label>
          <div className="relative max-w-md">
            <select
              value={selectedHostel}
              onChange={(e) => setSelectedHostel(e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-[#0038A8] bg-[#04112B] text-sm text-white font-medium outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
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
      <div className="p-6 sm:p-8 bg-white border-t border-neutral-100">
        <div className="bg-white rounded-xl border border-[#0038A8]/20 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-200">
            <div>
              <span className="text-[11px] font-bold uppercase text-red-600 tracking-wide block">
                Assigned Fellowship Cell
              </span>
              <h3 className="text-lg font-bold text-[#00205B] mt-0.5">
                {cell.unitName}
              </h3>
            </div>
            <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-yellow-400/10 text-[#00205B] border border-yellow-400/40 text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-red-600" />
              <span>Covers {selectedHostel}</span>
            </span>
          </div>

          <p className="text-xs text-neutral-600 my-4 leading-relaxed">
            {cell.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-neutral-100 text-xs text-neutral-700">
            <div>
              <span className="text-neutral-400 block text-[11px] font-medium">Meeting Time</span>
              <span className="font-semibold text-[#00205B]" dangerouslySetInnerHTML={{ __html: cell.meetingTime }} />
            </div>
            <div>
              <span className="text-neutral-400 block text-[11px] font-medium">Meeting Venue</span>
              <span className="font-semibold text-[#00205B]" dangerouslySetInnerHTML={{ __html: cell.meetingVenue }} />
            </div>
            <div>
              <span className="text-neutral-400 block text-[11px] font-medium">Oversight</span>
              <span className="font-semibold text-[#00205B]">{cell.coordinator}</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="/register"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#FACC15] hover:bg-yellow-300 text-[#00205B] text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-md border border-yellow-400"
            >
              <CheckCircle2 className="w-4 h-4 text-red-600" />
              <span>Register for Cell Placement in Census</span>
            </a>

            <a
              href="mailto:secretariat@pensa-umat.org"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-neutral-400" />
              <span>Contact Fellowship Secretariat</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
