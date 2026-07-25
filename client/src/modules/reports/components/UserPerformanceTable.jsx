import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function UserPerformanceTable({ data, loading }) {
  if (loading) {
    return (
      <Card>
        <CardHeader><CardTitle className="text-base">Assigned Users Performance</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader><CardTitle className="text-base">Assigned Users Performance</CardTitle></CardHeader>
        <CardContent className="text-sm text-slate-500 text-center py-8">
          No user performance data available
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Assigned Users Performance</CardTitle></CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Assigned</TableHead>
              <TableHead className="text-right">Won</TableHead>
              <TableHead className="text-right">Lost</TableHead>
              <TableHead className="text-right">Conversion %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user) => {
              const initials = user.name
                ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
                : 'U';
              return (
                <TableRow key={user.userId}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs font-bold">{initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium text-slate-900">{user.name}</div>
                        <div className="text-xs text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">{user.assigned}</TableCell>
                  <TableCell className="text-right text-emerald-600 font-medium">{user.won}</TableCell>
                  <TableCell className="text-right text-rose-600 font-medium">{user.lost}</TableCell>
                  <TableCell className="text-right font-semibold">{user.conversionRate}%</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
