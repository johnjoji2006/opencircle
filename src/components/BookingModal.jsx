import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  MessageSquare,
  Phone,
  Video,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle,
  Sparkles
} from 'lucide-react';

export default function BookingModal() {
  const { modalState, setModalState, bookSession, anonymousMode, userAlias } = useApp();
  const isOpen = modalState.type === 'bookCounsellor';
  const counsellor = modalState.data;

  const [mode, setMode] = useState('Anonymous Chat');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [note, setNote] = useState('');
  const [keepAnonymous, setKeepAnonymous] = useState(anonymousMode);

  // Initialize selected slot when counsellor opens
  React.useEffect(() => {
    if (counsellor && counsellor.slots && counsellor.slots.length > 0) {
      setSelectedSlot(counsellor.slots[0]);
    }
    setKeepAnonymous(anonymousMode);
  }, [counsellor, anonymousMode]);

  if (!isOpen || !counsellor) return null;

  const modes = [
    {
      id: 'Anonymous Chat',
      label: 'Anonymous Chat',
      desc: 'Encrypted text room, zero voice or face required',
      icon: MessageSquare
    },
    {
      id: 'Anonymous Audio Call',
      label: 'Anonymous Audio Call',
      desc: 'Voice call via browser, camera strictly disabled',
      icon: Phone
    },
    {
      id: 'Live Video / In-Person',
      label: 'Live Video / In-Person',
      desc: 'Face-to-face video or quiet campus meeting room',
      icon: Video
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    bookSession({
      counsellorId: counsellor.id,
      mode,
      slot: selectedSlot || counsellor.nextAvailableSlot,
      note,
      isAnonymous: keepAnonymous,
      alias: keepAnonymous ? userAlias : 'You (Public)'
    });
    setModalState({ type: null, data: null });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF9F6] w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-teal-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <img
              src={counsellor.avatar}
              alt={counsellor.name}
              className="w-13 h-13 rounded-2xl object-cover border-2 border-teal-600/30 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/80 px-2 py-0.5 rounded-full">
                  ₹0 Free Session
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">{counsellor.name}</h3>
              <p className="text-xs text-slate-500">{counsellor.specialty}</p>
            </div>
          </div>
          <button
            onClick={() => setModalState({ type: null, data: null })}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          
          {/* Mode Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Session Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {modes.map((m) => {
                const Icon = m.icon;
                const isSelected = mode === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMode(m.id)}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'bg-teal-50 border-teal-600 text-teal-900 ring-2 ring-teal-600/20 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-teal-700' : 'text-slate-400'}`} />
                    <div>
                      <p className="text-xs font-bold leading-tight">{m.label}</p>
                      <p className="text-[10px] text-slate-500 mt-1 leading-snug">{m.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slot Picker */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Choose Available Slot
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(counsellor.slots || [counsellor.nextAvailableSlot]).map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 opacity-80" />
                      {slot}
                    </span>
                    {isSelected && <CheckCircle className="w-3.5 h-3.5 text-teal-200" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Short Note / Concern */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              What’s on your mind? <span className="font-normal text-slate-400 lowercase">(optional)</span>
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Dealing with sleep issues, parents pressure, or thesis anxiety..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 bg-white"
            />
          </div>

          {/* Anonymous Protection Checkbox */}
          <div className="p-3.5 rounded-2xl bg-teal-50/80 border border-teal-200/80 flex items-start gap-3">
            <input
              type="checkbox"
              id="anonCheckbox"
              checked={keepAnonymous}
              onChange={(e) => setKeepAnonymous(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-teal-700 rounded border-slate-300 focus:ring-teal-600"
            />
            <label htmlFor="anonCheckbox" className="text-xs text-teal-950 cursor-pointer">
              <span className="font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                Keep my identity strictly anonymous
              </span>
              <span className="block text-slate-600 mt-0.5 text-[11px]">
                The counsellor will only see your alias: <strong className="text-teal-900 font-mono">{userAlias}</strong>. No phone number or email will be shared.
              </span>
            </label>
          </div>

          {/* Transparency Callout */}
          <div className="text-[11px] text-slate-500 bg-slate-100/80 p-3 rounded-xl border border-slate-200">
            💡 <strong>Why is this ₹0?</strong> {counsellor.name} is rewarded through OpenCircle's ethical sponsor pool per verified session. You never pay a single rupee.
          </div>

          {/* Submit */}
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
              className="flex-1 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Confirm Free Booking</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
