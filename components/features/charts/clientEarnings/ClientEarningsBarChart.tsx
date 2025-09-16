import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ReusableTooltip from "@/components/features/charts/common/CustomTooltip";
import RenderTooltipContent from "@/components/features/charts/common/RenderTooltipContent";
import { FunctionComponent } from "react";
import { ClientEarningsData } from "@/components/features/charts/types/clientEarningsData";
import { ClientEarningsPayloadType } from "@/components/features/charts/types/clientEarningspayloadType";

interface ClientEarningsBarChartProps {
  data: ClientEarningsData[];
}

const ClientEarningsBarChart: FunctionComponent<
  ClientEarningsBarChartProps
> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart
      data={data}
      layout="horizontal"
      margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
      <XAxis
        type="category"
        dataKey="client"
        width={70}
        tick={{ fontSize: 12 }}
      />
      <YAxis
        dataKey={"earnings"}
        type="number"
        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
      />
      <Tooltip
        content={<ReusableTooltip<ClientEarningsPayloadType> renderContent={RenderTooltipContent} />}
      />
      <Bar
        dataKey="earnings"
        fill="#3B82F6"
        radius={[0, 4, 4, 0]}
        name="Earnings"
      />
    </BarChart>
  </ResponsiveContainer>
);

export default ClientEarningsBarChart;
