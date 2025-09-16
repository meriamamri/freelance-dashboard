import { Card, CardContent } from "@/components/ui/card";
import { CashFlowData } from "@/types/dashboard/CashFlowData";
import { FunctionComponent } from "react";
import CashFlowHeader from "@/components/features/charts/cashFlow/CashFlowHeader";
import CashFlowAreaChart from "@/components/features/charts/cashFlow/CashFlowAreaChart";

interface CashFlowChartProps {
  data: CashFlowData[];
}

const CashFlowChart: FunctionComponent<CashFlowChartProps> = ({ data }) => (
  <Card>
    <CashFlowHeader data={data} />
    <CardContent>
      <CashFlowAreaChart data={data} />
    </CardContent>
  </Card>
);

export default CashFlowChart;
