import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { FunctionComponent } from "react";

interface RefreshButtonProps {
  onRefresh: () => void;
  isRefreshing?: boolean;
  disabled?: boolean;
}

const RefreshButton: FunctionComponent<RefreshButtonProps> = ({
  onRefresh,
  isRefreshing = false,
  disabled = false,
}) => (
  <div className="flex items-end">
    <Button
      variant="outline"
      size="sm"
      onClick={onRefresh}
      disabled={disabled || isRefreshing}
      className="h-10 min-w-[100px] transition-all duration-200 hover:shadow-md"
      aria-label={
        isRefreshing ? "Refreshing data..." : "Refresh dashboard data"
      }
    >
      <RefreshCw
        className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
        aria-hidden="true"
      />
      {isRefreshing ? "Refreshing..." : "Refresh"}
    </Button>
  </div>
);

export default RefreshButton;
