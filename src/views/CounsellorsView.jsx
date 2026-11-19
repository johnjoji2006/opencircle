import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  ShieldCheck,
  Star,
  Clock,
  Coins,
  CheckCircle2,
  HeartHandshake,
  PlusCircle,
  FileText,
  UserCheck,
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';

export default function CounsellorsView() {
  const {
    counsellorSubTab,
    setCounsellorSubTab,
    counsellors,
    logCompletedSession,
    setModalState,
    bookedSessions,
    userAlias
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredCounsellors = counsellors.filter(c => {
    if (categoryFilter === 'all') return true;
    return c.specialtyCategory === categoryFilter || c.specialty.toLowerCase().includes(categoryFilter);
  });

  const PAYOUT_PER_SESSION = 300; // ₹300 per verified session funded by ethical sponsors

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 animate-fade-in">
      
      {/* Top Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/80 px-3 py-1 rounded-full">
            ₹0 Mental Health Care
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            Verified Counsellors & Impact Portal
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Every session is 100% free for students, strictly anonymous, and transparently rewarded via OpenCircle's ethical sponsor pool.
          </p>
        </div>

        {/* Sub-tab Switcher (Exact requirement) */}
        <div className="flex p-1 bg-slate-200/80 rounded-2xl w-full sm:w-auto self-start md:self-auto">
          <button
            onClick={() => setCounsellorSubTab('book')}
            className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              counsellorSubTab === 'book'
                ? 'bg-white text-teal-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4 text-teal-700" />
            <span>Book a Free Session</span>
          </button>

          <button
            onClick={() => setCounsellorSubTab('tracker')}
            className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              counsellorSubTab === 'tracker'
                ? 'bg-white text-teal-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Coins className="w-4 h-4 text-amber-500" />
            <span>Join & Payout Tracker</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          TAB A: BOOK A FREE SESSION
         ======================================================== */}
      {counsellorSubTab === 'book' && (
        <div className="space-y-6">
          
          {/* Active Booking Banner / Notification */}
          {bookedSessions.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-900 flex items-center justify-center font-bold">
                  {bookedSessions.length}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    You have {bookedSessions.length} active upcoming session(s)
                  </p>
                  <p className="text-xs text-slate-600">
                    Next up: {bookedSessions[0].counsellorName} ({bookedSessions[0].slot})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalState({ type: 'mySessions', data: null })}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
              >
                View My Sessions Drawer →
              </button>
            </div>
          )}

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mr-1">
              <Filter className="w-3.5 h-3.5" /> Filter by:
            </span>
            {[
              { id: 'all', label: 'All Specialties' },
              { id: 'academic', label: 'Academic Stress' },
              { id: 'homesick', label: 'Homesickness & Transition' },
              { id: 'anxiety', label: 'Anxiety & Burnout' },
              { id: 'listening', label: 'General Listening' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setCategoryFilter(f.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  categoryFilter === f.id
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Counsellor Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCounsellors.map((counsellor) => (
              <div
                key={counsellor.id}
                className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-teal-400 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  
                  {/* Top info row */}
                  <div className="flex items-start gap-4">
                    <img
                      src={counsellor.avatar}
                      alt={counsellor.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-600/30 shadow-sm flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-lg font-bold text-slate-900 truncate">
                          {counsellor.name}
                        </h3>
                        <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60 flex-shrink-0">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>{counsellor.rating}</span>
                        </span>
                      </div>
                      
                      <p className="text-xs font-semibold text-teal-800 mt-0.5">
                        {counsellor.title}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {counsellor.qualification}
                      </p>
                    </div>
                  </div>

                  {/* Specialty badge */}
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-teal-900 bg-teal-50 px-2.5 py-1 rounded-xl border border-teal-200">
                      🎯 {counsellor.specialty}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-xl">
                      🗣️ {counsellor.languages?.join(', ') || 'English, Hindi'}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-2">
                    {counsellor.bio}
                  </p>

                </div>

                {/* Footer details & Action */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>Next: <strong className="text-slate-800">{counsellor.nextAvailableSlot}</strong></span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span><strong className="text-slate-900">{counsellor.verifiedSessions}</strong> sessions verified</span>
                    </div>
                  </div>

                  {/* Book button */}
                  <button
                    onClick={() => setModalState({ type: 'bookCounsellor', data: counsellor })}
                    className="w-full py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>Book Free Session (₹0 Cost)</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* ========================================================
          TAB B: COUNSELLOR RECRUITMENT & PAYOUT TRACKER
         ======================================================== */}
      {counsellorSubTab === 'tracker' && (
        <div className="space-y-8">
          
          {/* Explanation Banner (Exact requirement) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-teal-900 text-white shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-teal-800 px-3 py-1 rounded-full border border-teal-700">
                  OpenCircle Impact Contract
                </span>
                <h3 className="text-2xl font-extrabold tracking-tight">
                  Transparent Session Tracking & Direct Payout Distribution
                </h3>
                <p className="text-sm text-teal-100 leading-relaxed">
                  Start as a volunteer under our OpenCircle Impact Contract. Every session you take is transparently tracked — as sponsor funds grow, payouts are distributed directly based on your completed sessions.
                </p>
                <div className="flex flex-wrap gap-4 pt-1 text-xs text-teal-200">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Fixed rate: ₹{PAYOUT_PER_SESSION} / verified session</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Weekly automated disbursement</span>
                  </div>
                </div>
              </div>

              {/* Working Application Form Trigger */}
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <button
                  onClick={() => setModalState({ type: 'applyCounsellor', data: null })}
                  className="px-6 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Apply as a Counsellor</span>
                </button>
              </div>
            </div>
          </div>

          {/* Impact & Payout Tracker Table (Exact requirement) */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Live Counsellor Payout & Session Ledger
                </h3>
                <p className="text-xs text-slate-500">
                  Live demo ready for pitch judges: click "Log Completed Session +1" to observe instant ledger update!
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200">
                  Sponsor Pool Rate: ₹{PAYOUT_PER_SESSION} / session
                </span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3.5 px-4 sm:px-6">Counsellor & Specialty</th>
                    <th className="py-3.5 px-4">Volunteer Tier</th>
                    <th className="py-3.5 px-4 text-center">Verified Sessions</th>
                    <th className="py-3.5 px-4">Estimated Sponsor Payout</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Live Demo Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {counsellors.map((c) => {
                    const totalPayout = c.verifiedSessions * PAYOUT_PER_SESSION;

                    return (
                      <tr key={c.id} className="hover:bg-teal-50/30 transition-colors">
                        
                        {/* Counsellor */}
                        <td className="py-4 px-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={c.avatar}
                              alt={c.name}
                              className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                            />
                            <div>
                              <p className="font-bold text-slate-900">{c.name}</p>
                              <p className="text-[11px] text-slate-500">{c.specialty}</p>
                            </div>
                          </div>
                        </td>

                        {/* Tier */}
                        <td className="py-4 px-4">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-800 border border-teal-200/60 inline-block">
                            {c.tier || 'Impact Fellow'}
                          </span>
                        </td>

                        {/* Verified Sessions */}
                        <td className="py-4 px-4 text-center">
                          <span className="font-mono font-bold text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
                            {c.verifiedSessions}
                          </span>
                        </td>

                        {/* Estimated Payout Share */}
                        <td className="py-4 px-4">
                          <span className="font-mono font-bold text-sm text-emerald-700">
                            ₹{totalPayout.toLocaleString('en-IN')}
                          </span>
                          <span className="block text-[10px] text-slate-400">
                            @ ₹{PAYOUT_PER_SESSION}/session
                          </span>
                        </td>

                        {/* Live Demo Button (Exact requirement) */}
                        <td className="py-4 px-4 sm:px-6 text-right">
                          <button
                            onClick={() => logCompletedSession(c.id)}
                            className="px-3.5 py-2 rounded-xl bg-teal-100 hover:bg-teal-700 hover:text-white text-teal-900 text-xs font-bold transition-all border border-teal-300/80 shadow-xs active:scale-95 flex items-center gap-1.5 ml-auto"
                            title="Simulate verifying 1 completed student session"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                            <span>Log Completed Session +1</span>
                          </button>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                Ledger entries audited for zero-student billing compliance.
              </span>
              <span>All payouts underwritten by verified OpenCircle CSR Sponsors.</span>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
