export interface ClientEarningsData {
  client: string;
  earnings: number;
  projects: number;
  color: string;
}

export interface ClientEarningsTooltipProps {
  active?: boolean;
  payload?: Array<{
    color?: string;
    payload?: ClientEarningsData;
  }>;
  label?: string;
}

export interface PieLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  earnings: number;
  client: string;
}
