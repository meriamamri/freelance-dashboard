import { CardHeader, CardTitle } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { FunctionComponent } from "react";

const ControlPanelHeader: FunctionComponent = () => (
  <CardHeader className="pb-4">
    <CardTitle className="flex items-center gap-3 text-lg">
      <div className="p-2 rounded-lg bg-primary/10">
        <Filter className="h-5 w-5 text-primary" aria-hidden="true" />
      </div>
      <span>Dashboard Controls</span>
    </CardTitle>
  </CardHeader>
);

export default ControlPanelHeader;
