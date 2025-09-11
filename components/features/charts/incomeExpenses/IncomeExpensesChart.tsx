"use client";

import { FinancialData } from "@/types/dashboard/financialData";
import { Card } from "@/components/ui/card";
import { FunctionComponent } from "react";
import IncomeExpensesChartHeader from "./IncomeExpensesChartHeader";
import IncomeExpensesChartContent from "./IncomeExpensesChartContent";

interface IncomeExpensesChartProps {
  data: FinancialData[];
  viewType: string;
}

const IncomeExpensesChart: FunctionComponent<IncomeExpensesChartProps> = ({
  data,
  viewType = "bar",
}) => (
  <Card className="col-span-full">
    <IncomeExpensesChartHeader data={data} />
    <IncomeExpensesChartContent data={data} viewType={viewType} />
  </Card>
);

export default IncomeExpensesChart;
