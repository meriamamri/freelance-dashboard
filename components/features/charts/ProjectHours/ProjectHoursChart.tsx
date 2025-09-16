"use client";

import { Card } from "@/components/ui/card";
import { ProjectHours } from "@/types/dashboard/projectHours";
import ProjectHoursChartHeader from "./ProjectHoursChartHeader";
import ProjectHoursChartContent from "./ProjectHoursChartContent";

interface ProjectHoursChartProps {
  data: ProjectHours[];
}

export default function ProjectHoursChart({ data }: ProjectHoursChartProps) {
  const totalHours = data.reduce((sum, item) => sum + item.hours, 0);

  return (
    <Card>
      <ProjectHoursChartHeader />
      <ProjectHoursChartContent data={data} totalHours={totalHours} />
    </Card>
  );
}
