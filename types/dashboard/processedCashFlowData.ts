import { CashFlowData } from "@/types/dashboard/CashFlowData";

export interface ProcessedCashFlowData extends CashFlowData {
  cumulativeAmount: number;
  formattedDate: string;
}