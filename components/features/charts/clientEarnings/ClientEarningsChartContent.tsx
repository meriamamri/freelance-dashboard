import { CardContent } from "@/components/ui/card";
import ClientEarningsBarChart from "@/components/features/charts/clientEarnings/ClientEarningsBarChart";
import ClientEarningsSummary from "@/components/features/charts/clientEarnings/ClientEarningsSummary";
import { FunctionComponent } from "react";
import { ClientEarningsData } from "@/components/features/charts/types/clientEarningsData";

interface ClientEarningsChartContentProps {
    data: ClientEarningsData[];
    totalEarnings: number;
}

const ClientEarningsChartContent: FunctionComponent<ClientEarningsChartContentProps> = ({data, totalEarnings}) => (
    <CardContent>
        <ClientEarningsBarChart data={data} />
        <ClientEarningsSummary data={data} totalEarnings={totalEarnings} />
    </CardContent>
)

export default ClientEarningsChartContent;