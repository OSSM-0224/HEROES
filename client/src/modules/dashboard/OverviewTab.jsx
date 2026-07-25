import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Users, CheckCircle, Target, Sparkles, Clock, ArrowUpRight, TrendingUp } from 'lucide-react';

export const OverviewTab = ({ metrics, onNavigateToLeads }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !metrics) return;
    const targets = containerRef.current.querySelectorAll('.stat-count');
    targets.forEach((el) => {
      const rawVal = el.getAttribute('data-value');
      if (!rawVal) return;
      const numericVal = parseFloat(rawVal.replace(/[^0-9.]/g, '')) || 0;
      const isDollar = rawVal.startsWith('$');

      gsap.fromTo(
        el,
        { textContent: isDollar ? '$0' : '0' },
        {
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: function () {
            const current = Math.floor(this.progress() * numericVal);
            el.textContent = isDollar
              ? `$${current.toLocaleString()}`
              : current.toLocaleString();
          },
        }
      );
    });
  }, [metrics]);

  if (!metrics) return null;

  const totalLeads = metrics.totalLeads || 0;
  const pipelineVal = metrics.totalPipelineValue || 0;
  const qualifiedCount = metrics.qualifiedLeads || 0;
  const wonCount = metrics.wonLeads || 0;

  const cards = [
    {
      title: 'Total Pipeline Value',
      rawVal: `$${pipelineVal}`,
      subtitle: 'Combined value of active deals',
      icon: DollarSign,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      title: 'Total Leads Captured',
      rawVal: `${totalLeads}`,
      subtitle: 'All historical leads in CRM',
      icon: Users,
      color: 'text-teal-700 bg-teal-50 border-teal-200',
    },
    {
      title: 'Qualified Prospects',
      rawVal: `${qualifiedCount}`,
      subtitle: 'High intent leads in stage',
      icon: Target,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      title: 'Closed Deals Won',
      rawVal: `${wonCount}`,
      subtitle: 'Successfully won contracts',
      icon: CheckCircle,
      color: 'text-teal-700 bg-teal-50 border-teal-200',
    },
  ];

  return (
    <div ref={containerRef} className="space-y-8 animate-in fade-in duration-300">
      {/* Top Executive Banner */}
      <div className="p-6 bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 rounded-2xl text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-emerald-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-200" />
            <h2 className="text-xl font-black text-white font-heading">HEROES Executive Performance Overview</h2>
          </div>
          <p className="text-xs text-emerald-100 max-w-xl font-medium">
            Real-time pipeline metrics, 24h SLA response tracking, and stage distribution across your workspace.
          </p>
        </div>
        <Button
          onClick={onNavigateToLeads}
          size="sm"
          className="bg-white text-emerald-800 hover:bg-slate-100 font-extrabold gap-1.5 shadow-sm border border-emerald-100"
        >
          View Leads Pipeline
          <ArrowUpRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <Card key={i} className="border-slate-200 bg-white shadow-2xs hover:shadow-md transition-all rounded-2xl">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{card.title}</span>
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${card.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div data-value={card.rawVal} className="stat-count text-3xl font-black text-slate-900 font-mono">
                  {card.rawVal}
                </div>
                <p className="text-[11px] text-slate-500 font-medium">{card.subtitle}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pipeline Status Breakdown */}
      <Card className="border-slate-200 bg-white shadow-2xs rounded-2xl">
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-base font-bold text-slate-900 flex items-center justify-between font-heading">
            <span className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Pipeline Stage Distribution
            </span>
            <Badge variant="outline" className="text-xs font-mono font-bold bg-slate-50 text-slate-700 border-slate-200">
              Total Leads: {totalLeads}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { status: 'New', color: 'bg-emerald-600' },
              { status: 'Contacted', color: 'bg-teal-600' },
              { status: 'Qualified', color: 'bg-emerald-500' },
              { status: 'Proposal Sent', color: 'bg-amber-500' },
              { status: 'Closed Won', color: 'bg-emerald-700' },
              { status: 'Closed Lost', color: 'bg-rose-600' },
            ].map(({ status, color }) => {
              const count = metrics.statusCounts?.[status] || 0;
              const total = totalLeads || 1;
              const pct = Math.round((count / total) * 100);
              return (
                <div
                  key={status}
                  className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 hover:bg-white transition-all shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-700 truncate">
                      {status}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 font-mono">{pct}%</span>
                  </div>
                  <span className="text-2xl font-black text-slate-900 block font-mono">{count}</span>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${color} rounded-full transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
