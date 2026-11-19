import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Award, ShieldCheck, CheckCircle2, FileText, HeartHandshake } from 'lucide-react';

export default function ApplyCounsellorModal() {
  const { modalState, setModalState, addCounsellor } = useApp();
  const isOpen = modalState.type === 'applyCounsellor';

  const [formData, setFormData] = useState({
    name: '',
    title: 'Youth Counsellor & Mental Health Fellow',
    qualification: '',
    specialty: 'Academic & General Stress',
    specialtyCategory: 'academic',
    availableDays: 'Mon, Wed, Fri (4-8 PM)',
    bio: '',
    agreedToContract: false
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.qualification) return;
    if (!formData.agreedToContract) return;

    addCounsellor({
      name: formData.name,
      title: formData.title,
      qualification: formData.qualification,
      specialty: formData.specialty,
      specialtyCategory: formData.specialtyCategory,
      availableDays: formData.availableDays,
      bio: formData.bio || 'Compassionate listener committed to zero-rupee mental wellness support for campus students.',
      verifiedSessions: 0
    });

    setModalState({ type: null, data: null });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF9F6] w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-teal-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-1.5 text-teal-700 font-bold text-xs uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4" />
              <span>Join Counsellor Cohort</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">OpenCircle Impact Contract</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Empowering psychologists, postgrads & trained listeners with tracked transparent payouts.
            </p>
          </div>
          <button
            onClick={() => setModalState({ type: null, data: null })}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Impact Contract Explanation Box */}
        <div className="my-4 p-4 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-950 space-y-2">
          <p className="font-bold flex items-center gap-1.5 text-teal-900">
            <FileText className="w-4 h-4 text-teal-700" />
            How OpenCircle Impact Contract Works:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-700">
            <li>You start as an onboarded Fellow under our OpenCircle Impact Charter.</li>
            <li>Every session you take with a student is logged transparently on-chain/ledger.</li>
            <li>Sponsor funds are pooled and disbursed on a <strong>per-verified-session rate</strong> (currently ₹300/session).</li>
            <li>Zero administrative cut — 100% of allocated session sponsorship goes to the counsellor.</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Dr. Tanvi Rao or Aranya Sen"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Highest Qualification / Degree *
              </label>
              <input
                type="text"
                required
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                placeholder="e.g. M.Sc Counselling / MA Psychology"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Primary Specialty Focus
              </label>
              <select
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30"
              >
                <option value="Academic & Exam Stress">Academic & Exam Stress</option>
                <option value="Homesickness & Campus Transition">Homesickness & Transition</option>
                <option value="Anxiety & Burnout">Anxiety & Burnout</option>
                <option value="General Active Listening">General Active Listening</option>
                <option value="Relationship & Identity Venting">Relationship & Identity</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Available Hours / Days
            </label>
            <input
              type="text"
              value={formData.availableDays}
              onChange={(e) => setFormData({ ...formData, availableDays: e.target.value })}
              placeholder="e.g. Evenings 5-8 PM or Weekends"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Brief Intro / Approach for Students
            </label>
            <textarea
              rows={2}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell students about your gentle approach, listening style, or what they can expect..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 bg-white"
            />
          </div>

          {/* Contract Checkbox */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-300/60 flex items-start gap-3">
            <input
              type="checkbox"
              id="contractAgree"
              required
              checked={formData.agreedToContract}
              onChange={(e) => setFormData({ ...formData, agreedToContract: e.target.checked })}
              className="mt-0.5 w-4 h-4 text-teal-700 rounded border-slate-300 focus:ring-teal-600"
            />
            <label htmlFor="contractAgree" className="text-xs text-slate-800 cursor-pointer">
              <span className="font-bold text-slate-900 block">
                I agree to the OpenCircle Impact Contract & Zero-Judgement Ethics
              </span>
              <span className="text-[11px] text-slate-600 block mt-0.5">
                I confirm that I will never charge students any fee directly and will honor confidentiality and anonymous user aliases.
              </span>
            </label>
          </div>

          {/* Submit */}
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
              disabled={!formData.agreedToContract}
              className="flex-1 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit & Join Directory</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
