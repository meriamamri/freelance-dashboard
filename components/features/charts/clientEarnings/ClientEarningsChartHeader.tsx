import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users } from "lucide-react";
import { FunctionComponent } from "react";

interface ClientEarningsChartHeaderProps {
  totalEarnings: number;
}

const ClientEarningsChartHeader: FunctionComponent<
  ClientEarningsChartHeaderProps
> = ({ totalEarnings }) => (
  <CardHeader>
    <div className="flex items-center justify-between">
      <div>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Earnings by Client
        </CardTitle>
        <CardDescription>Top revenue-generating clients</CardDescription>
      </div>
      <div className="flex items-center gap-1 text-sm">
        <DollarSign className="h-4 w-4 text-primary" />
        <span className="font-medium">${totalEarnings.toLocaleString()}</span>
        <span className="text-muted-foreground">Total</span>
      </div>
    </div>
  </CardHeader>
);

export default ClientEarningsChartHeader;
