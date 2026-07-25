import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/services/auth.service.jsx';
import { reportsApi } from '@/api/reports.api';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { OverviewCards } from '../components/OverviewCards';
import { StatusDonutChart } from '../components/StatusDonutChart';
import { SourceBarChart } from '../components/SourceBarChart';
import { TrendAreaChart } from '../components/TrendAreaChart';
import { PriorityPieChart } from '../components/PriorityPieChart';
import { UserPerformanceTable } from '../components/UserPerformanceTable';
import { RecentActivity } from '../components/RecentActivity';
import { ReportFilters } from '../components/ReportFilters';
import { useOverview, useStatusDistribution, useSourceAnalytics, usePriorityDistribution, useUserPerformance, useRecentActivity } from '../hooks/useReports';
import { BarChart3 } from 'lucide-react';

function getDateParams(range) {
  const now = new Date();
  const start = new Date();
  switch (range) {
    case 'today':
      start.setHours(0, 0, 0, 0);
      return { dateFrom: start.toISOString(), dateTo: now.toISOString() };
    case '7d':
      start.setDate(start.getDate() - 7);
      return { dateFrom: start.toISOString(), dateTo: now.toISOString() };
    case '30d':
      start.setDate(start.getDate() - 30);
      return { dateFrom: start.toISOString(), dateTo: now.toISOString() };
    case '90d':
      start.setDate(start.getDate() - 90);
      return { dateFrom: start.toISOString(), dateTo: now.toISOString() };
    case 'year':
      start.setFullYear(start.getFullYear() - 1);
      return { dateFrom: start.toISOString(), dateTo: now.toISOString() };
    default:
      return {};
  }
}

export default function ReportsPage() {
  const { user } = useAuth();
  const [range, setRange] = useState('30d');
  const [status, setStatus] = useState('All');
  const [priority, setPriority] = useState('All');

  const params = useMemo(() => {
    const base = getDateParams(range);
    if (status !== 'All') base.status = status;
    if (priority !== 'All') base.priority = priority;
    return base;
  }, [range, status, priority]);

  const { data: overview, isLoading: overviewLoading } = useOverview(params);
  const { data: statusDist, isLoading: statusLoading } = useStatusDistribution(params);
  const { data: sources, isLoading: sourceLoading } = useSourceAnalytics(params);
  const { data: priorityDist, isLoading: priorityLoading } = usePriorityDistribution(params);
  const { data: userPerf, isLoading: perfLoading } = useUserPerformance(params);
  const { data: activity, isLoading: activityLoading } = useRecentActivity(params);

  const handleExportCsv = async () => {
    try {
      const blob = await reportsApi.exportCsv(params);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `heroes-report-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success('Report exported successfully');
    } catch {
      toast.error('Failed to export report');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-100">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-heading">Reports</h1>
              <p className="text-sm text-slate-500">Analytics and insights for your sales pipeline</p>
            </div>
          </div>
        </div>

        <ReportFilters
          range={range}
          onRangeChange={setRange}
          status={status}
          onStatusChange={setStatus}
          priority={priority}
          onPriorityChange={setPriority}
          onExportCsv={handleExportCsv}
          onPrint={handlePrint}
        />

        <OverviewCards data={overview} loading={overviewLoading} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatusDonutChart data={statusDist} loading={statusLoading} />
          <SourceBarChart data={sources} loading={sourceLoading} />
        </div>

        <TrendAreaChart params={params} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PriorityPieChart data={priorityDist} loading={priorityLoading} />
          <UserPerformanceTable data={userPerf} loading={perfLoading} />
        </div>

        <RecentActivity data={activity} loading={activityLoading} />
      </div>
      <Footer />
    </div>
  );
}
