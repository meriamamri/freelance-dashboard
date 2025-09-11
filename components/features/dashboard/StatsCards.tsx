'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClientEarnings } from '@/types/dashboard/clientEarnings';
import { FinancialData } from '@/types/dashboard/financialData';
import { ProjectHours } from '@/types/dashboard/projectHours';
import { StatItem } from '@/types/dashboard/statItem';
import { statsConfig } from './constants/statsConfig';
import { useMemo } from 'react';

interface StatsCardsProps {
  financialData: FinancialData[];
  clientEarnings: ClientEarnings[];
  projectHours: ProjectHours[];
}

export default function StatsCards({ financialData, clientEarnings, projectHours }: StatsCardsProps) {
  // Memoize calculations to prevent unnecessary recalculations
  const calculations = useMemo(() => {
    // Financial calculations
    const totalRevenue = financialData.reduce((sum, item) => sum + (item.income || 0), 0);
    const totalExpenses = financialData.reduce((sum, item) => sum + (item.expenses || 0), 0);
    const netProfit = totalRevenue - totalExpenses;
    const profitMargin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100) : 0;
    
    // Client calculations
    const totalClients = clientEarnings.length;
    
    // Hours calculations
    const totalHours = projectHours.reduce((sum, item) => sum + (item.hours || 0), 0);
    const avgHourlyRate = totalHours > 0 ? (totalRevenue / totalHours) : 0;
    
    return {
      totalRevenue,
      totalExpenses,
      netProfit,
      profitMargin,
      totalClients,
      totalHours,
      avgHourlyRate
    };
  }, [financialData, clientEarnings, projectHours]);

  // Create stats array with proper typing by combining config with calculated values
  const stats: StatItem[] = useMemo(() => {
    return statsConfig.map((config) => {
      switch (config.id) {
        case 'revenue':
          return {
            ...config,
            value: `$${calculations.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            description: `${calculations.profitMargin.toFixed(1)}% profit margin`,
          };
        case 'profit':
          return {
            ...config,
            value: `$${calculations.netProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            description: `$${calculations.totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} in expenses`,
            color: calculations.netProfit >= 0 ? 'text-blue-500' : 'text-red-500',
            bgColor: calculations.netProfit >= 0 ? 'bg-blue-500/10' : 'bg-red-500/10',
            trend: calculations.netProfit >= 0 ? 'up' : 'down'
          };
        case 'hours':
          return {
            ...config,
            value: calculations.totalHours.toLocaleString(),
            description: `$${calculations.avgHourlyRate.toFixed(0)}/hour average`,
          };
        case 'clients':
          return {
            ...config,
            value: calculations.totalClients.toString(),
            description: 'Across all projects',
          };
        default:
          return {
            ...config,
            value: '0',
            description: 'N/A',
          };
      }
    });
  }, [calculations]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={stat.id} 
            className="hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
