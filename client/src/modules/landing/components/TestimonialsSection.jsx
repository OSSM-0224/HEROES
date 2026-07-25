import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const TESTIMONIALS = [
  { quote: 'HEROES SLA countdown changed our response time overnight. We reduced our first contact delay from 14 hours down to under 35 minutes.', name: 'Marcus Vance', role: 'VP of Global Sales, Velocity Scale', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
  { quote: 'The role-based access and immutable audit trail solved our compliance headache completely. Every note and status change is logged cleanly.', name: 'Elena Rostova', role: 'Head of Revenue Operations, Cloud Hero', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { quote: 'Simple, fast, and data-forward. My sales reps love the Kanban board while I get total executive visibility over pipeline conversion rates.', name: 'David Kim', role: 'Chief Commercial Officer, NextGen SaaS', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
];

export const TestimonialsSection = ({ refs }) => {
  const { testimonialsRef } = refs;

  return (
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
          {TESTIMONIALS.map((t, idx) => (
            <Card key={idx} className="testimonial-card p-6 border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-6 text-left rounded-2xl">
              <p className="text-sm text-slate-700 leading-relaxed font-medium italic">&ldquo;{t.quote}&rdquo;</p>
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
  );
};
