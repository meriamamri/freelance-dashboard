import { ProjectHours } from '@/types/dashboard/projectHours';

// Define the tooltip props type
export interface ProjectHoursTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ProjectHours;
  }>;
  totalHours: number;
  calculatePercentage: (value: number, total: number) => number;
}

export function ProjectHoursTooltip({ 
  active, 
  payload, 
  totalHours,
  calculatePercentage
}: ProjectHoursTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percentage = calculatePercentage(data.hours, totalHours).toFixed(1);
    return (
      <div 
        className="bg-background/95 backdrop-blur-sm border rounded-lg p-3 shadow-lg"
        role="tooltip"
        aria-label={`${data.project}: ${data.hours} hours (${percentage}%)`}
      >
        <p className="font-medium">{data.project}</p>
        <p className="text-sm text-muted-foreground">{data.client}</p>
        <p className="text-sm" style={{ color: data.color }}>
          {data.hours} hours ({percentage}%)
        </p>
      </div>
    );
  }
  return null;
}
