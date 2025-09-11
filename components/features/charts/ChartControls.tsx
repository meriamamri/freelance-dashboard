"use client";

import { memo, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpDown, ArrowUp, ArrowDown, Settings2 } from "lucide-react";
import { ChartTypeOption } from "@/types/dashboard/chartTypeOption";

interface ChartControlsProps {
  chartType: string;
  onChartTypeChange: (type: string) => void;
  sortOrder: "asc" | "desc" | "none";
  onSortOrderChange: (order: "asc" | "desc" | "none") => void;
  availableTypes: ChartTypeOption[];
  title: string;
}

const ChartControls = ({
  chartType,
  onChartTypeChange,
  sortOrder,
  onSortOrderChange,
  availableTypes,
  title,
}: ChartControlsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const SortIcon = useMemo(() => {
    switch (sortOrder) {
      case "asc":
        return ArrowUp;
      case "desc":
        return ArrowDown;
      default:
        return ArrowUpDown;
    }
  }, [sortOrder]);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          {title} Controls
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Settings2 className="h-4 w-4" />
        </Button>
      </div>

      {isExpanded && (
        <Card className="border-dashed">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-3">
              <div className="flex-1 min-w-[120px]">
                <label className="text-xs font-medium mb-1 block">
                  Chart Type
                </label>
                <div className="flex gap-1">
                  {availableTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <Button
                        key={type.id}
                        variant={
                          chartType === type.id ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => onChartTypeChange(type.id)}
                        className="flex-1"
                      >
                        <Icon className="h-3 w-3" />
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="flex-1 min-w-[100px]">
                <label className="text-xs font-medium mb-1 block">
                  Sort Order
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const orderCycle: Array<"asc" | "desc" | "none"> = [
                      "none",
                      "desc",
                      "asc",
                    ];
                    const currentIndex = orderCycle.indexOf(sortOrder);
                    const nextIndex = (currentIndex + 1) % orderCycle.length;
                    onSortOrderChange(orderCycle[nextIndex]);
                  }}
                  className="w-full"
                >
                  <SortIcon className="h-3 w-3 mr-1" />
                  {sortOrder === "none"
                    ? "Default"
                    : sortOrder === "asc"
                    ? "Low to High"
                    : "High to Low"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default memo(ChartControls);
