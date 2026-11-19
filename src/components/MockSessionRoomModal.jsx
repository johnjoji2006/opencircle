import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Mic,
  MicOff,
  PhoneOff,
  MessageSquare,
  ShieldCheck,
  Send,
  Volume2,
  Clock,
  Sparkles
} from 'lucide-react';

export default function MockSessionRoomModal() {
  const { modalState, setModalState, userAlias } = useApp();
  const isOpen = modalState.type === 'mockRoom';
  const session = modalState.data;

  const [isMicMuted, setIsMicMuted] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(145);
  const [chatInput, setChatInput] = useState('');
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    if (!isOpen || !session) return;

    setRoomMessages([
      {
        id: 'msg-1',
        sender: 'counsellor',
        text: `Hello ${session.alias || userAlias}! I am ${session.counsellorName}. Welcome to our safe, private space. How are you holding up today? Take all the time you need.`,
        time: 'Just now'
      }
    ]);

    const timer = setInterval(() => {
      setSessionSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, session]);

  if (!isOpen || !session) return null;

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: chatInput,
      time: 'Just now'
    };

    setRoomMessages(prev => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      setRoomMessages(prev => [
        ...prev,
        {
          id: `counsellor-${Date.now()}`,
          sender: 'counsellor',
          text: `Thank you for trusting me with that. I completely understand why you've been feeling that way. Let's explore that gently together.`,
          time: 'Just now'
        }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 text-slate-100 w-full max-w-3xl rounded-3xl shadow-2xl border border-teal-800/60 overflow-hidden flex flex-col h-[90vh] sm:h-[85vh]">
        
        {/* Top Room Bar */}
        <div className="px-3.5 sm:px-5 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                  {session.counsellorName}
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-900/80 text-teal-300 border border-teal-700 hidden xs:inline">
                  {session.mode}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                <span>Alias: <strong className="text-teal-300 font-mono">{session.alias || userAlias}</strong></span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-slate-800 rounded-xl text-xs font-mono text-amber-300 border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{formatTimer(sessionSeconds)}</span>
            </div>
            <button
              onClick={() => setModalState({ type: null, data: null })}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Room Body: Audio / Chat Interface */}
        <div className="flex-1 overflow-hidden flex flex-col md:grid md:grid-cols-5">
          
          {/* Counsellor Voice Stage */}
          <div className="md:col-span-2 bg-slate-900 p-3 sm:p-4 md:p-6 flex flex-row md:flex-col items-center justify-between md:justify-center border-b md:border-b-0 md:border-r border-slate-800 text-left md:text-center relative flex-shrink-0">
            
            <div className="flex items-center md:flex-col gap-3 md:gap-0">
              <div className="relative md:mb-3 flex-shrink-0">
                <div className="w-12 h-12 md:w-24 md:h-24 rounded-full border-2 md:border-4 border-teal-500/40 p-0.5 md:p-1 relative">
                  <img
                    src={session.counsellorAvatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'}
                    alt={session.counsellorName}
                    className="w-full h-full rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-4 h-4 md:w-5 md:h-5 bg-emerald-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                    <Volume2 className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                  </span>
                </div>
              </div>

              <div>
                <h5 className="font-bold text-white text-xs sm:text-sm md:text-base leading-tight">{session.counsellorName}</h5>
                <p className="text-[10px] sm:text-xs text-teal-400 mt-0.5">Active Listener</p>
              </div>
            </div>

            {/* Sound Wave Animation */}
            <div className="flex items-center gap-1 h-6 md:h-8 md:my-3">
              <div className="w-1 bg-teal-400 rounded-full animate-sound-wave" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 bg-teal-400 rounded-full animate-sound-wave" style={{ animationDelay: '0.4s' }}></div>
              <div className="w-1 bg-teal-400 rounded-full animate-sound-wave" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 bg-teal-400 rounded-full animate-sound-wave" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-1 bg-teal-400 rounded-full animate-sound-wave" style={{ animationDelay: '0.3s' }}></div>
            </div>

            <div className="hidden md:block p-3 bg-slate-800/80 rounded-2xl border border-slate-700/80 text-[11px] text-slate-300 max-w-xs text-left">
              🔒 <strong>Encrypted Tunnel:</strong> Camera strictly disabled. Your IP address is masked.
            </div>
          </div>

          {/* Right Panel: Live Encrypted Chat */}
          <div className="md:col-span-3 flex-1 flex flex-col bg-slate-950/60 overflow-hidden">
            <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3">
              {roomMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-teal-700 text-white rounded-br-none'
                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-0.5 px-1">
                    {msg.sender === 'user' ? (session.alias || userAlias) : session.counsellorName} • {msg.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-2.5 sm:p-3 border-t border-slate-800 flex items-center gap-2 bg-slate-950">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type a confidential thought..."
                className="flex-1 min-w-0 bg-slate-800 text-slate-100 placeholder-slate-500 text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-teal-500"
              />
              <button
                type="submit"
                className="p-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl transition-colors flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Room Call Controls Bar */}
        <div className="px-3.5 sm:px-5 py-2.5 sm:py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMicMuted(!isMicMuted)}
              className={`px-3 py-2 sm:p-3 rounded-2xl text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-colors ${
                isMicMuted
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {isMicMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span>{isMicMuted ? 'Muted' : 'Mic Live'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setModalState({ type: null, data: null })}
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 sm:gap-2 shadow-lg transition-colors"
            >
              <PhoneOff className="w-4 h-4" />
              <span>Leave</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
