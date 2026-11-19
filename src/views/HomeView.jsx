import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  Users,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  Heart,
  Wind,
  CheckCircle,
  HelpCircle,
  Coffee,
  Coins,
  Smile
} from 'lucide-react';

export default function HomeView() {
  const {
    setActiveTab,
    anonymousMode,
    userAlias,
    stats,
    setModalState
  } = useApp();

  const [quickAffirmation, setQuickAffirmation] = useState(
    "You don't need to have your entire life figured out to deserve peace today."
  );

  const affirmations = [
    "Your worth is not defined by one semester's CGPA.",
    "It is okay to miss home. You are adjusting to a whole new world.",
    "Resting your mind is productive. You are allowed to take a break.",
    "You don't have to carry heavy thoughts alone. Someone is ready to listen.",
    "One bad day or rejection does not equal a bad life."
  ];

  const rollAffirmation = () => {
    const next = affirmations[Math.floor(Math.random() * affirmations.length)];
    setQuickAffirmation(next);
  };

  return (
    <div className="space-y-12 sm:space-y-16 py-3 sm:py-8 animate-fade-in">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-4 sm:pt-6 pb-10 sm:pb-16 text-center lg:text-left">
        {/* Soft Background Radial Blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] sm:w-[600px] h-[300px] sm:h-[350px] bg-gradient-to-tr from-teal-200/30 via-sage-light/40 to-amber-200/20 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Headline & CTAs */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              
              {/* Trust Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] sm:text-xs font-semibold shadow-sm max-w-full">
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-ping flex-shrink-0"></span>
                <span className="truncate">Zero Stigma • Zero Cost • Always ₹0 for Students</span>
              </div>

              {/* Responsive Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] break-words">
                You don’t have to carry it alone.{' '}
                <span className="text-teal-700 underline decoration-amber-400 decoration-wavy decoration-2">
                  Talk freely, stay anonymous,
                </span>{' '}
                always ₹0.
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Whether it's brutal exam pressure, hostel homesickness, or late-night loneliness — OpenCircle gives you instant empathetic AI listening, free 1-on-1 sessions with verified counsellors, and low-pressure real-life campus meetups.
              </p>

              {/* Dual CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 w-full">
                <button
                  onClick={() => setActiveTab('ai-listener')}
                  className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm sm:text-base shadow-soft-lg hover:shadow-teal-glow transition-all flex items-center justify-center gap-2 group"
                >
                  <MessageSquare className="w-5 h-5 text-teal-200 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span>Talk to AI Listener Now</span>
                  <ArrowRight className="w-4 h-4 text-teal-200 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </button>

                <button
                  onClick={() => setActiveTab('social-circles')}
                  className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border-2 border-slate-200 hover:border-teal-300 shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Users className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span>Join a Campus Circle</span>
                </button>
              </div>

              {/* Anonymous Shield Note */}
              <div className="flex items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-teal-700 flex-shrink-0" />
                <span className="truncate">
                  Active Alias: <strong className="text-teal-800 font-mono">{userAlias}</strong>. No phone or email required.
                </span>
              </div>

            </div>

            {/* Right Column: Interactive Quick Card & Affirmation */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Daily Affirmation Card */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white border border-teal-100 shadow-soft-lg relative overflow-hidden text-left">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    Gentle Reminder Today
                  </span>
                  <button
                    onClick={rollAffirmation}
                    className="text-xs font-bold text-teal-700 hover:text-teal-900 transition-colors"
                  >
                    Refresh ✨
                  </button>
                </div>

                <blockquote className="text-base sm:text-lg font-semibold text-slate-800 leading-snug">
                  "{quickAffirmation}"
                </blockquote>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      🌿
                    </div>
                    <span className="text-xs font-semibold text-slate-600">CircleBot Warmth</span>
                  </div>
                  <button
                    onClick={() => setModalState({ type: 'breathing', data: null })}
                    className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
                  >
                    <Wind className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>60s Breathing Tool →</span>
                  </button>
                </div>
              </div>

              {/* Instant Mood Starter Shortcuts */}
              <div className="p-4 sm:p-5 rounded-3xl bg-teal-900 text-white shadow-soft text-left space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-teal-300">
                  Instant Support • What's weighing on you?
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Exams & CGPA stress',
                    'Missing home & hostel food',
                    'Feeling totally alone',
                    'Can\'t sleep, racing thoughts'
                  ].map((topic, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab('ai-listener')}
                      className="px-3 py-1.5 rounded-xl bg-teal-800/80 hover:bg-teal-700 text-xs font-medium text-teal-100 hover:text-white border border-teal-700 transition-colors"
                    >
                      {topic} →
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Live Impact Counters Ticker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft">
          
          <div className="text-center p-2.5 sm:p-3">
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-teal-700 font-mono">
              {stats.totalVerifiedSessions.toLocaleString('en-IN')}+
            </span>
            <p className="text-xs sm:text-sm font-bold text-slate-700 mt-1">Free Sessions Logged</p>
            <p className="text-[10px] sm:text-[11px] text-slate-500">Tracked on impact ledger</p>
          </div>

          <div className="text-center p-2.5 sm:p-3 border-l border-slate-100">
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-500 font-mono">
              {stats.activeCirclesCount}
            </span>
            <p className="text-xs sm:text-sm font-bold text-slate-700 mt-1">Campus Circles</p>
            <p className="text-[10px] sm:text-[11px] text-slate-500">Small talks, tea & jams</p>
          </div>

          <div className="text-center p-2.5 sm:p-3 border-t lg:border-t-0 lg:border-l border-slate-100">
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-teal-800 font-mono">
              {stats.trainedListenersCount}+
            </span>
            <p className="text-xs sm:text-sm font-bold text-slate-700 mt-1">Peer Listeners</p>
            <p className="text-[10px] sm:text-[11px] text-slate-500">Certified via Academy</p>
          </div>

          <div className="text-center p-2.5 sm:p-3 border-t lg:border-t-0 border-l border-slate-100 bg-teal-50/50 rounded-2xl">
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-teal-900 font-mono">
              ₹0
            </span>
            <p className="text-xs sm:text-sm font-bold text-teal-950 mt-1">Cost to Students</p>
            <p className="text-[10px] sm:text-[11px] text-teal-700 font-semibold">100% Free Forever</p>
          </div>

        </div>
      </section>

      {/* Quick 4-Card Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/80 px-3 py-1 rounded-full">
            How OpenCircle Works
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Four pillars of zero-stigma care
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            A comprehensive support net designed specifically for how students actually live and feel.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-2 sm:pt-4">
          
          {/* Card 1: Instant Positive AI Support */}
          <div
            onClick={() => setActiveTab('ai-listener')}
            className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-teal-400 shadow-soft hover:shadow-soft-lg transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Instant Positive AI Support
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Empathetic voice & chat listener. Validates thoughts without judgement, teaches micro-grounding, and works 24/7 without waitlists.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-teal-700 group-hover:translate-x-1 transition-transform">
              <span>Talk to CircleBot →</span>
            </div>
          </div>

          {/* Card 2: Anonymous Counsellor Booking */}
          <div
            onClick={() => setActiveTab('counsellors')}
            className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-teal-400 shadow-soft hover:shadow-soft-lg transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Anonymous Counsellor Booking
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Book 1-on-1 confidential chat or audio sessions with psychologists. No real name needed. Counsellors are sponsored directly per session.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-teal-700 group-hover:translate-x-1 transition-transform">
              <span>Book a Free Slot →</span>
            </div>
          </div>

          {/* Card 3: Real-Life Social Hangouts */}
          <div
            onClick={() => setActiveTab('social-circles')}
            className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-teal-400 shadow-soft hover:shadow-soft-lg transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Real-Life Social Hangouts
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Campus circles for small talks, cutting chai, acoustic guitar, or silent study body-doubling. Zero pressure to talk or be social.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-teal-700 group-hover:translate-x-1 transition-transform">
              <span>Browse Hangouts →</span>
            </div>
          </div>

          {/* Card 4: Peer Companionship */}
          <div
            onClick={() => setActiveTab('peer-buddy')}
            className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-teal-400 shadow-soft hover:shadow-soft-lg transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Peer Companionship & Academy
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect with friendly student buddies for coffee or walks, or take our free 4-module listener course to become a certified peer listener.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-teal-700 group-hover:translate-x-1 transition-transform">
              <span>Find Buddies & Learn →</span>
            </div>
          </div>

        </div>
      </section>

      {/* Zero-Rupee Transparency Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 text-white shadow-xl relative overflow-hidden">
          
          <div className="absolute right-0 top-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/80 text-amber-300 text-xs font-bold uppercase tracking-wider border border-teal-700">
                <Coins className="w-3.5 h-3.5" />
                <span>The ₹0 Transparency Model</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
                How is OpenCircle 100% free forever without going broke?
              </h2>
              <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
                We believe nobody should ever have to choose between their mental health and their hostel food budget. OpenCircle runs entirely on free-tier serverless cloud infrastructure and client-side AI. Verified counsellors are funded transparently by ethical CSR partners and campus brands who sponsor sessions at a fixed rate.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs text-teal-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Free-tier cloud stack</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Transparent session ledger</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Counsellors paid by sponsors</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center bg-teal-950/60 p-5 sm:p-6 rounded-2xl border border-teal-700/50 text-center space-y-3">
              <span className="text-xs uppercase font-bold text-teal-300">Live Sponsor Pool</span>
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">
                ₹{stats.totalSponsorFunds.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-teal-200">Pledged to student wellbeing</p>
              <button
                onClick={() => setActiveTab('sponsors')}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs shadow-md transition-colors"
              >
                Inspect ₹0 Architecture →
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
