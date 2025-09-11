import { ChartTypeOption } from '@/types/dashboard/chartTypeOption';
import { PieChart as PieChartIcon, BarChart3 } from 'lucide-react';

// Chart type options for project hours charts
export const projectHoursChartTypes: ChartTypeOption[] = [
  { 
    id: 'pie', 
    label: 'Pie Chart', 
    icon: PieChartIcon 
  },
  { 
    id: 'bar', 
    label: 'Bar Chart', 
    icon: BarChart3 
  }
];
