import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Activity, ArrowRight, UserPlus, Edit3, Target, XCircle, CheckCircle2 } from 'lucide-react';

const activityIcons = {
  LEAD_CREATED: { icon: UserPlus, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  STATUS_CHANGE: { icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ASSIGNMENT: { icon: ArrowRight, color: 'text-blue-600', bg: 'bg-blue-50' },
  NOTE_ADDED: { icon: Edit3, color: 'text-amber-600', bg: 'bg-amber-50' },
};

export function RecentActivity({ data, loading }) {
  if (loading) {
    return (
      <Card>
        <CardHeader><CardTitle className="text-base">Recent Activity</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader><CardTitle className="text-base">Recent Activity</CardTitle></CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8 text-sm text-slate-500">
          <Activity className="w-8 h-8 text-slate-300 mb-2" />
          <span>No recent activity</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Recent Activity</CardTitle></CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, idx) => {
            const meta = activityIcons[item.type] || { icon: Activity, color: 'text-slate-600', bg: 'bg-slate-50' };
            const Icon = meta.icon;
            const date = item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
            }) : '';
            return (
              <div key={idx} className="flex gap-3">
                <div className={`p-1.5 rounded-full ${meta.bg} flex-shrink-0`}>
                  <Icon className={`w-4 h-4 ${meta.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 truncate">{item.description}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-slate-400 font-medium">{item.performedByName}</span>
                    <span className="text-xs text-slate-300">·</span>
                    <span className="text-xs text-slate-400">{date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
