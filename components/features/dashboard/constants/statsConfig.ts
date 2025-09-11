import { StatItem } from '@/types/dashboard/statItem';
import { DollarSign, TrendingUp, Clock, Users } from 'lucide-react';

// Define the stats configuration
export const statsConfig: Omit<StatItem, 'value' | 'description'>[] = [
  {
    id: 'revenue',
    title: 'Total Revenue',
    icon: DollarSign,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    trend: 'up'
  },
  {
    id: 'profit',
    title: 'Net Profit',
    icon: TrendingUp,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    trend: 'up'
  },
  {
    id: 'hours',
    title: 'Total Hours',
    icon: Clock,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    id: 'clients',
    title: 'Active Clients',
    icon: Users,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
];
