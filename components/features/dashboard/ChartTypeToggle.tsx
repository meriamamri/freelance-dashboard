import { FunctionComponent, useCallback } from "react";
import { chartTypeOptions } from "./constants/controlPanelConfig";
import { ChartTypeOption } from "@/types/dashboard/chartTypeOption";
import { Button } from "@/components/ui/button";

interface ChartTypeToggleProps {
  chartType: string;
  onChartTypeChange: (type: string) => void;
  disabled?: boolean;
}

const ChartTypeToggle: FunctionComponent<ChartTypeToggleProps> = ({
  chartType,
  onChartTypeChange,
  disabled = false,
}) => {
  const handleChartTypeChange = useCallback(
    (optionId: string) => {
      if (!disabled) {
        onChartTypeChange(optionId);
      }
    },
    [onChartTypeChange, disabled]
  );

  return (
    <fieldset className="space-y-3" disabled={disabled}>
      <legend className="text-sm font-medium text-foreground">
        Chart Type
      </legend>
      <div
        className="grid grid-cols-2 lg:grid-cols-3 gap-2"
        role="radiogroup"
        aria-label="Select chart type"
      >
        {chartTypeOptions.map((option: ChartTypeOption) => {
          const Icon = option.icon;
          const isSelected = chartType === option.id;

          return (
            <Button
              key={option.id}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => handleChartTypeChange(option.id)}
              disabled={disabled}
              className="justify-start transition-all duration-200 hover:scale-[1.02]"
              role="radio"
              aria-checked={isSelected}
              aria-describedby={`chart-type-${option.id}-desc`}
            >
              <Icon className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
              <span className="truncate">{option.label}</span>
            </Button>
          );
        })}
      </div>
    </fieldset>
  );
};

export default ChartTypeToggle;
