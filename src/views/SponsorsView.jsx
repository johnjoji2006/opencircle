import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Coins,
  ShieldCheck,
  HeartHandshake,
  Server,
  Cpu,
  Share2,
  Users,
  Sparkles,
  ArrowRight,
  PlusCircle,
  Building2,
  CheckCircle2
} from 'lucide-react';

export default function SponsorsView() {
  const { sponsors, stats, setModalState } = useApp();
  const [calculatorSessions, setCalculatorSessions] = useState(30);

  const calculatedSponsorCost = calculatorSessions * 300;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-8 sm:space-y-12 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/80 px-3 py-1 rounded-full">
            Transparent Economic Model
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            The ₹0 Model & Impact Sponsors Wall
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            How OpenCircle delivers world-class mental wellness to students at absolute zero rupees — funded transparently by community and CSR partners.
          </p>
        </div>

        {/* Sponsor a Session Button */}
        <button
          onClick={() => setModalState({ type: 'sponsorModal', data: null })}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 self-start md:self-auto"
        >
          <HeartHandshake className="w-4 h-4 text-amber-300 flex-shrink-0" />
          <span>Sponsor a Session / Partner With Us</span>
        </button>
      </div>

      {/* Live Impact Counters at the top */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-5 sm:p-8 rounded-3xl bg-teal-900 text-white shadow-xl">
        <div className="text-center p-2.5 sm:p-3">
          <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-400 font-mono">
            {stats.totalVerifiedSessions.toLocaleString('en-IN')}+
          </span>
          <p className="text-xs sm:text-sm font-bold text-teal-100 mt-1">Sessions Logged</p>
          <p className="text-[10px] sm:text-[11px] text-teal-300">Audited on ledger</p>
        </div>

        <div className="text-center p-2.5 sm:p-3 border-l border-teal-800/80">
          <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-400 font-mono">
            {stats.activeCirclesCount}
          </span>
          <p className="text-xs sm:text-sm font-bold text-teal-100 mt-1">Campus Circles</p>
          <p className="text-[10px] sm:text-[11px] text-teal-300">Campuses across India</p>
        </div>

        <div className="text-center p-2.5 sm:p-3 border-t lg:border-t-0 lg:border-l border-teal-800/80">
          <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-400 font-mono">
            {stats.trainedListenersCount}+
          </span>
          <p className="text-xs sm:text-sm font-bold text-teal-100 mt-1">Peer Listeners</p>
          <p className="text-[10px] sm:text-[11px] text-teal-300">Certified via Academy</p>
        </div>

        <div className="text-center p-2.5 sm:p-3 border-t lg:border-t-0 border-l border-teal-800/80 bg-teal-950/60 rounded-2xl">
          <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-emerald-400 font-mono">
            ₹0
          </span>
          <p className="text-xs sm:text-sm font-bold text-white mt-1">Cost to Users</p>
          <p className="text-[10px] sm:text-[11px] text-teal-300">100% Free Forever</p>
        </div>
      </div>

      {/* Visual Breakdown of the ₹0 Startup Architecture */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/80 px-3 py-1 rounded-full">
            Under The Hood
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            The ₹0 Startup Lean Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Why traditional mental health apps cost ₹2,000/hr, and why OpenCircle never has to charge a dime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-2">
          
          {/* Pillar 1: Free Hosting */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">1. Free Hosting & Edge</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Static edge hosting (Vercel & Cloudflare free tier), zero heavy backend server maintenance, and client-side encryption. Infrastructure overhead: ₹0.
            </p>
            <div className="pt-2 text-[11px] text-teal-700 font-semibold">
              ✓ 99.9% uptime at ₹0 cost
            </div>
          </div>

          {/* Pillar 2: Client Edge AI */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">2. Free-Tier / Edge AI</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              CircleBot runs on browser heuristic NLP with zero API key dependencies, paired with free-tier Gemini API endpoints. Token cost to users: ₹0.
            </p>
            <div className="pt-2 text-[11px] text-amber-600 font-semibold">
              ✓ Zero expensive GPU bills
            </div>
          </div>

          {/* Pillar 3: Organic Campus Loop */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">3. Organic Campus Loop</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Zero paid marketing. Growth happens through student WhatsApp circles, campus noticeboards, tea stall word-of-mouth, and club partnerships.
            </p>
            <div className="pt-2 text-[11px] text-teal-700 font-semibold">
              ✓ Customer Acquisition Cost = ₹0
            </div>
          </div>

          {/* Pillar 4: Ethical Sponsor Pool */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">4. Ethical Sponsor Pool</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Local cafes, student-first brands, and corporate CSR funds pool money into session sponsorships, directly funding counsellor stipends.
            </p>
            <div className="pt-2 text-[11px] text-amber-600 font-semibold">
              ✓ 100% disbursed to counsellors
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Sponsorship Impact Calculator */}
      <div className="p-5 sm:p-8 rounded-3xl bg-white border border-teal-200/80 shadow-soft-lg space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
              Interactive Sponsor Calculator
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-2">
              See the exact impact of your sponsorship
            </h3>
            <p className="text-xs text-slate-500">
              Adjust the slider to see how many students you can support at campus.
            </p>
          </div>
          <button
            onClick={() => setModalState({ type: 'sponsorModal', data: null })}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm transition-all text-center"
          >
            Pledge This Tier →
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-bold text-slate-700 gap-1">
            <span>Sponsor Quantity: <strong className="text-teal-800 text-sm">{calculatorSessions} Sessions</strong></span>
            <span>Estimated Pledge: <strong className="text-teal-800 font-mono text-sm">₹{calculatedSponsorCost.toLocaleString('en-IN')}</strong></span>
          </div>
          <input
            type="range"
            min="10"
            max="150"
            step="5"
            value={calculatorSessions}
            onChange={(e) => setCalculatorSessions(parseInt(e.target.value, 10))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-700"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
            <span>10 sessions (₹3k)</span>
            <span>50 (₹15k)</span>
            <span>100 (₹30k)</span>
            <span>150 (₹45k)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-3">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-teal-50 border border-teal-200/80 text-center">
            <span className="text-xl sm:text-2xl font-extrabold text-teal-900 font-mono">{calculatorSessions}</span>
            <p className="text-xs font-bold text-teal-800 mt-0.5">Students Supported</p>
            <p className="text-[10px] text-slate-500">1-on-1 sessions</p>
          </div>
          <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-center">
            <span className="text-xl sm:text-2xl font-extrabold text-amber-900 font-mono">₹{calculatedSponsorCost.toLocaleString('en-IN')}</span>
            <p className="text-xs font-bold text-amber-800 mt-0.5">Directly to Counsellors</p>
            <p className="text-[10px] text-slate-500">Zero administrative cut</p>
          </div>
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">100%</span>
            <p className="text-xs font-bold text-slate-700 mt-0.5">Brand Transparency</p>
            <p className="text-[10px] text-slate-500">Logo featured across circles</p>
          </div>
        </div>
      </div>

      {/* Sponsor Showcase Grid */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            Community Impact Sponsors Wall
          </h3>
          <p className="text-xs text-slate-500">
            Ethical brands and campus institutions powering free sessions for students.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-teal-400 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    {sponsor.tier}
                  </span>
                  <span className="text-xs font-mono font-bold text-teal-800">
                    {sponsor.pledgeAmount}
                  </span>
                </div>

                <div className="mt-4 p-3 rounded-2xl bg-slate-900 text-white font-mono font-bold text-sm tracking-wider text-center">
                  {sponsor.logoText}
                </div>

                <h4 className="text-base font-bold text-slate-900 mt-3">{sponsor.name}</h4>
                <p className="text-xs text-slate-500 italic mt-1 leading-snug">
                  "{sponsor.tagline}"
                </p>

                <div className="mt-3 p-2.5 rounded-xl bg-teal-50/60 border border-teal-100 text-[11px] text-slate-600">
                  🎁 <strong>Perk:</strong> {sponsor.perk}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-semibold text-teal-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  {sponsor.sessionsFunded} sessions funded
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
