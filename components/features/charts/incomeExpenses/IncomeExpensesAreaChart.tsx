import { FinancialData } from "@/types/dashboard/financialData";
import { FunctionComponent } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ReusableTooltip from "@/components/features/charts/common/CustomTooltip";
import RenderTooltipContent from "@/components/features/charts/incomeExpenses/RenderTooltipContent";

interface IncomeExpensesAreaChartProps {
  data: FinancialData[];
}

const IncomeExpensesAreaChart: FunctionComponent<
  IncomeExpensesAreaChartProps
> = ({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
    <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
      <XAxis dataKey="month" />
      <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
        <Tooltip
        content={<ReusableTooltip renderContent={RenderTooltipContent} />}
      />
      <Legend />
      <Area
        type="monotone"
        dataKey="income"
        stackId="1"
        stroke="#10B981"
        fill="#10B981"
        fillOpacity={0.6}
        name="Income"
      />
      <Area
        type="monotone"
        dataKey="expenses"
        stackId="2"
        stroke="#EF4444"
        fill="#EF4444"
        fillOpacity={0.6}
        name="Expenses"
      />
    </AreaChart>
  </ResponsiveContainer>
);

export default IncomeExpensesAreaChart;
