import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, ShieldCheck, PhoneCall, Sparkles, Coffee, Globe } from 'lucide-react';

export default function Footer() {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Crisis Care Notice Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400 mt-0.5">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                Need Immediate Help or In Crisis?
                <span className="text-[11px] font-semibold uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                  24x7 Free India Helplines
                </span>
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                OpenCircle provides peer listening, AI comfort, and non-emergency counselling. If you or someone you know is in severe distress or having thoughts of self-harm, please reach out to these toll-free 24/7 government and NGO emergency hotlines right away.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <a
              href="tel:14416"
              className="px-3 py-1.5 rounded-lg bg-teal-800 hover:bg-teal-700 text-white font-semibold transition-colors flex items-center gap-1.5"
            >
              <span>Tele-MANAS: 14416</span>
            </a>
            <a
              href="tel:18005990019"
              className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-colors"
            >
              KIRAN: 1800-599-0019
            </a>
            <a
              href="tel:9999666555"
              className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-colors"
            >
              Vandrevala: 9999 666 555
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-teal-600/30 border border-teal-500 flex items-center justify-center">
                <span className="w-3 h-3 rounded-full bg-teal-400"></span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">OpenCircle</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              India's zero-rupee mental wellness, peer listening, and real-life campus community ecosystem. No stigma. No cost. Always open.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 bg-teal-950/60 p-2.5 rounded-xl border border-teal-800/40">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Zero data harvesting. 100% anonymous option on all tools.</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h5 className="text-sm font-semibold text-white tracking-wide uppercase mb-3">Ecosystem</h5>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-teal-400 transition-colors">
                  Home & Overview
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('ai-listener'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-teal-400 transition-colors">
                  CircleBot Voice & Chat
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('counsellors'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-teal-400 transition-colors">
                  Book Free Counsellor
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('social-circles'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-teal-400 transition-colors">
                  Campus Hangout Circles
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('peer-buddy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-teal-400 transition-colors">
                  Peer Buddies & Free Academy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: The ₹0 Model */}
          <div>
            <h5 className="text-sm font-semibold text-white tracking-wide uppercase mb-3">The ₹0 Model</h5>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => { setActiveTab('sponsors'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-teal-400 transition-colors">
                  ₹0 Architecture Breakdown
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('counsellors'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-teal-400 transition-colors">
                  Impact Contract & Payouts
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('sponsors'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-teal-400 transition-colors">
                  Sponsor a Session
                </button>
              </li>
              <li>
                <span className="text-xs bg-slate-800 text-teal-300 px-2 py-1 rounded inline-block">
                  Verified transparent tracking
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Community Spirit */}
          <div className="space-y-3">
            <h5 className="text-sm font-semibold text-white tracking-wide uppercase">Community Pledge</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              OpenCircle is built with compassion by students, developers, and psychologists. Our code, classes, and circles will remain 100% free for anyone experiencing stress, loneliness, or homesickness.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-amber-300">
              <Sparkles className="w-4 h-4" />
              <span>Made for campus communities across India</span>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} OpenCircle. Open initiative for mental health equity.</p>
          <div className="flex items-center gap-6">
            <span>Always ₹0 for students</span>
            <span>•</span>
            <span>Anonymous by design</span>
            <span>•</span>
            <span>Zero ad tracking</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
