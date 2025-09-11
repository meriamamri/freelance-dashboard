import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ProjectHours } from "@/types/dashboard/projectHours";
import { FunctionComponent } from "react";
import { ProjectHoursTooltipProps } from "./ProjectHoursTooltip";

interface ProjectHoursPieChartProps {
  data: ProjectHours[];
  CustomTooltip: React.ComponentType<ProjectHoursTooltipProps>;
  // Using 'any' type here because Recharts label function props are complex and don't have a straightforward type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderCustomizedLabel: (props: any) => React.ReactElement | null;
  totalHours: number;
  calculatePercentage: (value: number, total: number) => number;
}

const ProjectHoursPieChart: FunctionComponent<ProjectHoursPieChartProps> = ({
  data,
  CustomTooltip,
  renderCustomizedLabel,
  totalHours,
  calculatePercentage
}) => {
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
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="hours"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<TooltipWrapper />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ProjectHoursPieChart;
