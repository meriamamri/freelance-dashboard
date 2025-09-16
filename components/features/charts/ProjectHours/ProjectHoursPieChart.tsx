import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import ReusableTooltip from "../common/CustomTooltip";
import { ProjectHours } from "@/types/dashboard/projectHours";
import { FunctionComponent } from "react";
import ProjectHoursChartTooltip from "./ProjectHoursChartTooltip";
import { ProjectHoursPayloadType } from "@/components/features/charts/types/projectHoursPayloadType";

interface ProjectHoursPieChartProps {
  data: ProjectHours[];
  totalHours: number;
}

const ProjectHoursPieChart: FunctionComponent<ProjectHoursPieChartProps> = ({
  data,
  totalHours,
}) => {
  // Using `any` type for the label function parameter to avoid TypeScript errors with Recharts
  // This is a known issue with Recharts type definitions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    hours,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const percentage = ((hours / totalHours) * 100).toFixed(0);

    if (parseInt(percentage) < 8) return null; // Don't show label for small slices

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${percentage}%`}
      </text>
    );
  };

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
        <Tooltip
  content={<ReusableTooltip<ProjectHoursPayloadType> renderContent={(props) => 
    <ProjectHoursChartTooltip {...props} totalHours={totalHours} />
  } />}
/>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ProjectHoursPieChart;
