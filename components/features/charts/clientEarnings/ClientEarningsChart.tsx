"use client";

import { FunctionComponent, memo } from "react";
import { ClientEarningsData } from "@/types/dashboard/clientEarningsData";
import { Card } from "@/components/ui/card";
import ClientEarningsChartHeader from "@/components/features/charts/clientEarnings/ClientEarningsChartHeader";
import ClientEarningsChartContent from "@/components/features/charts/clientEarnings/ClientEarningsChartContent";

interface ClientEarningsChartProps {
  data: ClientEarningsData[];
}

const ClientEarningsChart: FunctionComponent<ClientEarningsChartProps> = ({
  data,
}) => {
  const totalEarnings = data.reduce((sum, item) => sum + item.earnings, 0);

  return (
    <Card>
      <ClientEarningsChartHeader totalEarnings={totalEarnings} />
      <ClientEarningsChartContent data={data} totalEarnings={totalEarnings} />
    </Card>
  );
};

export default memo(ClientEarningsChart);
