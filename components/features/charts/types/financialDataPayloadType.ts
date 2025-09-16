import { FinancialData } from "@/types/dashboard/financialData";

export interface FinancialDataPayloadType {
  name: string;
  value: number;
  color: string;
  payload?: FinancialData;
}
