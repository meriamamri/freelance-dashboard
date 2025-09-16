import { CashFlowData } from "@/types/dashboard/CashFlowData";
import { FunctionComponent, useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format, parseISO } from "date-fns";
import ReusableTooltip from "@/components/features/charts/common/CustomTooltip";
import RenderTooltipContent from "@/components/features/charts/common/RenderTooltipContent";
import { CashFlowPayloadType } from "@/components/features/charts/types/cashFlowPayloadType";

interface CashLowAreaChartProps {
  data: CashFlowData[];
}

const CashLowAreaChart: FunctionComponent<CashLowAreaChartProps> = ({
  data,
}) => {
  const processedData = useMemo(() => {
    let runningTotal = 0;
    return data.map((item: CashFlowData) => {
      const amount = item.type === "income" ? item.amount : item.amount;
      runningTotal += amount;
      return {
        ...item,
        cumulativeAmount: runningTotal,
        formattedDate: format(parseISO(item.date), "MMM dd"),
      };
    });
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={processedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <defs>
          <linearGradient id="cashFlowGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis dataKey="formattedDate" />
        <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
        <Tooltip
        content={<ReusableTooltip<CashFlowPayloadType> renderContent={RenderTooltipContent} />}
      />
        <Area
          type="monotone"
          dataKey="cumulativeAmount"
          stroke="#3B82F6"
          strokeWidth={2}
          fill="url(#cashFlowGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CashLowAreaChart;
