import { ChartTypeOption } from '@/types/dashboard/chartTypeOption';
import { ControlBadge } from '@/types/dashboard/controlBadge';
import { TimeRangeOption } from '@/types/dashboard/TimeRangeOption';
import { BarChart3, PieChart } from 'lucide-react';

// Chart type options
export const chartTypeOptions: ChartTypeOption[] = [
  {
    id: 'bar',
    label: 'Bar',
    icon: BarChart3,
  },
  {
    id: 'area',
    label: 'Area',
    icon: PieChart,
  },
];

// Time range options
export const timeRangeOptions: TimeRangeOption[] = [
  { value: '6m', label: 'Last 6 Months' },
  { value: '1y', label: 'Last Year' },
  { value: '2y', label: 'Last 2 Years' },
  { value: 'all', label: 'All Time' },
];

// Control badges
export const controlBadges: ControlBadge[] = [
  { text: 'Real-time Updates', variant: 'secondary' },
  { text: 'Auto-save Enabled', variant: 'outline' },
  { text: 'Data Synced', variant: 'outline' },
];
