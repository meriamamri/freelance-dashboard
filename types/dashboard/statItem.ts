export interface StatItem {
  id: string;
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  trend?: 'up' | 'down';
}
