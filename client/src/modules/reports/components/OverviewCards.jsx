import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Users, UserPlus, TrendingUp, DollarSign, CheckCircle2, XCircle, Activity, Target, Clock, ShieldCheck,
} from 'lucide-react';

const cards = [
  { key: 'totalLeads', label: 'Total Leads', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50', format: (v) => v.toLocaleString() },
  { key: 'newLeadsToday', label: 'New Leads Today', icon: UserPlus, color: 'text-emerald-600', bg: 'bg-emerald-50', format: (v) => v.toLocaleString() },
  { key: 'leadsThisWeek', label: 'Leads This Week', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50', format: (v) => v.toLocaleString() },
  { key: 'leadsThisMonth', label: 'Leads This Month', icon: Activity, color: 'text-violet-600', bg: 'bg-violet-50', format: (v) => v.toLocaleString() },
  { key: 'wonLeads', label: 'Won Leads', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', format: (v) => v.toLocaleString() },
  { key: 'lostLeads', label: 'Lost Leads', icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50', format: (v) => v.toLocaleString() },
  { key: 'activeLeads', label: 'Active Leads', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50', format: (v) => v.toLocaleString() },
  { key: 'totalPipelineValue', label: 'Pipeline Value', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50', format: (v) => `$${v.toLocaleString()}` },
  { key: 'conversionRate', label: 'Conversion Rate', icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-50', format: (v) => `${v}%` },
  { key: 'averageResponseTime', label: 'Avg Response Time', icon: Clock, color: 'text-sky-600', bg: 'bg-sky-50', format: (v) => `${v}h` },
  { key: 'slaCompliance', label: 'SLA Compliance', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50', format: (v) => `${v}%` },
];

export function OverviewCards({ data, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {cards.map((card) => (
          <Card key={card.key}>
            <CardContent className="p-4 space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const value = data[card.key] ?? 0;
        return (
          <Card key={card.key}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500 truncate">{card.label}</span>
                <div className={`p-1.5 rounded-lg ${card.bg}`}>
                  <Icon className={`w-3.5 h-3.5 ${card.color}`} />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {card.format(value)}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
