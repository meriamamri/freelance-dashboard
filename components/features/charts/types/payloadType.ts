import { ClientEarningsData } from "./clientEarningsData";

export interface PayloadType {
  name: string;
  value: number;
  color: string;
  payload?: ClientEarningsData;
}