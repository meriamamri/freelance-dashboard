import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FinancialData } from "@/types/dashboard/financialData";
import { DollarSign, TrendingUp } from "lucide-react";
import { FunctionComponent } from "react";

interface IncomeExpensesChartHeaderProps {
  data: FinancialData[];
}

const IncomeExpensesChartHeader: FunctionComponent<
  IncomeExpensesChartHeaderProps
> = ({ data }) => {
  const totalIncome = data.reduce((sum, item) => sum + item.income, 0);
  const totalExpenses = data.reduce((sum, item) => sum + item.expenses, 0);
  const netProfit = totalIncome - totalExpenses;

  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Income vs Expenses
          </CardTitle>
          <CardDescription>
            Monthly financial performance overview
          </CardDescription>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-green-500" />
            <span className="text-green-500 font-medium">
              ${totalIncome.toLocaleString()}
            </span>
            <span className="text-muted-foreground">Income</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-red-500" />
            <span className="text-red-500 font-medium">
              ${totalExpenses.toLocaleString()}
            </span>
            <span className="text-muted-foreground">Expenses</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <span className="text-blue-500 font-medium">
              ${netProfit.toLocaleString()}
            </span>
            <span className="text-muted-foreground">Net Profit</span>
          </div>
        </div>
      </div>
    </CardHeader>
  );
};

export default IncomeExpensesChartHeader;
