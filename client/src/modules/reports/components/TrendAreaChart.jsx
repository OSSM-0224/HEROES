import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTrend } from '../hooks/useReports';

export function TrendAreaChart({ params }) {
  const [groupBy, setGroupBy] = useState('day');
  const { data, isLoading } = useTrend({ ...params, groupBy });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Lead Creation Trend</CardTitle>
        <div className="flex gap-1">
          {['day', 'week', 'month'].map((g) => (
            <Button
              key={g}
              variant={groupBy === g ? 'default' : 'ghost'}
              size="sm"
              className="h-7 text-xs px-2"
              onClick={() => setGroupBy(g)}
            >
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[300px] flex items-center justify-center">
            <Skeleton className="w-full h-[250px] rounded-lg" />
          </div>
        ) : !data || data.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center text-sm text-slate-500">
            No data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: '#64748B' }}
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
              <Area
                type="monotone"
                dataKey="count"
                stroke="#6366F1"
                strokeWidth={2}
                fill="url(#trendGradient)"
                animationBegin={0}
                animationDuration={750}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
