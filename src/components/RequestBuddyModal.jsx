import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Heart, Coffee, BookOpen, Compass, MessageCircle, ShieldCheck } from 'lucide-react';

export default function RequestBuddyModal() {
  const { modalState, setModalState, requestPeerBuddy, userAlias, anonymousMode } = useApp();
  const isOpen = modalState.type === 'requestBuddy';
  const buddy = modalState.data;

  const [activity, setActivity] = useState('Cutting Chai & Chat');
  const [preferredTime, setPreferredTime] = useState('Today evening around 6:00 PM');
  const [note, setNote] = useState('');

  if (!isOpen || !buddy) return null;

  const activities = [
    { id: 'Cutting Chai & Chat', label: 'Chai & Chill', icon: Coffee, desc: 'Casual 20 min tea break' },
    { id: 'Silent Study Together', label: 'Study Buddy', icon: BookOpen, desc: 'Co-working without pressure' },
    { id: 'Campus Walk & Vent', label: 'Evening Walk', icon: Compass, desc: 'Fresh air & gentle stroll' },
    { id: 'Online Text Vent', label: 'Text Venting', icon: MessageCircle, desc: 'Chat via anonymous link' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    requestPeerBuddy(buddy.id, {
      activity,
      preferredTime,
      note
    });
    setModalState({ type: null, data: null });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF9F6] w-full max-w-md rounded-3xl p-4 sm:p-7 shadow-2xl border border-teal-100 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <img
              src={buddy.avatar}
              alt={buddy.name}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-teal-600/30"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full">
                  {buddy.badge}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">{buddy.name}</h3>
              <p className="text-xs text-slate-500">{buddy.year}</p>
            </div>
          </div>
          <button
            onClick={() => setModalState({ type: null, data: null })}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Choose Activity
            </label>
            <div className="grid grid-cols-2 gap-2">
              {activities.map((act) => {
                const Icon = act.icon;
                const isSelected = activity === act.id;
                return (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => setActivity(act.id)}
                    className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'bg-teal-50 border-teal-600 text-teal-950 ring-2 ring-teal-600/20'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-teal-700' : 'text-slate-400'}`} />
                    <div>
                      <p className="text-xs font-bold">{act.label}</p>
                      <p className="text-[10px] text-slate-500 leading-tight">{act.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Preferred Time & Spot
            </label>
            <input
              type="text"
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              placeholder="e.g. Today around 6:00 PM near canteen"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Short Note <span className="font-normal text-slate-400 lowercase">(optional)</span>
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Just feeling a bit homesick and would love some normal company..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30 bg-white"
            />
          </div>

          <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-700 flex-shrink-0" />
            <span>
              Request sent as <strong className="font-mono">{userAlias}</strong>. Zero awkwardness if you change your mind!
            </span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setModalState({ type: null, data: null })}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
            >
              Send Free Request
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
