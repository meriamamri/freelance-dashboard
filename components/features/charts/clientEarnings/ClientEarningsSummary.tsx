import { ClientEarningsData } from "@/types/dashboard/clientEarningsData";
import { FunctionComponent } from "react";

interface ClientEarningsSummaryProps {
  data: ClientEarningsData[];
  totalEarnings: number;
}

const ClientEarningsSummary: FunctionComponent<ClientEarningsSummaryProps> = ({
  data,
  totalEarnings,
}) => (
  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
    {data.slice(0, 3).map((client, index) => {
      const percentage = ((client.earnings / totalEarnings) * 100).toFixed(1);
      return (
        <div
          key={index}
          className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
        >
          <div className="flex-1">
            <p className="font-medium text-sm">{client.client}</p>
            <p className="text-xs text-muted-foreground">
              {client.projects} project{client.projects !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="text-right">
            <p className="font-medium text-sm">
              ${client.earnings.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">{percentage}%</p>
          </div>
        </div>
      );
    })}
  </div>
);

export default ClientEarningsSummary;
