import { useQuery } from '@tanstack/react-query';
import { reportsApi } from '@/api/reports.api';

const defaultParams = {};

export const reportKeys = {
  all: ['reports'],
  overview: (params) => [...reportKeys.all, 'overview', params],
  status: (params) => [...reportKeys.all, 'status', params],
  source: (params) => [...reportKeys.all, 'source', params],
  trend: (params) => [...reportKeys.all, 'trend', params],
  priority: (params) => [...reportKeys.all, 'priority', params],
  performance: (params) => [...reportKeys.all, 'performance', params],
  activity: (params) => [...reportKeys.all, 'activity', params],
};

export const useOverview = (params = defaultParams) =>
  useQuery({
    queryKey: reportKeys.overview(params),
    queryFn: () => reportsApi.getOverview(params),
    select: (res) => res.data,
  });

export const useStatusDistribution = (params = defaultParams) =>
  useQuery({
    queryKey: reportKeys.status(params),
    queryFn: () => reportsApi.getStatusDistribution(params),
    select: (res) => res.data.distribution,
  });

export const useSourceAnalytics = (params = defaultParams) =>
  useQuery({
    queryKey: reportKeys.source(params),
    queryFn: () => reportsApi.getSourceAnalytics(params),
    select: (res) => res.data.sources,
  });

export const useTrend = (params = defaultParams) =>
  useQuery({
    queryKey: reportKeys.trend(params),
    queryFn: () => reportsApi.getTrend(params),
    select: (res) => res.data.trend,
  });

export const usePriorityDistribution = (params = defaultParams) =>
  useQuery({
    queryKey: reportKeys.priority(params),
    queryFn: () => reportsApi.getPriorityDistribution(params),
    select: (res) => res.data.distribution,
  });

export const useUserPerformance = (params = defaultParams) =>
  useQuery({
    queryKey: reportKeys.performance(params),
    queryFn: () => reportsApi.getUserPerformance(params),
    select: (res) => res.data.performance,
  });

export const useRecentActivity = (params = defaultParams) =>
  useQuery({
    queryKey: reportKeys.activity(params),
    queryFn: () => reportsApi.getRecentActivity(params),
    select: (res) => res.data.activity,
  });
