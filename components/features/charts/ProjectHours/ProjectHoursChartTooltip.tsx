import { ProjectHoursPayloadType } from "@/components/features/charts/types/projectHoursPayloadType";

const ProjectHoursChartTooltip = ({
  payload,
  active,
  totalHours
}: {
  payload?: ProjectHoursPayloadType[];
  active?: boolean;
  totalHours: number;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    
    const percentage = totalHours > 0 ? ((data?.hours || 0) / totalHours * 100).toFixed(1) : "0.0";
    return (
      <>
        <p className="font-medium">{data?.project}</p>
        <p className="text-sm text-muted-foreground">{data?.client}</p>
        <p className="text-sm" style={{ color: data?.color }}>
          {data?.hours} hours ({percentage}%)
        </p>
      </>
    );
  }
  return null;
};

export default ProjectHoursChartTooltip;
