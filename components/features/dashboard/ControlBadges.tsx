import { Badge } from "@/components/ui/badge";
import { controlBadges } from "./constants/controlPanelConfig";
import { Separator } from "@/components/ui/separator";
import { FunctionComponent } from "react";

const ControlBadges: FunctionComponent = () => {
  if (!controlBadges?.length) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center">
        <Separator className="flex-1" />
        <span className="px-3 text-xs text-muted-foreground">Status</span>
        <Separator className="flex-1" />
      </div>
      <div
        className="flex flex-wrap gap-2 justify-center"
        role="status"
        aria-label="Dashboard status indicators"
      >
        {controlBadges.map((badge, index) => (
          <Badge
            key={`${badge.text}-${index}`}
            variant={badge.variant}
            className="text-xs transition-all duration-200 hover:scale-105"
          >
            {badge.text}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ControlBadges;
