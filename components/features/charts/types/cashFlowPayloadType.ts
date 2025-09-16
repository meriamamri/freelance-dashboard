import { CashFlowData } from "@/types/dashboard/CashFlowData";

export interface CashFlowPayloadType {
  name: string;
  value: number;
  color: string;
  payload?: CashFlowData;
}
