import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Zap, Users, BarChart3, CheckCircle2, Clock, Shield, FileText,
  Activity, Play, X, TrendingUp, Award, Sparkles, ChevronRight, ShieldCheck, Headphones, Briefcase
} from 'lucide-react';
import { Navbar } from '../../../components/common/Navbar.jsx';
import { Footer } from '../../../components/common/Footer.jsx';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useLandingAnimations } from '../hooks/useLandingAnimations.js';
import { useDemoLogin } from '../hooks/useDemoLogin.js';

export const LandingPage = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const {
    heroRef, headlineRef, subheadRef, ctaRef, showcaseRef,
    floatingCard1Ref, floatingCard2Ref, floatingCard3Ref,
    featuresRef, workflowRef, testimonialsRef,
  } = useLandingAnimations();
  const { handleDemoLogin } = useDemoLogin();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      <Navbar />

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

                <Button
                  variant="outline" size="lg"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="w-full sm:w-auto gap-2 text-base px-6 py-3.5 font-bold border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  <Play className="w-4 h-4 fill-slate-700 text-slate-700" />
                  Watch Demo
                </Button>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Instant Demo Exploration:</span>
                <Button variant="secondary" size="sm" onClick={() => handleDemoLogin('ADMIN')}
                  className="text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/80 gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  1-Click Admin Demo
                </Button>
                <Button variant="secondary" size="sm" onClick={() => handleDemoLogin('MEMBER')}
                  className="text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  1-Click Sales Rep Demo
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 group">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                  alt="High performing sales team meeting in modern office"
                  className="w-full h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
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

      <section className="py-10 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <p className="text-center text-xs font-bold tracking-widest text-slate-400 uppercase">
            Trusted by 500+ Agile B2B Sales & Growth Teams
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center opacity-70 hover:opacity-100 transition-all">
            <div className="text-center font-black text-xl tracking-tighter text-slate-300 font-heading">VELOCITY.IO</div>
            <div className="text-center font-black text-xl tracking-tighter text-slate-300 font-heading">SCALE_STACK</div>
            <div className="text-center font-black text-xl tracking-tighter text-slate-300 font-heading">CLOUD_HERO</div>
            <div className="text-center font-black text-xl tracking-tighter text-slate-300 font-heading">NEXTGEN_CRM</div>
          </div>
          <div className="pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/60">
              <div className="text-3xl font-black text-emerald-400 font-mono">24hr</div>
              <div className="text-xs font-semibold text-slate-300 mt-1">Avg. Guaranteed SLA Response</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/60">
              <div className="text-3xl font-black text-teal-400 font-mono">3x</div>
              <div className="text-xs font-semibold text-slate-300 mt-1">Faster Lead Assignment & Routing</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/60">
              <div className="text-3xl font-black text-emerald-400 font-mono">99.9%</div>
              <div className="text-xs font-semibold text-slate-300 mt-1">Pipeline Audit Uptime</div>
            </div>
          </div>
        </div>
      </section>

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
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80"
                  alt="HEROES Analytics and Pipeline Dashboard Screen"
                  className="w-full h-[480px] object-cover object-top opacity-95"
                />
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
                <Clock className="w-4 h-4 text-amber-600" />
                2h SLA Breach Alert
              </div>
              <p className="text-xs text-slate-700 font-medium">
                Lead "Global Logistics Inc." requires immediate rep touch.
              </p>
            </div>

            <div ref={floatingCard3Ref}
              className="absolute -bottom-6 left-1/4 hidden md:block bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl max-w-sm text-left space-y-2 z-20">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> Immutable Audit Log
                </span>
                <span>Just now</span>
              </div>
              <p className="text-xs text-slate-800 font-semibold">
                Status changed to "Proposal Sent" by Admin User.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" ref={featuresRef} className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="outline" className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold shadow-sm hover:bg-emerald-100 transition-all duration-300">
              Core Capabilities
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              Everything your revenue team needs to execute
            </h2>
            <p className="text-slate-600 text-base">
              Built ground-up for high-velocity sales orgs requiring strict accountability and instant insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: 'Automatic 24-Hour SLA Tracking', desc: 'Every new lead gets an automatic 24h countdown. Color-shifting badges warn your team before breaches occur.', color: 'text-amber-600 bg-amber-50 border-amber-200' },
              { icon: Shield, title: 'Role-Based Access (RBAC)', desc: 'Grant Admin full user management & deletion rights while restricting Members to pipeline execution and note adding.', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
              { icon: FileText, title: 'Immutable Activity Audit Log', desc: 'Every status shift, rep reassignment, and note is permanently recorded for 100% team accountability.', color: 'text-teal-700 bg-teal-50 border-teal-200' },
              { icon: Sparkles, title: 'Public Lead Capture API', desc: 'Embed public inbound form endpoints anywhere with zero auth required. Leads route straight into your pipeline.', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
              { icon: BarChart3, title: 'Real-Time Pipeline Analytics', desc: 'Monitor stage distribution, pipeline dollar value, conversion metrics, and rep performance live.', color: 'text-teal-700 bg-teal-50 border-teal-200' },
              { icon: Zap, title: 'Unified Toast System', desc: 'Instant micro-feedback and notifications for every lead update, role change, or reassignment.', color: 'text-amber-600 bg-amber-50 border-amber-200' },
            ].map((f, idx) => {
              const Icon = f.icon;
              return (
                <Card key={idx} className="feature-card border-slate-200 bg-white hover:shadow-lg transition-all space-y-4 p-6 rounded-2xl">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${f.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">{f.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

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
            {[
              { step: '01', title: 'Capture', subtitle: 'Inbound API & Forms', desc: 'Leads arrive automatically via public form endpoints or manual entry with instant SLA timestamps.', img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600&q=80' },
              { step: '02', title: 'Assign & Track', subtitle: 'Role & SLA Governance', desc: 'Smart routing assigns leads to reps with SLA timers counting down to guarantee fast response.', img: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=600&q=80' },
              { step: '03', title: 'Close & Audit', subtitle: 'Conversion & Logs', desc: 'Move deals through Kanban stages with immutable logs capturing every decision to won status.', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80' },
            ].map((s, idx) => (
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

      <section id="testimonials" ref={testimonialsRef} className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="outline" className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold shadow-sm hover:bg-emerald-100 transition-all duration-300">
              Customer Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              Loved by VP Sales & Revenue Ops Leaders
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: "HEROES SLA countdown changed our response time overnight. We reduced our first contact delay from 14 hours down to under 35 minutes.", name: "Marcus Vance", role: "VP of Global Sales, Velocity Scale", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
              { quote: "The role-based access and immutable audit trail solved our compliance headache completely. Every note and status change is logged cleanly.", name: "Elena Rostova", role: "Head of Revenue Operations, Cloud Hero", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
              { quote: "Simple, fast, and data-forward. My sales reps love the Kanban board while I get total executive visibility over pipeline conversion rates.", name: "David Kim", role: "Chief Commercial Officer, NextGen SaaS", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
            ].map((t, idx) => (
              <Card key={idx} className="testimonial-card p-6 border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-6 text-left rounded-2xl">
                <p className="text-sm text-slate-700 leading-relaxed font-medium italic">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <img src={t.img} alt={t.name} className="w-11 h-11 rounded-full object-cover border border-emerald-200" />
                  <div>
                    <div className="font-bold text-sm text-slate-900 font-heading">{t.name}</div>
                    <div className="text-xs text-slate-500 font-medium">{t.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-heading">
            Ready to accelerate your lead pipeline response?
          </h2>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto font-medium">
            Join hundreds of agile revenue teams closing more deals with HEROES CRM today.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="px-8 py-4 bg-white text-emerald-800 hover:bg-slate-100 font-black text-base shadow-xl">
                Start Free Demo Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" onClick={() => handleDemoLogin('ADMIN')}
              className="px-8 py-4 border-white text-white hover:bg-white/10 font-bold text-base">
              1-Click Admin Demo
            </Button>
          </div>
        </div>
      </section>

      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 space-y-4 border border-slate-200 shadow-2xl relative">
            <button onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-slate-900 font-heading">HEROES Product Tour Demo</h3>
            <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center text-white">
              <div className="text-center space-y-3 p-6">
                <Play className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
                <p className="font-bold text-lg">Interactive CRM Demo Active</p>
                <p className="text-xs text-slate-400">Click below to enter the live interactive environment instantly.</p>
                <Button onClick={() => handleDemoLogin('ADMIN')} className="bg-emerald-600 text-white font-bold">
                  Launch Interactive Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
