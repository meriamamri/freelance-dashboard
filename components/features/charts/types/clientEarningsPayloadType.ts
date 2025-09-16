import { ClientEarningsData } from "../../../../types/dashboard/clientEarningsData";

export interface ClientEarningsPayloadType {
  name: string;
  value: number;
  color: string;
  payload?: ClientEarningsData;
}