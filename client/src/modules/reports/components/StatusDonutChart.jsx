import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const STATUS_COLORS = {
  'New': '#10B981',
  'Contacted': '#14B8A6',
  'Qualified': '#6366F1',
  'Proposal Sent': '#F59E0B',
  'Closed Won': '#059669',
  'Closed Lost': '#E11D48',
};

export function StatusDonutChart({ data, loading }) {
  if (loading) {
    return (
      <Card>
        <CardHeader><CardTitle className="text-base">Lead Status Distribution</CardTitle></CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <Skeleton className="w-[200px] h-[200px] rounded-full" />
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader><CardTitle className="text-base">Lead Status Distribution</CardTitle></CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center text-sm text-slate-500">
          No data available
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Lead Status Distribution</CardTitle></CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="count"
              nameKey="status"
              animationBegin={0}
              animationDuration={750}
            >
              {data.map((entry) => (
                <Cell key={entry.status} fill={STATUS_COLORS[entry.status] || '#94A3B8'} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => <span className="text-xs text-slate-600">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
