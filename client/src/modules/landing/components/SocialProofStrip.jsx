import React from 'react';

const COMPANIES = ['VELOCITY.IO', 'SCALE_STACK', 'CLOUD_HERO', 'NEXTGEN_CRM'];
const STATS = [
  { value: '24hr', label: 'Avg. Guaranteed SLA Response', color: 'text-emerald-400' },
  { value: '3x', label: 'Faster Lead Assignment & Routing', color: 'text-teal-400' },
  { value: '99.9%', label: 'Pipeline Audit Uptime', color: 'text-emerald-400' },
];

export const SocialProofStrip = () => (
  <section className="py-10 bg-slate-900 text-white border-b border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <p className="text-center text-xs font-bold tracking-widest text-slate-400 uppercase">
        Trusted by 500+ Agile B2B Sales & Growth Teams
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center opacity-70 hover:opacity-100 transition-all">
        {COMPANIES.map((name) => (
          <div key={name} className="text-center font-black text-xl tracking-tighter text-slate-300 font-heading">{name}</div>
        ))}
      </div>
      <div className="pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {STATS.map((s) => (
          <div key={s.label} className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/60">
            <div className={`text-3xl font-black ${s.color} font-mono`}>{s.value}</div>
            <div className="text-xs font-semibold text-slate-300 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
