import { CardContent } from "@/components/ui/card";
import ProjectHoursOverview from "./ProjectHoursOverview";
import ProjectHoursPieChart from "./ProjectHoursPieChart";
import { ProjectHours } from "@/types/dashboard/projectHours";
import { FunctionComponent } from "react";

interface ProjectHoursChartContentProps {
  data: ProjectHours[];
  totalHours: number;
}

const ProjectHoursChartContent: FunctionComponent<
  ProjectHoursChartContentProps
> = ({ data, totalHours }) => (
  <CardContent>
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1">
        <ProjectHoursPieChart data={data} totalHours={totalHours} />
      </div>
      <ProjectHoursOverview data={data} totalHours={totalHours} />
    </div>
  </CardContent>
);

export default ProjectHoursChartContent;
