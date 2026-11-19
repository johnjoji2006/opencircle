import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Heart,
  BookOpen,
  Award,
  Play,
  CheckCircle2,
  Coffee,
  PlusCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function PeerBuddyView() {
  const {
    peerSubTab,
    setPeerSubTab,
    peerBuddies,
    courses,
    completedCourses,
    setModalState,
    userAlias
  } = useApp();

  const completedCount = completedCourses.length;
  const progressPercent = Math.round((completedCount / courses.length) * 100);
  const isFullyCertified = completedCount === courses.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/80 px-3 py-1 rounded-full">
            Human Connection & Training
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            Peer Companions & Listener Academy
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Not formal therapy — just genuine human company when you need someone to sit with, plus free certified training so anyone can hold safe space.
          </p>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex p-1 bg-slate-200/80 rounded-2xl w-full sm:w-auto self-start md:self-auto">
          <button
            onClick={() => setPeerSubTab('find')}
            className={`flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
              peerSubTab === 'find'
                ? 'bg-white text-teal-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 flex-shrink-0" />
            <span>Find a Peer Buddy</span>
          </button>

          <button
            onClick={() => setPeerSubTab('learn')}
            className={`flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
              peerSubTab === 'learn'
                ? 'bg-white text-teal-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-teal-700 flex-shrink-0" />
            <span>Free Classes</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-teal-100 text-teal-800 font-bold">
              {completedCount}/4
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================
          TAB A: FIND A PEER BUDDY
         ======================================================== */}
      {peerSubTab === 'find' && (
        <div className="space-y-6">
          
          {/* Volunteer trigger banner */}
          <div className="p-5 sm:p-6 rounded-3xl bg-amber-500/10 border border-amber-300/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <span>Want to be a friendly face for students?</span>
                <span className="text-[10px] font-bold uppercase bg-amber-500 text-slate-900 px-2 py-0.5 rounded-full">
                  Volunteer
                </span>
              </h3>
              <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                You don't need professional training. Just the willingness to grab a cutting chai, take a walk, or sit together during study hours.
              </p>
            </div>
            <button
              onClick={() => setModalState({ type: 'volunteerBuddy', data: null })}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 flex-shrink-0"
            >
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span>Volunteer as a Buddy</span>
            </button>
          </div>

          {/* Peer Buddy Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {peerBuddies.map((buddy) => (
              <div
                key={buddy.id}
                className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-teal-400 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  
                  <div className="flex items-start gap-3 sm:gap-4">
                    <img
                      src={buddy.avatar}
                      alt={buddy.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-teal-600/20 shadow-sm flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="text-base font-bold text-slate-900 truncate">
                          {buddy.name}
                        </h3>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full flex-shrink-0">
                          {buddy.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">{buddy.year}</p>
                      <p className="text-xs text-teal-700 font-semibold mt-1">
                        ⏰ Available: {buddy.availability}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    "{buddy.bio}"
                  </p>

                  {/* Interests */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {buddy.interests.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-xl"
                      >
                        ☕ {tag}
                      </span>
                    ))}
                  </div>

                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Alias: {userAlias}
                  </span>
                  <button
                    onClick={() => setModalState({ type: 'requestBuddy', data: buddy })}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <Coffee className="w-3.5 h-3.5" />
                    <span>Request Company (₹0)</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* ========================================================
          TAB B: LEARN TO LISTEN (FREE RECORDED CLASSES)
         ======================================================== */}
      {peerSubTab === 'learn' && (
        <div className="space-y-6">
          
          {/* Progress Tracker Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-teal-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-teal-800 px-3 py-1 rounded-full border border-teal-700 inline-block">
                Peer Listener Certification Academy
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Empathetic Listening Micro-Classes
              </h2>
              <p className="text-xs text-teal-100 max-w-xl leading-relaxed">
                Designed by youth psychologists to teach practical non-judgemental listening skills and crisis safety boundaries in under 35 minutes total.
              </p>
            </div>

            {/* Progress Radial / Bar */}
            <div className="bg-teal-950/70 p-5 rounded-2xl border border-teal-700/60 text-center space-y-3 w-full md:w-64">
              <div className="flex items-center justify-between text-xs font-bold text-teal-200">
                <span>Modules Progress</span>
                <span className="font-mono text-amber-400">{progressPercent}%</span>
              </div>
              <div className="w-full bg-teal-800/80 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-teal-300">
                {completedCount} of 4 Modules Completed
              </p>

              {isFullyCertified && (
                <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 animate-pulse">
                  <Award className="w-4 h-4 flex-shrink-0" />
                  <span>Certified Peer Listener Badge Active!</span>
                </div>
              )}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {courses.map((course, idx) => {
              const isCompleted = completedCourses.includes(course.id);

              return (
                <div
                  key={course.id}
                  className={`p-5 sm:p-6 rounded-3xl bg-white border transition-all duration-300 flex flex-col justify-between shadow-soft hover:shadow-soft-lg ${
                    isCompleted ? 'border-emerald-300 ring-2 ring-emerald-500/10' : 'border-slate-200/80'
                  }`}
                >
                  <div className="space-y-4">
                    
                    {/* Thumbnail & Video Badge */}
                    <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 group cursor-pointer"
                         onClick={() => setModalState({ type: 'coursePlayer', data: course })}>
                      <img
                        src={course.videoThumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-teal-700/90 text-white flex items-center justify-center shadow-lg group-hover:bg-teal-600 transition-colors">
                          <Play className="w-5 h-5 translate-x-0.5 fill-white" />
                        </div>
                      </div>
                      <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 text-white font-mono text-[11px]">
                        {course.duration}
                      </span>
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-teal-700/90 text-white text-[10px] font-bold uppercase tracking-wider">
                        Module 0{idx + 1}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                          {course.tag}
                        </span>
                        {isCompleted && (
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" /> Completed
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-slate-900 mt-2 leading-snug">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        {course.summary}
                      </p>
                    </div>

                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Video & scenario quiz
                    </span>
                    <button
                      onClick={() => setModalState({ type: 'coursePlayer', data: course })}
                      className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>{isCompleted ? 'Review Class' : 'Start Class'}</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
