import { CardContent } from "@/components/ui/card";
import IncomeExpensesBarChart from "@/components/features/charts/incomeExpenses/IncomeExpensesBarChart";
import IncomeExpensesAreaChart from "@/components/features/charts/incomeExpenses/IncomeExpensesAreaChart";
import { FunctionComponent } from "react";
import { FinancialData } from "@/types/dashboard/financialData";

interface IncomeExpensesChartContentProps {
  data: FinancialData[];
  viewType: string;
}

const IncomeExpensesChartContent: FunctionComponent<
  IncomeExpensesChartContentProps
> = ({ data, viewType }) => (
  <CardContent>
    {viewType === "bar" ? (
      <IncomeExpensesBarChart data={data} />
    ) : (
      <IncomeExpensesAreaChart data={data} />
    )}
  </CardContent>
);

export default IncomeExpensesChartContent;
