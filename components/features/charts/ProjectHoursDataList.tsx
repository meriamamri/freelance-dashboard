import { Users } from 'lucide-react';
import { ProjectHours } from '@/types/dashboard/projectHours';

interface ProjectHoursDataListProps {
  data: ProjectHours[];
  totalHours: number;
  calculatePercentage: (value: number, total: number) => number;
}

export function ProjectHoursDataList({ data, totalHours, calculatePercentage }: ProjectHoursDataListProps) {
  return (
    <div className="lg:w-64 space-y-3">
      <div 
        className="flex items-center gap-2 text-sm font-medium"
        aria-label={`Total hours: ${totalHours}`}
      >
        <Users className="h-4 w-4" />
        Total: {totalHours} hours
      </div>
      {data.map((item) => {
        // Skip items with no hours
        if (!item.hours) return null;
        
        const percentage = calculatePercentage(item.hours, totalHours).toFixed(1);
        return (
          <div 
            key={item.project + item.client} 
            className="flex items-center gap-3 text-sm"
            aria-label={`${item.project} for ${item.client}: ${item.hours} hours (${percentage}%)`}
          >
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
              aria-hidden="true"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate" title={item.project}>{item.project}</p>
              <p className="text-muted-foreground text-xs" title={item.client}>{item.client}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{item.hours}h</p>
              <p className="text-xs text-muted-foreground">{percentage}%</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
