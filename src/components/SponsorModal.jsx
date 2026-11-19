import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, HeartHandshake, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

export default function SponsorModal() {
  const { modalState, setModalState, addSponsor } = useApp();
  const isOpen = modalState.type === 'sponsorModal';

  const [formData, setFormData] = useState({
    name: '',
    tier: 'Campus Supporter',
    sessionsFunded: 40,
    tagline: 'Committed to student mental health and community wellbeing.',
    perk: 'Logo on OpenCircle wall + recognition across campus circles'
  });

  if (!isOpen) return null;

  const tiers = [
    { sessions: 15, cost: '₹4,500', name: 'Micro Supporter', desc: 'Funds 15 full anonymous sessions' },
    { sessions: 40, cost: '₹12,000', name: 'Campus Supporter', desc: 'Funds 40 sessions + circle tea tokens' },
    { sessions: 100, cost: '₹30,000', name: 'Lead Impact Partner', desc: 'Directly subsidizes a counsellor cohort' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    addSponsor({
      name: formData.name,
      tier: formData.tier,
      sessionsFunded: formData.sessionsFunded,
      tagline: formData.tagline,
      perk: formData.perk
    });

    setModalState({ type: null, data: null });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF9F6] w-full max-w-lg rounded-3xl p-4 sm:p-7 shadow-2xl border border-teal-100 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-1.5 text-teal-700 font-bold text-xs uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4" />
              <span>Ethical CSR & Brand Partnership</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">Sponsor Student Sessions</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              100% of your pledge directly funds verified youth counsellors. Zero administrative cut.
            </p>
          </div>
          <button
            onClick={() => setModalState({ type: null, data: null })}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Brand / Organization Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. BlueTokai Cafe / StudentBrand Co."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Sponsorship Tier
            </label>
            <div className="space-y-2">
              {tiers.map((t) => {
                const isSelected = formData.sessionsFunded === t.sessions;
                return (
                  <button
                    key={t.sessions}
                    type="button"
                    onClick={() => setFormData({ ...formData, sessionsFunded: t.sessions, tier: t.name })}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-teal-50 border-teal-600 text-teal-950 ring-2 ring-teal-600/20'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold">{t.name} ({t.sessions} Sessions)</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{t.desc}</p>
                    </div>
                    <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2.5 py-1 rounded-lg">
                      {t.cost}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Short Brand Message / Tagline
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="e.g. Fueling honest student conversations"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              Transparent Ledger & Brand Visibility
            </p>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Your logo is instantly showcased on the Sponsors Wall and credited to students during their booking confirmation.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setModalState({ type: null, data: null })}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Record Sponsor Pledge</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
