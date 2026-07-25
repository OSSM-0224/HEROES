import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function SourceBarChart({ data, loading }) {
  if (loading) {
    return (
      <Card>
        <CardHeader><CardTitle className="text-base">Lead Source Analytics</CardTitle></CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <Skeleton className="w-full h-[250px] rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader><CardTitle className="text-base">Lead Source Analytics</CardTitle></CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center text-sm text-slate-500">
          No data available
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Lead Source Analytics</CardTitle></CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis
              dataKey="source"
              tick={{ fontSize: 12, fill: '#64748B' }}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#64748B' }}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="count" fill="#6366F1" radius={[4, 4, 0, 0]} animationBegin={0} animationDuration={750} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
