import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export default function VolunteerBuddyModal() {
  const { modalState, setModalState, volunteerBuddy } = useApp();
  const isOpen = modalState.type === 'volunteerBuddy';

  const [formData, setFormData] = useState({
    name: '',
    year: '2nd Year Student',
    interests: 'Anime, Coffee, Late-night walks',
    availability: 'Evenings 6-8 PM',
    bio: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    const interestArray = formData.interests
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    volunteerBuddy({
      name: formData.name,
      year: formData.year,
      interests: interestArray.length ? interestArray : ['Campus Walks', 'Friendly Ear'],
      availability: formData.availability,
      bio: formData.bio || 'Happy to hang out, grab a quick tea, or offer quiet company when you feel lonely.'
    });

    setModalState({ type: null, data: null });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF9F6] w-full max-w-md rounded-3xl p-4 sm:p-7 shadow-2xl border border-teal-100 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-1.5 text-teal-700 font-bold text-xs uppercase tracking-wider">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Campus Volunteer</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">Volunteer as a Peer Buddy</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              No therapy degree needed — just warmth, empathy, and good vibes.
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
              Your Name or Preferred Nickname *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Yash or Simran"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30 bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Year & Branch
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="e.g. 3rd Year B.Tech"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Availability
              </label>
              <input
                type="text"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                placeholder="e.g. Weekday Evenings"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Interests / Vibes <span className="font-normal text-slate-400 lowercase">(comma separated)</span>
            </label>
            <input
              type="text"
              value={formData.interests}
              onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
              placeholder="e.g. Chai, Anime, Badminton, Indie rock"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Short Note to Peers
            </label>
            <textarea
              rows={2}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="e.g. I know how rough 1st year hostel felt. Hit me up if you just want to sit silently or get chai."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30"
            />
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
              className="flex-1 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Join as Buddy</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
