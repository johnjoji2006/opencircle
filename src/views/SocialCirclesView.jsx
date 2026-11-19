import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  MapPin,
  Calendar,
  Clock,
  PlusCircle,
  Search,
  CheckCircle2,
  ShieldCheck,
  Tag,
  Coffee,
  Heart,
  Sparkles
} from 'lucide-react';

export default function SocialCirclesView() {
  const {
    socialCircles,
    toggleJoinCircle,
    setModalState,
    anonymousMode,
    userAlias
  } = useApp();

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Small Talks', 'Music', 'Hobbies', 'Study', 'Walks'];

  const filteredCircles = socialCircles.filter(circle => {
    const matchesCategory = activeCategory === 'All' || circle.category === activeCategory;
    const matchesSearch =
      circle.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      circle.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      circle.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/80 px-3 py-1 rounded-full">
            Real-Life Community Hangouts
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            Social Circles & Low-Pressure Meetups
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            The antidote to loneliness isn't another screen — it's casual, zero-pressure real-life company. Join a circle or host your own.
          </p>
        </div>

        {/* Host Circle Button */}
        <button
          onClick={() => setModalState({ type: 'hostCircle', data: null })}
          className="px-5 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Host a Circle</span>
        </button>
      </div>

      {/* Filter Bar & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Filter Pills (Exact requirement) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search meetups or spots..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30"
          />
        </div>
      </div>

      {/* Low-pressure Golden Rules Callout */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-center justify-between flex-wrap gap-2 text-xs text-amber-950">
        <span className="font-semibold flex items-center gap-2">
          ☕ <strong>The OpenCircle Hangout Rule:</strong> You NEVER have to be loud, cheerful, or articulate. Sitting quietly with a cup of tea is 100% welcomed.
        </span>
        <span className="text-amber-800 font-mono text-[11px]">
          Joining as: <strong>{anonymousMode ? userAlias : 'You'}</strong>
        </span>
      </div>

      {/* Social Circles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCircles.map((circle) => {
          const isUserJoined =
            circle.isJoined ||
            (circle.attendees && circle.attendees.includes(anonymousMode ? userAlias : 'You'));

          const spotsLeft = Math.max(0, circle.spotsTotal - circle.joinedCount);

          return (
            <div
              key={circle.id}
              className={`p-6 rounded-3xl bg-white border transition-all duration-300 flex flex-col justify-between shadow-soft hover:shadow-soft-lg ${
                isUserJoined ? 'border-teal-400 ring-2 ring-teal-500/10' : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                
                {/* Category & Status */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                    {circle.category}
                  </span>
                  {isUserJoined && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> You're Going
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {circle.title}
                </h3>

                {/* Date & Location */}
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2 text-slate-700 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-teal-700 flex-shrink-0" />
                    <span>{circle.dateLabel}</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="leading-tight">{circle.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {circle.description}
                </p>

                {/* Tags */}
                {circle.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {circle.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

              </div>

              {/* Bottom Card Footer */}
              <div className="pt-5 mt-5 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-teal-700" />
                    <strong>{circle.joinedCount}</strong> / {circle.spotsTotal} going
                  </span>
                  <span className={`text-[11px] font-semibold ${spotsLeft <= 3 ? 'text-rose-600' : 'text-slate-400'}`}>
                    {spotsLeft} spot{spotsLeft === 1 ? '' : 's'} left
                  </span>
                </div>

                {/* Recent attendee aliases pills */}
                {circle.attendees && circle.attendees.length > 0 && (
                  <div className="flex items-center gap-1 overflow-hidden">
                    <span className="text-[10px] text-slate-400">Pals:</span>
                    <div className="flex items-center gap-1 truncate text-[10px] text-slate-500 font-mono">
                      {circle.attendees.slice(0, 3).map((att, i) => (
                        <span key={i} className="bg-slate-100 px-1.5 py-0.5 rounded">
                          {att}
                        </span>
                      ))}
                      {circle.attendees.length > 3 && (
                        <span className="text-slate-400">+{circle.attendees.length - 3}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Join / Leave Circle Button */}
                <button
                  onClick={() => toggleJoinCircle(circle.id)}
                  className={`w-full py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                    isUserJoined
                      ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                      : 'bg-teal-700 hover:bg-teal-800 text-white hover:shadow-md'
                  }`}
                >
                  {isUserJoined ? (
                    <span>Leave Circle</span>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Join Circle (Free)</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
