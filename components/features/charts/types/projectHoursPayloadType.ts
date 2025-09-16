import { ProjectHours } from "@/types/dashboard/projectHours";

export interface ProjectHoursPayloadType {
  name: string;
  value: number;
  color: string;
  payload?: ProjectHours;
}
