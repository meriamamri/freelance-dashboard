import { ProcessedCashFlowData } from '@/types/dashboard/processedCashFlowData';

export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    color?: string;
    payload?: ProcessedCashFlowData;
  }>;
  label?: string;
}