import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Calendar,
  Clock,
  ShieldCheck,
  Video,
  MessageSquare,
  Phone,
  Trash2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function MySessionsDrawer() {
  const {
    modalState,
    setModalState,
    bookedSessions,
    setBookedSessions,
    setActiveTab,
    showToast
  } = useApp();

  const isOpen = modalState.type === 'mySessions';

  if (!isOpen) return null;

  const handleCancel = (bookingId) => {
    setBookedSessions(prev => prev.filter(b => b.id !== bookingId));
    showToast('Session Cancelled', 'info', 'Slot has been freed for other students.');
  };

  const handleLaunchRoom = (session) => {
    setModalState({ type: 'mockRoom', data: session });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF9F6] w-full max-w-md h-full shadow-2xl border-l border-slate-200 flex flex-col p-6 overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-teal-100 text-teal-800 rounded-xl">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">My Upcoming Sessions</h3>
              <p className="text-xs text-slate-500">100% Free • Sponsored by Community</p>
            </div>
          </div>
          <button
            onClick={() => setModalState({ type: null, data: null })}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 py-4 space-y-4">
          {bookedSessions.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <Calendar className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-700">No Sessions Booked Yet</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Need to talk? Our verified counsellors are available today at ₹0 cost.
              </p>
              <button
                onClick={() => {
                  setModalState({ type: null, data: null });
                  setActiveTab('counsellors');
                }}
                className="mt-2 px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                Browse Free Counsellors
              </button>
            </div>
          ) : (
            bookedSessions.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3 hover:border-teal-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
                      {item.status || 'Confirmed'}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{item.counsellorName}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>{item.slot}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleCancel(item.id)}
                    title="Cancel Booking"
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs py-2 px-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-600 font-medium">Mode: {item.mode}</span>
                  <span className="font-mono text-teal-800 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-teal-600" />
                    {item.alias || 'Protected'}
                  </span>
                </div>

                {item.note && (
                  <p className="text-[11px] text-slate-600 italic bg-amber-50/50 p-2 rounded-lg border border-amber-200/40">
                    "{item.note}"
                  </p>
                )}

                {/* Launch Mock Session Room Button */}
                <button
                  onClick={() => handleLaunchRoom(item)}
                  className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Launch Session Room (Demo)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-200 text-xs text-slate-500">
          <p className="leading-snug">
            All sessions take place through our browser-based encrypted sandbox. No app download or personal number required.
          </p>
        </div>

      </div>
    </div>
  );
}
