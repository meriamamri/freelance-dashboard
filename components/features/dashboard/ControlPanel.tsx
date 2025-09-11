"use client";

import { FunctionComponent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ChartTypeToggle from "./ChartTypeToggle";
import TimeRangeSelector from "./TimeRangeSelector";
import RefreshButton from "./RefreshButton";
import ControlBadges from "./ControlBadges";
import ControlPanelHeader from "./ControlPanelHeader";

interface ControlPanelProps {
  chartType: string;
  onChartTypeChange: (type: string) => void;
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
  disabled?: boolean;
}

const ControlPanel: FunctionComponent<ControlPanelProps> = ({
  chartType,
  onChartTypeChange,
  timeRange,
  onTimeRangeChange,
  onRefresh,
  isRefreshing = false,
  disabled = false,
}) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <ControlPanelHeader />

      <CardContent className="space-y-6">
        {/* Main Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChartTypeToggle
              chartType={chartType}
              onChartTypeChange={onChartTypeChange}
              disabled={disabled}
            />
          </div>

          <div className="space-y-4">
            <TimeRangeSelector
              timeRange={timeRange}
              onTimeRangeChange={onTimeRangeChange}
              disabled={disabled}
            />

            <div className="flex lg:justify-end">
              <RefreshButton
                onRefresh={onRefresh}
                isRefreshing={isRefreshing}
                disabled={disabled}
              />
            </div>
          </div>
        </div>

        {/* Status Badges */}
        <ControlBadges />
      </CardContent>
    </Card>
  );
};

export default ControlPanel;
