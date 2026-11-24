import React from 'react';
import Link from 'next/link';
import {
  Heart,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Users,
  Globe2,
  Receipt,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export default function GivingPage() {
  const funds = [
    {
      name: 'Semester Fellowship Dues',
      amount: 'GH₵ 20.00 / semester',
      icon: <Users className="w-5 h-5 text-amber-500" />,
      description: 'Mandatory student dues supporting campus welfare, freshman orientation packs, family unit subsidies, and administrative supplies.',
      refExample: 'Dues - [Your Full Name]',
    },
    {
      name: 'Tithes & Sunday Offerings',
      amount: 'Scriptural (10% & Freewill)',
      icon: <Receipt className="w-5 h-5 text-amber-500" />,
      description: 'Honoring the Lord with the first fruits of our increase, supporting weekly Sunday services at the UMaT Auditorium and church upkeep.',
      refExample: 'Tithe - [Your Name] / Offering',
    },
    {
      name: 'Campus Evangelism & Rural Missions',
      amount: 'Voluntary Donation',
      icon: <Globe2 className="w-5 h-5 text-amber-500" />,
      description: 'Funding evangelism tracts, community medical supplies, outreach transportation across Tarkwa and rural mining settlements in Western Region.',
      refExample: 'Missions - [Your Name]',
    },
    {
      name: 'Student Emergency Welfare Fund',
      amount: 'Voluntary Donation',
      icon: <Heart className="w-5 h-5 text-amber-500" />,
      description: 'Discreet, compassionate financial support for members facing emergency health bills, hunger, or semester registration crises.',
      refExample: 'Welfare - [Your Name]',
    },
  ];

  return (
    <div className="flex-1 bg-slate-50 pb-20">
      {/* Header Banner */}
      <section className="bg-[#0A192F] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3.5 mb-4">
            <img
              src="/images/cop-logo.png"
              alt="The Church of Pentecost"
              className="w-12 h-12 object-contain drop-shadow brightness-105"
            />
            <div className="h-7 w-px bg-slate-700" />
            <img
              src="/images/pensa-umat-logo.png"
              alt="PENSA UMaT Chapter"
              className="w-14 h-14 object-contain drop-shadow brightness-105"
            />
          </div>

          <span className="text-xs uppercase tracking-wider font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
            Kingdom Stewardship &bull; Welfare
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-3 text-white">
            Giving &amp; Fellowship Support
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            &ldquo;Honor the Lord with your substance and with the firstfruits of all your increase.&rdquo; (Proverbs 3:9). Thank you for supporting God&apos;s work on the UMaT campus.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-10">
        {/* Mobile Money Payment Guide Card */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-md p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-2">
            <Smartphone className="w-5 h-5 text-amber-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Official Mobile Money Channels
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
            How to Give via MTN MoMo / Telecel Cash
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed mb-6">
            All fellowship contributions, semester dues, and freewill offerings are received securely via our verified PENSA Secretariat merchant accounts.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 border border-slate-200 rounded-lg p-5 text-xs text-slate-800">
            <div>
              <span className="text-slate-500 block text-[11px] font-semibold uppercase">
                MTN Mobile Money
              </span>
              <p className="text-base font-mono font-bold text-slate-950 mt-0.5">054 123 4567</p>
              <p className="text-slate-600 mt-1">
                Account Name: <strong>PENSA UMAT SECRETARIAT</strong>
              </p>
            </div>

            <div>
              <span className="text-slate-500 block text-[11px] font-semibold uppercase">
                Telecel Cash
              </span>
              <p className="text-base font-mono font-bold text-slate-950 mt-0.5">020 987 6543</p>
              <p className="text-slate-600 mt-1">
                Account Name: <strong>PENSA UMAT CHAPTER</strong>
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-lg bg-amber-50/60 border border-amber-200/60 text-xs text-slate-700 space-y-1">
            <span className="font-bold text-amber-900 block">
              Important: Use reference format:
            </span>
            <p className="font-mono text-[11px] text-slate-900">
              [Purpose] - [Full Name] &bull; Example: <strong>Dues - Kwadwo Boateng</strong> or <strong>Tithe - Abena Prempeh</strong>
            </p>
          </div>
        </div>

        {/* Funds Breakdown */}
        <div>
          <div className="mb-6">
            <span className="text-xs uppercase font-bold text-amber-600 tracking-wider">
              Allocation of Funds
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">
              Fellowship Contribution Channels
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {funds.map((f, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center mb-3">
                    {f.icon}
                  </div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h4 className="text-base font-bold text-slate-900">{f.name}</h4>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {f.amount}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{f.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
                  Ref: <span className="text-slate-800 font-semibold">{f.refExample}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Integrity & Audit Statement */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Accountability &amp; Financial Governance
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Every cedi contributed to PENSA UMaT is audited at the end of each semester by the Area Patronage and Fellowship Audit Committee. Periodic financial statements are read during general fellowship gatherings for complete transparency before God and the church.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
