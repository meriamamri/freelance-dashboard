import { ProjectHours } from "@/types/dashboard/projectHours";
import { useMemo } from "react";

export function useSortedHours(data:ProjectHours[], sortOrder: 'asc' | 'desc' | 'none') {
  return useMemo(() => {
    if (!data || data.length === 0) {
      return { totalHours: 0, sortedData: [] };
    }
    const total = data.reduce((sum, item) => sum + (item.hours || 0), 0);
    const sorted = [...data].sort((a, b) => {
      if (sortOrder === 'none') return 0;
      return sortOrder === 'asc'
        ? (a.hours || 0) - (b.hours || 0)
        : (b.hours || 0) - (a.hours || 0);
    });
    return { totalHours: total, sortedData: sorted };
  }, [data, sortOrder]);
}
