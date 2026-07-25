import React from 'react';
import { Badge } from '@/components/ui/badge';

const STEPS = [
  { step: '01', title: 'Capture', subtitle: 'Inbound API & Forms', desc: 'Leads arrive automatically via public form endpoints or manual entry with instant SLA timestamps.', img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600&q=80' },
  { step: '02', title: 'Assign & Track', subtitle: 'Role & SLA Governance', desc: 'Smart routing assigns leads to reps with SLA timers counting down to guarantee fast response.', img: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=600&q=80' },
  { step: '03', title: 'Close & Audit', subtitle: 'Conversion & Logs', desc: 'Move deals through Kanban stages with immutable logs capturing every decision to won status.', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80' },
];

export const WorkflowSection = ({ refs }) => {
  const { workflowRef } = refs;

  return (
    <section id="workflow" ref={workflowRef} className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="outline" className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold shadow-sm hover:bg-emerald-100 transition-all duration-300">
            3-Step Workflow
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            From lead capture to closed won in 3 steps
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((s, idx) => (
            <div key={idx} className="workflow-step bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="h-48 overflow-hidden relative">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                <span className="absolute top-4 left-4 bg-emerald-600 text-white font-mono font-black text-xs px-3 py-1 rounded-lg">
                  STEP {s.step}
                </span>
              </div>
              <div className="p-6 space-y-2 text-left">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{s.subtitle}</span>
                <h3 className="text-2xl font-bold text-slate-900 font-heading">{s.title}</h3>
                <p className="text-sm text-slate-600">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
