"use client";

import { memo, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  BarChart,
  Bar,
} from "recharts";
import { CashFlowData } from "@/types/dashboard/CashFlowData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TrendingUp,
  ArrowUpDown,
  BarChart3,
  LineChart as LineChartIcon,
  PieChart,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import ChartControls from "@/components/features/charts/ChartControls";
import { CustomTooltipProps } from "@/types/dashboard/customTooltipProps";

interface CashFlowChartProps {
  data: CashFlowData[];
  viewType?: string;
  onViewTypeChange?: (type: string) => void;
  sortOrder?: "asc" | "desc" | "none";
  onSortOrderChange?: (order: "asc" | "desc" | "none") => void;
}

const CashFlowChart = ({
  data,
  viewType = "area",
  onViewTypeChange,
  sortOrder = "none",
  onSortOrderChange,
}: CashFlowChartProps) => {
  // Process data to show cumulative cash flow
  const processedData = useMemo(() => {
    let runningTotal = 0;
    return data.map((item) => {
      const amount = item.type === "income" ? item.amount : -item.amount;
      runningTotal += amount;
      return {
        ...item,
        cumulativeAmount: runningTotal,
        formattedDate: format(parseISO(item.date), "MMM dd"),
      };
    });
  }, [data]);

  // Sort data based on sortOrder
  const sortedData = useMemo(() => {
    return sortOrder === "none"
      ? processedData
      : [...processedData].sort((a, b) => {
          return sortOrder === "asc"
            ? a.cumulativeAmount - b.cumulativeAmount
            : b.cumulativeAmount - a.cumulativeAmount;
        });
  }, [processedData, sortOrder]);

  const { totalInflow, totalOutflow, netFlow } = useMemo(() => {
    const totalInflow = data
      .filter((d) => d.type === "income")
      .reduce((sum, d) => sum + d.amount, 0);
    const totalOutflow = Math.abs(
      data
        .filter((d) => d.type === "expense")
        .reduce((sum, d) => sum + d.amount, 0)
    );
    const netFlow = totalInflow - totalOutflow;
    return { totalInflow, totalOutflow, netFlow };
  }, [data]);

  const availableTypes = [
    { value: "area", label: "Area Chart", icon: PieChart },
    { value: "line", label: "Line Chart", icon: LineChartIcon },
    { value: "bar", label: "Bar Chart", icon: BarChart3 },
  ];

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length && payload[0].payload) {
      const data = payload[0].payload;
      return (
        <div className="bg-background/95 backdrop-blur-sm border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-sm" style={{ color: payload[0].color }}>
            Balance: ${data.cumulativeAmount.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">
            {data.type === "income" ? "+" : ""}${data.amount.toLocaleString()} (
            {data.type})
          </p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data: sortedData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 },
    };

    switch (viewType) {
      case "line":
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="formattedDate" />
            <YAxis
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="cumulativeAmount"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        );

      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="formattedDate" />
            <YAxis
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="cumulativeAmount"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        );

      default:
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="cashFlowGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="formattedDate" />
            <YAxis
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="cumulativeAmount"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#cashFlowGradient)"
            />
          </AreaChart>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpDown className="h-5 w-5 text-primary" />
              Cash Flow Over Time
            </CardTitle>
            <CardDescription>
              Running balance and financial trends
            </CardDescription>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="text-center">
              <p className="text-green-500 font-medium">
                ${totalInflow.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Inflow</p>
            </div>
            <div className="text-center">
              <p className="text-red-500 font-medium">
                ${totalOutflow.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Outflow</p>
            </div>
            <div className="text-center">
              <p
                className={`font-medium ${
                  netFlow >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                ${netFlow.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Net Flow</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {(onViewTypeChange || onSortOrderChange) && (
          <ChartControls
            chartType={viewType}
            onChartTypeChange={onViewTypeChange || (() => {})}
            sortOrder={sortOrder}
            onSortOrderChange={onSortOrderChange || (() => {})}
            availableTypes={availableTypes}
            title="Cash Flow"
          />
        )}
        <ResponsiveContainer width="100%" height={300}>
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default memo(CashFlowChart);
