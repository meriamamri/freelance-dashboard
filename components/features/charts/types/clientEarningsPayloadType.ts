import { ClientEarningsData } from "./clientEarningsData";

export interface ClientEarningsPayloadType {
  name: string;
  value: number;
  color: string;
  payload?: ClientEarningsData;
}