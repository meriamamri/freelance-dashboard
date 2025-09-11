import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface ProjectHoursChartHeaderProps {
  title: string;
  description: string;
}

export function ProjectHoursChartHeader({ title, description }: ProjectHoursChartHeaderProps) {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-primary" />
        {title}
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  );
}
