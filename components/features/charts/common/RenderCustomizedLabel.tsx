import { FunctionComponent } from "react";

export interface RechartsLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  hours: number;
  totalHours: number;
}

const RenderCustomizedLabel: FunctionComponent<RechartsLabelProps> = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  hours,
  totalHours,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const percentage = ((hours / totalHours) * 100).toFixed(0);

  if (parseInt(percentage) < 8) return null;
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

export default RenderCustomizedLabel;
