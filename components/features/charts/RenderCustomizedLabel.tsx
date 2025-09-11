import { ProjectHours } from "@/types/dashboard/projectHours";
import { calculatePercentage } from "./helpers/calculatePercentage";

export interface RechartsLabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    payload: ProjectHours;
    totalHours: number;
  }

const RenderCustomizedLabel = (props: RechartsLabelProps) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, payload, totalHours } = props;
  
  const hours = payload?.hours || 0;
  const project = payload?.project || "";

  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const percentage = calculatePercentage(hours, totalHours).toFixed(0);

  if (parseInt(percentage) < 8) return null; // Don't show label for small slices

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs font-medium"
      aria-label={`${project}: ${hours} hours (${percentage}%)`}
    >
      {`${percentage}%`}
    </text>
  );
};

export default RenderCustomizedLabel;
