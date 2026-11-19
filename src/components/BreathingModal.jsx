import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function BreathingModal() {
  const { modalState, setModalState } = useApp();
  const isOpen = modalState.type === 'breathing';

  const [pattern, setPattern] = useState('478'); // '478' | 'box'
  const [phase, setPhase] = useState('Inhale'); // 'Inhale' | 'Hold' | 'Exhale' | 'Rest'
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [isRunning, setIsRunning] = useState(true);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Play gentle web audio chime
  const playChime = (freq = 440) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch (e) {
      // AudioContext may require user gesture
    }
  };

  useEffect(() => {
    if (!isOpen || !isRunning) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Phase transitions
        if (pattern === '478') {
          if (phase === 'Inhale') {
            setPhase('Hold');
            playChime(523.25); // C5
            return 7;
          } else if (phase === 'Hold') {
            setPhase('Exhale');
            playChime(392.00); // G4
            return 8;
          } else {
            setPhase('Inhale');
            setCyclesCompleted(c => c + 1);
            playChime(440.00); // A4
            return 4;
          }
        } else {
          // Box 4-4-4-4
          if (phase === 'Inhale') {
            setPhase('Hold');
            playChime(523.25);
            return 4;
          } else if (phase === 'Hold') {
            setPhase('Exhale');
            playChime(392.00);
            return 4;
          } else if (phase === 'Exhale') {
            setPhase('Rest');
            playChime(349.23);
            return 4;
          } else {
            setPhase('Inhale');
            setCyclesCompleted(c => c + 1);
            playChime(440.00);
            return 4;
          }
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isRunning, phase, pattern, soundEnabled]);

  if (!isOpen) return null;

  // Visual size based on phase
  let scaleClass = 'scale-100';
  let phaseColor = 'bg-teal-500/20 text-teal-800 border-teal-300';
  let instruction = 'Breathe in slowly through your nose...';

  if (phase === 'Inhale') {
    scaleClass = 'scale-125 transition-transform duration-[4000ms] ease-out';
    phaseColor = 'bg-teal-100 text-teal-900 border-teal-300';
    instruction = 'Fill your lungs gently with calm...';
  } else if (phase === 'Hold') {
    scaleClass = 'scale-125 transition-transform duration-1000';
    phaseColor = 'bg-amber-100 text-amber-900 border-amber-300';
    instruction = 'Gently suspend your breath, stay still...';
  } else if (phase === 'Exhale') {
    scaleClass = 'scale-90 transition-transform duration-[8000ms] ease-in-out';
    phaseColor = 'bg-emerald-100 text-emerald-900 border-emerald-300';
    instruction = 'Release all tension out through your mouth...';
  } else if (phase === 'Rest') {
    scaleClass = 'scale-90 transition-transform duration-[4000ms]';
    phaseColor = 'bg-slate-100 text-slate-800 border-slate-300';
    instruction = 'Rest in the quiet stillness...';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF9F6] w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-teal-100 relative overflow-hidden">
        
        {/* Background gradient orb */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal-200/40 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-amber-200/40 rounded-full blur-2xl pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-teal-100 text-teal-800 rounded-lg">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="text-xl font-bold text-slate-900">Guided Nervous System Reset</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Slow breathing lowers cortisol and heart rate in 90 seconds</p>
          </div>
          <button
            onClick={() => setModalState({ type: null, data: null })}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pattern Switcher */}
        <div className="flex p-1 bg-slate-200/60 rounded-2xl mb-8 relative z-10">
          <button
            onClick={() => {
              setPattern('478');
              setPhase('Inhale');
              setSecondsLeft(4);
            }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              pattern === '478'
                ? 'bg-white text-teal-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            4-7-8 Deep Sleep / Panic
          </button>
          <button
            onClick={() => {
              setPattern('box');
              setPhase('Inhale');
              setSecondsLeft(4);
            }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              pattern === 'box'
                ? 'bg-white text-teal-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Box Breathing 4-4-4-4
          </button>
        </div>

        {/* Breathing Circle Visualization */}
        <div className="h-64 flex items-center justify-center relative my-4">
          {/* Animated pulse halo */}
          <div className={`absolute w-56 h-56 rounded-full border border-teal-200/80 bg-teal-50/50 ${scaleClass}`}></div>
          
          {/* Main animated orb */}
          <div
            className={`w-44 h-44 rounded-full flex flex-col items-center justify-center shadow-lg border-2 z-10 ${scaleClass} ${phaseColor}`}
          >
            <span className="text-xs font-bold uppercase tracking-wider opacity-80">
              {phase}
            </span>
            <span className="text-4xl font-extrabold font-mono my-1">
              {secondsLeft}s
            </span>
            <span className="text-[11px] font-medium opacity-70">
              Cycle #{cyclesCompleted + 1}
            </span>
          </div>
        </div>

        {/* Instruction Text */}
        <p className="text-center text-sm font-semibold text-slate-700 min-h-[2.5rem] flex items-center justify-center mb-6 px-4">
          {instruction}
        </p>

        {/* Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 relative z-10">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
              soundEnabled
                ? 'bg-teal-50 text-teal-800 border-teal-200'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>Chimes {soundEnabled ? 'ON' : 'OFF'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setPhase('Inhale');
                setSecondsLeft(4);
                setCyclesCompleted(0);
              }}
              title="Reset"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 shadow-md transition-all"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isRunning ? 'Pause' : 'Resume'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
