import { FunctionComponent, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { ProjectHours } from '@/types/dashboard/projectHours';
import { ProjectHoursTooltipProps } from './ProjectHoursTooltip';

interface ProjectHoursBarChartProps {
  data: ProjectHours[];
  CustomTooltip: React.ComponentType<ProjectHoursTooltipProps>;
  totalHours: number;
  calculatePercentage: (value: number, total: number) => number;
}

const ProjectHoursBarChart: FunctionComponent<ProjectHoursBarChartProps> = ({ 
  data, 
  CustomTooltip,
  totalHours,
  calculatePercentage
}) => {
  // Memoize chart data to prevent unnecessary recalculations
  const chartData = useMemo(() => data, [data]);

  // Create a wrapper component for the tooltip to pass additional props
  const TooltipWrapper: FunctionComponent<Omit<ProjectHoursTooltipProps, 'totalHours' | 'calculatePercentage'>> = (props) => (
    <CustomTooltip 
      {...props} 
      totalHours={totalHours} 
      calculatePercentage={calculatePercentage} 
    />
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis 
          dataKey="project" 
          angle={-45}
          textAnchor="end"
          height={80}
          interval={0}
          tick={{ fontSize: 12 }}
        />
        <YAxis tickFormatter={(value) => `${value}h`} />
        <Tooltip content={<TooltipWrapper />} />
        <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ProjectHoursBarChart;
