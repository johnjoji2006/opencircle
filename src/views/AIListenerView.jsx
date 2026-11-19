import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { generateLocalAIResponse } from '../data/aiEngine';
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Wind,
  Calendar,
  Heart,
  Bot,
  User,
  ArrowRight
} from 'lucide-react';

export default function AIListenerView() {
  const {
    chatMessages,
    setChatMessages,
    clearChat,
    anonymousMode,
    userAlias,
    setActiveTab,
    setModalState,
    showToast
  } = useApp();

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceReply, setVoiceReply] = useState(false); // default off to prevent unexpected audio, user can toggle ON
  const [isSpeaking, setIsSpeaking] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll chat to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping]);

  // Initialize Web Speech Recognition if available
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
          // Automatically process voice input
          handleSendMessage(null, transcript);
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition notice:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Voice output function via window.speechSynthesis
  const speakText = (text) => {
    if (!voiceReply || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95; // Slightly slower for calming effect
    utterance.pitch = 1.05; // Gentle pitch

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Toggle voice recognition
  const toggleListening = () => {
    if (!recognitionRef.current) {
      showToast('Speech recognition not supported in this browser. Please type below!', 'info');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Send message
  const handleSendMessage = (e, textOverride = null) => {
    if (e) e.preventDefault();
    const messageText = (textOverride || input).trim();
    if (!messageText) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageText,
      alias: anonymousMode ? userAlias : 'You',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Heuristic response generation with gentle human-like delay
    setTimeout(() => {
      const responseData = generateLocalAIResponse(messageText, chatMessages);
      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: responseData.text,
        groundingTip: responseData.groundingTip,
        followUp: responseData.followUp,
        isCrisis: responseData.isCrisis,
        suggestCounsellor: responseData.suggestCounsellor,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      if (voiceReply) {
        speakText(responseData.text);
      }
    }, 700);
  };

  const handleChipClick = (topicText) => {
    handleSendMessage(null, topicText);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6 animate-fade-in space-y-4">
      
      {/* Top Banner / Disclaimer */}
      <div className="p-4 rounded-3xl bg-teal-50 border border-teal-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-700 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">CircleBot Positive AI Listener</h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[11px] font-semibold text-emerald-700">Online & Confidential</span>
            </div>
            <p className="text-xs text-slate-600">
              Identity shielded as: <strong className="font-mono text-teal-800">{userAlias}</strong> • 100% Client-Side Engine
            </p>
          </div>
        </div>

        {/* Right Tools: Voice Reply Toggle & Breathing Tool */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setModalState({ type: 'breathing', data: null })}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-teal-200 text-teal-800 hover:bg-teal-100/60 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Wind className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
            <span>Breathing Tool</span>
          </button>

          <button
            onClick={() => {
              if (isSpeaking) stopSpeaking();
              setVoiceReply(!voiceReply);
              showToast(
                !voiceReply ? 'Voice Replies Enabled (Bot will speak aloud)' : 'Voice Replies Muted',
                'info'
              );
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              voiceReply
                ? 'bg-amber-500 text-slate-900 border-amber-500 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="Read bot replies aloud using browser speech synthesis"
          >
            {voiceReply ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>Voice Voice {voiceReply ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={clearChat}
            title="Clear Chat History"
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Chat Box Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft-lg flex flex-col h-[650px] overflow-hidden">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 bg-[#FAF9F6]/40">
          
          {chatMessages.map((msg) => {
            const isBot = msg.sender === 'bot';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isBot ? 'items-start' : 'items-end justify-end'}`}
              >
                {/* Bot Avatar */}
                {isBot && (
                  <div className="w-8 h-8 rounded-2xl bg-teal-700 text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-1">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                  </div>
                )}

                {/* Message Bubble Container */}
                <div className={`max-w-[85%] sm:max-w-[75%] space-y-2`}>
                  
                  {/* Bubble */}
                  <div
                    className={`p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
                      isBot
                        ? 'bg-white border border-teal-100 text-slate-800 rounded-tl-sm'
                        : 'bg-teal-700 text-white rounded-br-sm'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Grounding Tip Pill (Bot Only) */}
                    {isBot && msg.groundingTip && (
                      <div className="mt-3 p-3 rounded-2xl bg-teal-50 border border-teal-200/80 text-xs text-teal-950 space-y-1">
                        <span className="font-bold text-teal-900 block flex items-center gap-1.5">
                          <Wind className="w-3.5 h-3.5 text-teal-700" />
                          Calming Micro-Practice:
                        </span>
                        <p className="text-slate-700 whitespace-pre-line">{msg.groundingTip}</p>
                      </div>
                    )}

                    {/* Follow-up question (Bot Only) */}
                    {isBot && msg.followUp && (
                      <p className="mt-3 text-xs font-semibold text-teal-800 border-t border-slate-100 pt-2.5">
                        💬 {msg.followUp}
                      </p>
                    )}
                  </div>

                  {/* Gentle Human Counsellor Hand-off Button inside Chat */}
                  {isBot && msg.suggestCounsellor && (
                    <div className="flex items-center gap-2 pl-1">
                      <button
                        onClick={() => setActiveTab('counsellors')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold transition-all shadow-sm group"
                      >
                        <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                        <span>Want to talk to a human? Book a free anonymous session</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  )}

                  {/* Timestamp & Alias */}
                  <div className={`text-[10px] text-slate-400 px-2 flex items-center gap-1 ${
                    isBot ? 'justify-start' : 'justify-end'
                  }`}>
                    <span>{isBot ? 'CircleBot' : (msg.alias || userAlias)}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>

                </div>

                {/* User Avatar */}
                {!isBot && (
                  <div className="w-8 h-8 rounded-2xl bg-amber-500 text-slate-900 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm mb-1">
                    {userAlias.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-2xl bg-teal-700 text-white flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                <span className="text-xs text-slate-500 ml-1 font-medium">Listening with care...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Mood-Starter Chips */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200/80 overflow-x-auto flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap pl-1">
            Tap to vent:
          </span>
          {[
            'Feeling homesick today',
            'Exam stress is too much',
            'Just need someone to talk to',
            'Can’t sleep, mind is racing',
            'Feel like I’m falling behind',
            'Overwhelmed with expectations'
          ].map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleChipClick(chip)}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:border-teal-400 hover:text-teal-800 hover:bg-teal-50/50 transition-all whitespace-nowrap shadow-xs"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar with Working Mic and Voice Features */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            
            {/* Microphone Button with Native Web Speech */}
            <button
              type="button"
              onClick={toggleListening}
              className={`p-3 rounded-2xl transition-all flex items-center justify-center relative ${
                isListening
                  ? 'bg-rose-500 text-white shadow-lg animate-pulse ring-4 ring-rose-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-700'
              }`}
              title={isListening ? 'Listening to your voice... (Click to stop)' : 'Click to speak to CircleBot (Web Speech API)'}
            >
              {isListening ? <Mic className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5" />}
              {isListening && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white animate-ping"></span>
              )}
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? 'Listening to your speech...' : 'Type anything you\'re feeling... no judgement, ever.'}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 focus:bg-white transition-all"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-3 rounded-2xl bg-teal-700 hover:bg-teal-800 disabled:opacity-40 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>

          </form>

          {isListening && (
            <p className="text-[11px] text-rose-600 font-semibold mt-2 text-center animate-pulse">
              🎙️ Speak clearly into your mic. Your voice stays 100% inside your browser.
            </p>
          )}
        </div>

      </div>

    </div>
  );
}
