import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, FileText } from 'lucide-react';

export const ProductShowcase = ({ refs }) => {
  const { showcaseRef, floatingCard1Ref, floatingCard2Ref, floatingCard3Ref } = refs;

  return (
    <section id="product" ref={showcaseRef} className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <Badge variant="outline" className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold shadow-sm hover:bg-emerald-100 transition-all duration-300">
            Product Overview
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Designed for high-density pipeline governance
          </h2>
          <p className="text-slate-600 text-base">
            Say goodbye to lost leads and unassigned prospects. HEROES provides complete visual control over lead state, assignment rules, and SLA deadlines.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="rounded-3xl border border-slate-300 shadow-2xl overflow-hidden bg-white p-2">
            <div className="bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden relative">
              <div className="h-10 bg-slate-200/80 px-4 flex items-center justify-between border-b border-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[11px] font-mono font-bold text-slate-600">app.heroes-crm.io/dashboard</span>
                <div className="w-12" />
              </div>
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80"
                alt="HEROES Analytics and Pipeline Dashboard Screen"
                className="w-full h-[480px] object-cover object-top opacity-95" />
            </div>
          </div>

          <div ref={floatingCard1Ref}
            className="absolute -top-6 -left-6 hidden md:block bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl max-w-xs text-left space-y-2 z-20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Pipeline Revenue</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black font-mono text-slate-900">$482,500</div>
            <div className="text-[11px] text-slate-500 font-medium">+24.5% vs last month</div>
          </div>

          <div ref={floatingCard2Ref}
            className="absolute top-1/3 -right-8 hidden md:block bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl max-w-xs text-left space-y-2 z-20">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              <Clock className="w-4 h-4 text-amber-600" />2h SLA Breach Alert
            </div>
            <p className="text-xs text-slate-700 font-medium">Lead &ldquo;Global Logistics Inc.&rdquo; requires immediate rep touch.</p>
          </div>

          <div ref={floatingCard3Ref}
            className="absolute -bottom-6 left-1/4 hidden md:block bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl max-w-sm text-left space-y-2 z-20">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" /> Immutable Audit Log
              </span>
              <span>Just now</span>
            </div>
            <p className="text-xs text-slate-800 font-semibold">Status changed to &ldquo;Proposal Sent&rdquo; by Admin User.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
