import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Users, MapPin, Calendar, PlusCircle, Sparkles } from 'lucide-react';

export default function HostCircleModal() {
  const { modalState, setModalState, hostNewCircle, anonymousMode, userAlias } = useApp();
  const isOpen = modalState.type === 'hostCircle';

  const [formData, setFormData] = useState({
    title: '',
    category: 'Small Talks',
    location: '',
    dateLabel: 'Today, 6:30 PM',
    spotsTotal: 10,
    description: '',
    hostName: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location) return;

    hostNewCircle({
      title: formData.title,
      category: formData.category,
      location: formData.location,
      dateLabel: formData.dateLabel,
      spotsTotal: parseInt(formData.spotsTotal, 10) || 12,
      description: formData.description || 'Casual hangout to beat stress and loneliness. Everyone is welcome!',
      hostName: anonymousMode ? userAlias : formData.hostName || userAlias
    });

    setModalState({ type: null, data: null });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF9F6] w-full max-w-lg rounded-3xl p-4 sm:p-7 shadow-2xl border border-teal-100 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-1.5 text-teal-700 font-bold text-xs uppercase tracking-wider">
              <Users className="w-4 h-4" />
              <span>Campus Hangout</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">Host a Campus Social Circle</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Low pressure, zero awkwardness real-life meetups to beat loneliness.
            </p>
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
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Circle Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Chai & Late Evening Campus Walk"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30"
              >
                <option value="Small Talks">Small Talks</option>
                <option value="Music">Music & Chill</option>
                <option value="Hobbies">Hobbies & DIY</option>
                <option value="Study">Study & Coffee</option>
                <option value="Walks">Walks & Rants</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Max Spots
              </label>
              <input
                type="number"
                min="4"
                max="30"
                value={formData.spotsTotal}
                onChange={(e) => setFormData({ ...formData, spotsTotal: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Date & Time *
              </label>
              <input
                type="text"
                required
                value={formData.dateLabel}
                onChange={(e) => setFormData({ ...formData, dateLabel: e.target.value })}
                placeholder="e.g. Today, 6:00 PM or Saturday 5 PM"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Exact Meeting Spot *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Banyan tree near canteen"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              What’s the vibe? (Description)
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Keep it casual! Tell people they don't have to talk if they're tired, or what to bring..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30 bg-white"
            />
          </div>

          <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-900">
            🛡️ <strong>Hosting Identity:</strong>{' '}
            {anonymousMode ? (
              <span>You will host under your anonymous alias <strong className="font-mono">{userAlias}</strong>.</span>
            ) : (
              <span>Your name will appear as host.</span>
            )}
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
              <PlusCircle className="w-4 h-4" />
              <span>Publish Circle</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
