"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ProjectHours } from "@/types/dashboard/projectHours";
import ChartControls from "./ChartControls";
import { projectHoursChartTypes } from "./projectHoursChartConfig";
import { ProjectHoursChartHeader } from "./ProjectHoursChartHeader";
import { ProjectHoursDataList } from "./ProjectHoursDataList";
import { calculatePercentage } from "./helpers/calculatePercentage";
import { useSortedHours } from "./hooks/useSortedHours";
import RenderChart from "./RenderChart";

interface ProjectHoursChartProps {
  data: ProjectHours[];
  viewType?: string;
  onViewTypeChange?: (type: string) => void;
  sortOrder?: "asc" | "desc" | "none";
  onSortOrderChange?: (order: "asc" | "desc" | "none") => void;
}

export default function ProjectHoursChart({
  data,
  viewType = "pie",
  onViewTypeChange,
  sortOrder = "none",
  onSortOrderChange,
}: ProjectHoursChartProps) {
  const { totalHours, sortedData } = useSortedHours(data, sortOrder);

  return (
    <Card>
      <ProjectHoursChartHeader
        title="Project Hours Breakdown"
        description="Time allocation across clients and projects"
      />
      <CardContent>
        {(onViewTypeChange || onSortOrderChange) && (
          <ChartControls
            chartType={viewType}
            onChartTypeChange={onViewTypeChange || (() => {})}
            sortOrder={sortOrder}
            onSortOrderChange={onSortOrderChange || (() => {})}
            availableTypes={projectHoursChartTypes}
            title="Project Hours"
          />
        )}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <RenderChart
              sortedData={sortedData}
              totalHours={totalHours}
              viewType={viewType}
            />
          </div>
          <ProjectHoursDataList
            data={sortedData}
            totalHours={totalHours}
            calculatePercentage={calculatePercentage}
          />
        </div>
      </CardContent>
    </Card>
  );
}
