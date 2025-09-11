import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FunctionComponent } from "react";
import { timeRangeOptions } from "./constants/controlPanelConfig";

interface TimeRangeSelectorProps {
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
  disabled?: boolean;
}

const TimeRangeSelector: FunctionComponent<TimeRangeSelectorProps> = ({
  timeRange,
  onTimeRangeChange,
  disabled = false,
}) => (
  <div className="space-y-3">
    <label
      htmlFor="time-range-select"
      className="text-sm font-medium text-foreground block"
    >
      Time Range
    </label>
    <Select
      value={timeRange}
      onValueChange={onTimeRangeChange}
      disabled={disabled}
    >
      <SelectTrigger
        id="time-range-select"
        className="w-full transition-all duration-200 hover:border-primary/50"
        aria-describedby="time-range-desc"
      >
        <SelectValue placeholder="Select time range" />
      </SelectTrigger>
      <SelectContent>
        {timeRangeOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="cursor-pointer"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    <p id="time-range-desc" className="text-xs text-muted-foreground sr-only">
      Select the time period for data visualization
    </p>
  </div>
);

export default TimeRangeSelector;
