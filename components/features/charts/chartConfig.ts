import { ChartTypeOption } from '@/types/dashboard/chartTypeOption';
import { BarChart3, PieChart, LineChart as LineChartIcon } from 'lucide-react';

// Chart type options for income/expense charts
export const incomeExpenseChartTypes: ChartTypeOption[] = [
  { 
    id: 'bar', 
    label: 'Bar Chart', 
    icon: BarChart3 
  },
  { 
    id: 'area', 
    label: 'Area Chart', 
    icon: PieChart 
  },
  { 
    id: 'line', 
    label: 'Line Chart', 
    icon: LineChartIcon 
  }
];

// Color definitions for charts
export const chartColors = {
  income: {
    stroke: '#10B981',
    fill: '#10B981',
    text: 'text-green-500',
    dot: '#10B981'
  },
  expenses: {
    stroke: '#EF4444',
    fill: '#EF4444',
    text: 'text-red-500',
    dot: '#EF4444'
  },
  netProfit: {
    stroke: '#3B82F6',
    fill: '#3B82F6',
    text: 'text-blue-500',
    dot: '#3B82F6'
  }
};
