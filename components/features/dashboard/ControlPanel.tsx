"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Filter } from "lucide-react";
import {
  chartTypeOptions,
  timeRangeOptions,
  controlBadges,
} from "./constants/controlPanelConfig";
import { FunctionComponent } from "react";
import { ChartTypeOption } from "@/types/dashboard/chartTypeOption";

interface ControlPanelProps {
  chartType: string;
  onChartTypeChange: (type: string) => void;
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
  onRefresh: () => void;
}

const ControlPanel: FunctionComponent<ControlPanelProps> = ({
  chartType,
  onChartTypeChange,
  timeRange,
  onTimeRangeChange,
  onRefresh,
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Filter className="h-5 w-5" />
        Dashboard Controls
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block">Chart Type</label>
          <div className="flex gap-2">
            {chartTypeOptions.map((option: ChartTypeOption) => {
              const Icon = option.icon;
              return (
                <Button
                  key={option.id}
                  variant={chartType === option.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => onChartTypeChange(option.id)}
                  className="flex-1"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {option.label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block">Time Range</label>
          <Select value={timeRange} onValueChange={onTimeRangeChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeRangeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="h-10"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        {controlBadges.map((badge, index) => (
          <Badge key={index} variant={badge.variant}>
            {badge.text}
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default ControlPanel;
