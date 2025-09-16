import { ProjectHours } from "@/types/dashboard/projectHours";
import { Users } from "lucide-react";
import { FunctionComponent } from "react";

interface ProjectHoursOverviewProps {
  data: ProjectHours[];
  totalHours: number;
}

const ProjectHoursOverview: FunctionComponent<ProjectHoursOverviewProps> = ({
  data,
  totalHours,
}) => (
  <div className="lg:w-64 space-y-3">
    <div className="flex items-center gap-2 text-sm font-medium">
      <Users className="h-4 w-4" />
      Total: {totalHours} hours
    </div>
    {data.map((item, index) => {
      const percentage = ((item.hours / totalHours) * 100).toFixed(1);
      return (
        <div key={index} className="flex items-center gap-3 text-sm">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{item.project}</p>
            <p className="text-muted-foreground text-xs">{item.client}</p>
          </div>
          <div className="text-right">
            <p className="font-medium">{item.hours}h</p>
            <p className="text-xs text-muted-foreground">{percentage}%</p>
          </div>
        </div>
      );
    })}
  </div>
);
export default ProjectHoursOverview;
