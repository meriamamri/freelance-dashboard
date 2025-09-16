import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CashFlowData } from "@/types/dashboard/CashFlowData";
import { ArrowUpDown } from "lucide-react";
import { FunctionComponent } from "react";

interface CashFlowHeaderProps {
  data: CashFlowData[];
}

const CashFlowHeader: FunctionComponent<CashFlowHeaderProps> = ({ data }) => {
  const totalInflow = data
    .filter((d) => d.type === "income")
    .reduce((sum, d) => sum + d.amount, 0);
  const totalOutflow = Math.abs(
    data
      .filter((d) => d.type === "expense")
      .reduce((sum, d) => sum + d.amount, 0)
  );
  const netFlow = totalInflow - totalOutflow;
  
  return (
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
  );
};

export default CashFlowHeader;
