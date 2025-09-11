import { ProjectHours } from "@/types/dashboard/projectHours";
import { calculatePercentage } from "./helpers/calculatePercentage";
import ProjectHoursBarChart from "./ProjectHoursBarChart";
import ProjectHoursPieChart from "./ProjectHoursPieChart";
import { ProjectHoursTooltip } from "./ProjectHoursTooltip";
import RenderCustomizedLabel, { RechartsLabelProps } from "./RenderCustomizedLabel";
import { FunctionComponent } from "react";

interface RenderChartProps {
  viewType: string;
  totalHours: number;
  sortedData: ProjectHours[];
}

const RenderChart: FunctionComponent<RenderChartProps> = ({
  viewType,
  sortedData,
  totalHours,
}) => {
  // Create a wrapper function that passes totalHours to RenderCustomizedLabel
  const renderCustomizedLabel = (props: Omit<RechartsLabelProps, 'totalHours'>) => (
    <RenderCustomizedLabel {...props} totalHours={totalHours} />
  );

  if (viewType === "bar") {
    return (
      <ProjectHoursBarChart
        data={sortedData}
        CustomTooltip={ProjectHoursTooltip}
        totalHours={totalHours}
        calculatePercentage={calculatePercentage}
      />
    );
  }

  return (
    <ProjectHoursPieChart
      data={sortedData}
      CustomTooltip={ProjectHoursTooltip}
      renderCustomizedLabel={renderCustomizedLabel}
      totalHours={totalHours}
      calculatePercentage={calculatePercentage}
    />
  );
};

export default RenderChart;
