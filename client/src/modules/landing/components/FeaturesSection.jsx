import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Clock, Shield, FileText, Sparkles, BarChart3, Zap } from 'lucide-react';

const FEATURES = [
  { icon: Clock, title: 'Automatic 24-Hour SLA Tracking', desc: 'Every new lead gets an automatic 24h countdown. Color-shifting badges warn your team before breaches occur.', color: 'text-amber-600 bg-amber-50 border-amber-200' },
  { icon: Shield, title: 'Role-Based Access (RBAC)', desc: 'Grant Admin full user management & deletion rights while restricting Members to pipeline execution and note adding.', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  { icon: FileText, title: 'Immutable Activity Audit Log', desc: 'Every status shift, rep reassignment, and note is permanently recorded for 100% team accountability.', color: 'text-teal-700 bg-teal-50 border-teal-200' },
  { icon: Sparkles, title: 'Public Lead Capture API', desc: 'Embed public inbound form endpoints anywhere with zero auth required. Leads route straight into your pipeline.', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  { icon: BarChart3, title: 'Real-Time Pipeline Analytics', desc: 'Monitor stage distribution, pipeline dollar value, conversion metrics, and rep performance live.', color: 'text-teal-700 bg-teal-50 border-teal-200' },
  { icon: Zap, title: 'Unified Toast System', desc: 'Instant micro-feedback and notifications for every lead update, role change, or reassignment.', color: 'text-amber-600 bg-amber-50 border-amber-200' },
];

export const FeaturesSection = ({ refs }) => {
  const { featuresRef } = refs;

  return (
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
          {FEATURES.map((f, idx) => {
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
  );
};
