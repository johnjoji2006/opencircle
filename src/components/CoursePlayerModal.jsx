import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Play,
  Pause,
  CheckCircle2,
  Award,
  BookOpen,
  HelpCircle,
  Sparkles,
  Volume2,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';

export default function CoursePlayerModal() {
  const {
    modalState,
    setModalState,
    completedCourses,
    toggleCourseCompleted,
    userAlias
  } = useApp();

  const isOpen = modalState.type === 'coursePlayer';
  const course = modalState.data;

  const [activeTab, setActiveTab] = useState('lessons'); // 'lessons' | 'dos' | 'quiz'
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(35);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);

  React.useEffect(() => {
    setSelectedAnswer(null);
    setIsPlaying(false);
    setVideoProgress(30);
    setShowCertificate(false);
  }, [course]);

  if (!isOpen || !course) return null;

  const isCompleted = completedCourses.includes(course.id);
  const allCompleted = completedCourses.length === 4;

  const handleQuizSelect = (idx) => {
    setSelectedAnswer(idx);
  };

  const handleToggleComplete = () => {
    toggleCourseCompleted(course.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF9F6] w-full max-w-2xl rounded-3xl p-4 sm:p-7 shadow-2xl border border-teal-100 max-h-[92vh] overflow-y-auto">
        
        {/* Certificate View */}
        {showCertificate ? (
          <div className="text-center py-4 sm:py-6 space-y-4 sm:space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-teal-50 via-white to-amber-50/40 border-4 border-double border-teal-700/30 shadow-xl relative overflow-hidden">
              <div className="absolute top-3 right-3 text-amber-500">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
              </div>

              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-teal-700 text-white flex items-center justify-center shadow-md mb-3">
                <Award className="w-7 h-7 sm:w-8 sm:h-8 text-amber-300" />
              </div>

              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-teal-800 bg-teal-100 px-3 py-1 rounded-full">
                OpenCircle Academy Certificate
              </span>

              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2 sm:mt-3 font-sans">
                Certified Peer Listener
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">This honorary certification is awarded to</p>

              <p className="text-xl sm:text-2xl font-bold font-mono text-teal-800 my-2">
                {userAlias}
              </p>

              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                For demonstrating empathetic active listening, crisis safety boundaries, non-judgemental space holding, and positive community peer support.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-between pt-5 mt-5 border-t border-slate-200 text-[10px] sm:text-[11px] text-slate-400 gap-1.5">
                <span>Verification: OC-VOL-{Math.floor(100000 + Math.random() * 900000)}</span>
                <span className="font-semibold text-teal-700">OpenCircle Community Initiative</span>
                <span>Issued: {new Date().toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3">
              <button
                onClick={() => setShowCertificate(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Back to Lesson
              </button>
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <span>Print / Save Badge</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div className="min-w-0 pr-2">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full">
                    {course.tag}
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
                    {course.duration}
                  </span>
                  {isCompleted && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 flex-shrink-0" /> Completed
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-xl font-bold text-slate-900 mt-1 leading-snug">{course.title}</h3>
              </div>
              <button
                onClick={() => setModalState({ type: null, data: null })}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Simulation */}
            <div className="relative my-3 sm:my-4 rounded-2xl overflow-hidden bg-slate-950 aspect-video shadow-lg group">
              <img
                src={course.videoThumbnail}
                alt={course.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isPlaying ? 'opacity-40' : 'opacity-75'
                }`}
              />

              {/* Play Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-teal-600/90 hover:bg-teal-500 text-white flex items-center justify-center shadow-xl backdrop-blur-sm transition-all transform hover:scale-105"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 sm:w-7 sm:h-7" />
                  ) : (
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 translate-x-0.5 fill-white" />
                  )}
                </button>
              </div>

              {/* Bottom Video Controls Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5 sm:p-3 flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-teal-300">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <span className="font-mono text-[10px] sm:text-[11px] text-slate-300">
                    {isPlaying ? '02:45' : '00:00'} / {course.duration}
                  </span>
                </div>

                {/* Progress bar scrubber */}
                <div className="flex-1 mx-2 sm:mx-4">
                  <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer">
                    <div
                      className="bg-amber-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${isPlaying ? 65 : videoProgress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="hidden xs:flex items-center gap-1.5 text-slate-300 flex-shrink-0">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase font-bold text-teal-300">HD</span>
                </div>
              </div>
            </div>

            {/* Sub-tab Navigation inside Course */}
            <div className="flex p-1 bg-slate-200/60 rounded-2xl mb-3 sm:mb-4">
              <button
                onClick={() => setActiveTab('lessons')}
                className={`flex-1 py-1.5 rounded-xl text-[10px] sm:text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                  activeTab === 'lessons'
                    ? 'bg-white text-teal-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">Core Concept ({course.lessons.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('dos')}
                className={`flex-1 py-1.5 rounded-xl text-[10px] sm:text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                  activeTab === 'dos'
                    ? 'bg-white text-teal-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">Do's & Don'ts</span>
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex-1 py-1.5 rounded-xl text-[10px] sm:text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                  activeTab === 'quiz'
                    ? 'bg-white text-teal-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">Scenario Quiz</span>
              </button>
            </div>

            {/* Tab 1: Lessons */}
            {activeTab === 'lessons' && (
              <div className="space-y-2.5 sm:space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed italic bg-teal-50/60 p-3 rounded-xl border border-teal-100">
                  "{course.summary}"
                </p>
                {course.lessons.map((lesson, idx) => (
                  <div key={idx} className="p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                    <h5 className="text-xs font-bold text-teal-900 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 text-[10px] flex items-center justify-center font-bold flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span>{lesson.title}</span>
                    </h5>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed pl-7">
                      {lesson.content}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Do's and Don'ts */}
            {activeTab === 'dos' && (
              <div className="space-y-2 sm:space-y-2.5">
                {course.dosAndDonts.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                      <span className="font-bold text-emerald-800 flex items-center gap-1 mb-1">
                        ✅ DO THIS:
                      </span>
                      <p className="leading-snug text-slate-700">{item.do}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950">
                      <span className="font-bold text-rose-800 flex items-center gap-1 mb-1">
                        ❌ AVOID THIS:
                      </span>
                      <p className="leading-snug text-slate-700">{item.dont}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Interactive Practice Scenario */}
            {activeTab === 'quiz' && (
              <div className="space-y-3 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200">
                <p className="text-xs font-bold text-slate-900 leading-snug">
                  Scenario: {course.quiz.question}
                </p>

                <div className="space-y-2 pt-1">
                  {course.quiz.options.map((opt, idx) => {
                    const isChosen = selectedAnswer === idx;
                    const isCorrect = idx === course.quiz.correctIndex;
                    let style = 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300';

                    if (selectedAnswer !== null) {
                      if (isCorrect) {
                        style = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-500';
                      } else if (isChosen && !isCorrect) {
                        style = 'border-rose-400 bg-rose-50 text-rose-900 ring-1 ring-rose-400';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleQuizSelect(idx)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs leading-snug transition-all flex items-start gap-2 ${style}`}
                      >
                        <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {selectedAnswer !== null && (
                  <div className={`p-3 rounded-xl text-xs leading-relaxed mt-2 ${
                    selectedAnswer === course.quiz.correctIndex
                      ? 'bg-emerald-100/70 text-emerald-900 border border-emerald-200'
                      : 'bg-amber-100/70 text-amber-900 border border-amber-200'
                  }`}>
                    <strong>{selectedAnswer === course.quiz.correctIndex ? 'Spot on! 🎉' : 'Gentle note:'}</strong>{' '}
                    {course.quiz.explanation}
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 mt-4 border-t border-slate-200">
              <div className="text-xs text-slate-500">
                {completedCourses.length} of 4 Modules Completed
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {allCompleted && (
                  <button
                    onClick={() => setShowCertificate(true)}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <Award className="w-4 h-4 flex-shrink-0" />
                    <span>View Certificate</span>
                  </button>
                )}

                <button
                  onClick={handleToggleComplete}
                  className={`flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300'
                      : 'bg-teal-700 hover:bg-teal-800 text-white shadow-sm'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{isCompleted ? 'Completed (Tap to undo)' : 'Mark as Completed'}</span>
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
