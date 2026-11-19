import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm sm:max-w-md w-full pointer-events-none">
      {toasts.map(toast => {
        let icon = <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0" />;
        let borderClass = 'border-teal-200 bg-teal-50/95';
        let titleColor = 'text-teal-900';

        if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-sky-600 flex-shrink-0" />;
          borderClass = 'border-sky-200 bg-sky-50/95';
          titleColor = 'text-sky-900';
        } else if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />;
          borderClass = 'border-rose-200 bg-rose-50/95';
          titleColor = 'text-rose-900';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 animate-slide-up ${borderClass}`}
          >
            <div className="mt-0.5">{icon}</div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold leading-tight ${titleColor}`}>
                {toast.message}
              </p>
              {toast.subtitle && (
                <p className="text-xs text-slate-600 mt-1 leading-snug">
                  {toast.subtitle}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
