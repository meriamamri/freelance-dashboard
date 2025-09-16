import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { FunctionComponent } from "react";

const ProjectHoursChartHeader: FunctionComponent = () => (
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Clock className="h-5 w-5 text-primary" />
      Project Hours Breakdown
    </CardTitle>
    <CardDescription>
      Time allocation across clients and projects
    </CardDescription>
  </CardHeader>
);

export default ProjectHoursChartHeader;
