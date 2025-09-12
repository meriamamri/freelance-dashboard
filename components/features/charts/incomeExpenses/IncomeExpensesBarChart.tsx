import { FinancialData } from "@/types/dashboard/financialData";
import { FunctionComponent } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ReusableTooltip from "@/components/features/charts/common/CustomTooltip";
import RenderTooltipContent from "@/components/features/charts/common/RenderTooltipContent";

interface IncomeExpensesBarChartProps {
  data: FinancialData[];
}

const IncomeExpensesBarChart: FunctionComponent<
  IncomeExpensesBarChartProps
> = ({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
      <XAxis dataKey="month" />
      <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
      <Tooltip
        content={<ReusableTooltip renderContent={RenderTooltipContent} />}
      />
      <Legend />
      <Bar
        dataKey="income"
        fill="#10B981"
        name="Income"
        radius={[4, 4, 0, 0]}
      />
      <Bar
        dataKey="expenses"
        fill="#EF4444"
        name="Expenses"
        radius={[4, 4, 0, 0]}
      />
    </BarChart>
  </ResponsiveContainer>
);

export default IncomeExpensesBarChart;
