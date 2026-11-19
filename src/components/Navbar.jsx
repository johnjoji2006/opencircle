import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Calendar,
  Menu,
  X,
  RefreshCw,
  Heart,
  Wind
} from 'lucide-react';

export default function Navbar() {
  const {
    activeTab,
    setActiveTab,
    anonymousMode,
    setAnonymousMode,
    userAlias,
    regenerateAlias,
    bookedSessions,
    setModalState
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'ai-listener', label: 'AI Listener', badge: 'Voice & Chat' },
    { id: 'counsellors', label: 'Counsellors', badge: '₹0 Booking' },
    { id: 'social-circles', label: 'Social Circles', badge: 'Meetups' },
    { id: 'peer-buddy', label: 'Peer Buddy & Learn' },
    { id: 'sponsors', label: 'Sponsors & Impact' }
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#ECE6DA] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with Subtle Open-Ring SVG */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg className="w-10 h-10 transform -rotate-45 transition-transform duration-500 group-hover:rotate-12" viewBox="0 0 100 100">
                {/* Outer open ring representing open circle of care */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#0F766E"
                  strokeWidth="8.5"
                  strokeDasharray="200 45"
                  strokeLinecap="round"
                />
                {/* Amber dot completing the circle warmth */}
                <circle cx="70" cy="22" r="7" fill="#F59E0B" className="animate-pulse" />
              </svg>
              <div className="absolute inset-0 rounded-full bg-teal-500/10 blur-sm pointer-events-none group-hover:bg-teal-500/20 transition-all"></div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-bold tracking-tight text-slate-900 font-sans">
                  Open<span className="text-teal-700">Circle</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-teal-100/80 text-teal-800 rounded-full border border-teal-200">
                  ₹0 Startup
                </span>
              </div>
              <p className="text-[11px] text-slate-500 -mt-0.5 tracking-tight font-medium hidden md:block">
                Free Mental Wellness & Campus Circles
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-teal-900 bg-teal-50/90 shadow-sm border border-teal-200/60 font-semibold'
                      : 'text-slate-600 hover:text-teal-800 hover:bg-slate-100/60'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className={`ml-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-teal-700 text-white' : 'bg-slate-200/70 text-slate-600'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-teal-700 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Anonymous Mode Toggle + Sessions Drawer + Breathing Quick Tool */}
          <div className="flex items-center gap-2.5">
            
            {/* Quick 1-click Guided Breathing Button */}
            <button
              onClick={() => setModalState({ type: 'breathing', data: null })}
              title="Calming Breathing Exercise"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 hover:bg-teal-100 transition-colors"
            >
              <Wind className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
              <span>Breathe</span>
            </button>

            {/* Booked Sessions Drawer Toggle */}
            <button
              onClick={() => setModalState({ type: 'mySessions', data: null })}
              title="View your booked sessions"
              className="relative p-2 rounded-xl text-slate-700 hover:text-teal-800 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
            >
              <Calendar className="w-5 h-5 text-teal-700" />
              {bookedSessions.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 text-[11px] font-bold bg-amber-500 text-slate-900 rounded-full flex items-center justify-center border-2 border-[#FAF9F6] shadow-sm">
                  {bookedSessions.length}
                </span>
              )}
            </button>

            {/* Persistent Anonymous Mode Toggle Pill */}
            <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
              <button
                onClick={() => setAnonymousMode(!anonymousMode)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  anonymousMode
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 bg-slate-100'
                }`}
                title={anonymousMode ? "Anonymous Mode Active - Your real name is hidden" : "Toggle Anonymous Mode"}
              >
                {anonymousMode ? (
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-200" />
                ) : (
                  <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span>Anon Mode</span>
                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.2 rounded-full ${
                  anonymousMode ? 'bg-teal-800 text-teal-200' : 'bg-slate-200 text-slate-500'
                }`}>
                  {anonymousMode ? 'ON' : 'OFF'}
                </span>
              </button>

              {anonymousMode && (
                <div className="flex items-center pl-2 pr-1 gap-1 border-l border-slate-100 ml-1">
                  <span
                    className="text-xs font-bold text-teal-900 max-w-[100px] truncate"
                    title={`Current Alias: ${userAlias}`}
                  >
                    {userAlias}
                  </span>
                  <button
                    onClick={regenerateAlias}
                    title="Generate new random alias"
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-teal-700 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-[#FAF9F6] px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fade-in">
          {anonymousMode && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-teal-50 border border-teal-200 mb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <div>
                  <p className="text-xs font-bold text-teal-900">Protected Identity</p>
                  <p className="text-xs text-teal-700 font-mono font-semibold">{userAlias}</p>
                </div>
              </div>
              <button
                onClick={regenerateAlias}
                className="text-xs text-teal-800 font-semibold px-2 py-1 bg-white rounded-lg border border-teal-200 flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Reroll
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold text-left transition-colors ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-teal-800 text-teal-100' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-200 flex gap-2">
            <button
              onClick={() => {
                setModalState({ type: 'breathing', data: null });
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-teal-100 text-teal-900 flex items-center justify-center gap-1.5"
            >
              <Wind className="w-4 h-4" /> Quick Breathing
            </button>
            <button
              onClick={() => {
                setModalState({ type: 'mySessions', data: null });
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-900 flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-4 h-4" /> My Sessions ({bookedSessions.length})
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
