import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Shield, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const HeroSection = ({ refs, onDemoLogin, onWatchVideo }) => {
  const { heroRef, headlineRef, subheadRef, ctaRef } = refs;

  return (
    <section ref={heroRef} className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-white border-b border-slate-200/80">
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2">
              <Badge variant="outline" className="px-5 py-1 rounded-full bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold shadow-sm hover:bg-emerald-100 transition-all duration-300">
                <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-ping" />
                Enterprise Lead Management CRM v2.0
              </Badge>
            </div>

            <h1 ref={headlineRef} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08] font-heading">
              Turn inbound leads into closed deals{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
                3x faster.
              </span>
            </h1>

            <p ref={subheadRef} className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
              HEROES delivers SLA countdown tracking, role-based pipeline governance, and immutable activity logs — built for modern sales teams who value speed and execution.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-500/25">
                  Start Free Demo
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" onClick={onWatchVideo}
                className="w-full sm:w-auto gap-2 text-base px-6 py-3.5 font-bold border-slate-300 text-slate-700 hover:bg-slate-50">
                <Play className="w-4 h-4 fill-slate-700 text-slate-700" />
                Watch Demo
              </Button>
            </div>

            <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Instant Demo Exploration:</span>
              <Button variant="secondary" size="sm" onClick={() => onDemoLogin('ADMIN')}
                className="text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/80 gap-1.5">
                <Shield className="w-3.5 h-3.5" />1-Click Admin Demo
              </Button>
              <Button variant="secondary" size="sm" onClick={() => onDemoLogin('MEMBER')}
                className="text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 gap-1.5">
                <Users className="w-3.5 h-3.5" />1-Click Sales Rep Demo
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 group">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="High performing sales team meeting in modern office"
                className="w-full h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-lg space-y-2 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-500 animate-pulse" />
                    Active 24h SLA Monitor
                  </span>
                  <Badge variant="outline" className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold shadow-sm hover:bg-emerald-100 transition-all duration-300">
                    ON TRACK
                  </Badge>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  Acme Corp Enterprise Lead assigned to Rep Sarah Jenkins. 18h 42m remaining.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
