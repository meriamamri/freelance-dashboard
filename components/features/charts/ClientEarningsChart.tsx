'use client';

import { memo, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Label } from 'recharts';
import { ClientEarnings } from '@/types/dashboard/clientEarnings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import ChartControls from './ChartControls';
import { ClientEarningsTooltipProps, PieLabelProps } from '@/types/dashboard/clientEarningsTooltipProps';
import { ChartTypeOption } from '@/types/dashboard/chartTypeOption';

interface ClientEarningsChartProps {
  data: ClientEarnings[];
  viewType?: string;
  onViewTypeChange?: (type: string) => void;
  sortOrder?: 'asc' | 'desc' | 'none';
  onSortOrderChange?: (order: 'asc' | 'desc' | 'none') => void;
}

const ClientEarningsChart = ({ 
  data,
  viewType = 'bar',
  onViewTypeChange,
  sortOrder = 'desc',
  onSortOrderChange
}: ClientEarningsChartProps) => {
  // Add colors for charts
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
  
  // Process data with colors
  const processedData = useMemo(() => {
    return data.map((item, index) => ({
      ...item,
      color: colors[index % colors.length]
    }));
  }, [data]);

  // Sort data based on sortOrder
  const sortedData = useMemo(() => {
    return sortOrder === 'none'
      ? processedData
      : [...processedData].sort((a, b) => {
          return sortOrder === 'asc' 
            ? a.earnings - b.earnings 
            : b.earnings - a.earnings;
        });
  }, [processedData, sortOrder]);

  const totalEarnings = useMemo(() => {
    return data.reduce((sum, item) => sum + item.earnings, 0);
  }, [data]);

  const availableTypes: ChartTypeOption[] = [
    { id: 'bar', label: 'Bar Chart', icon: BarChart3 },
    { id: 'pie', label: 'Pie Chart', icon: PieChartIcon }
  ];

  const CustomTooltip = ({ active, payload, label }: ClientEarningsTooltipProps) => {
    if (active && payload && payload.length && payload[0].payload) {
      const data = payload[0].payload;
      return (
        <div className="bg-background/95 backdrop-blur-sm border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label || data.client}</p>
          <p className="text-sm text-primary">
            Revenue: ${data.earnings.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">
            {data.projects} project{data.projects !== 1 ? 's' : ''}
          </p>
        </div>
      );
    }
    return null;
  };

  // Using 'any' type here because Recharts label function props are complex and don't have a straightforward type
  const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, earnings, client } = props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const percentage = ((earnings / totalEarnings) * 100).toFixed(0);

    if (parseInt(percentage) < 8) return null; // Don't show label for small slices

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${percentage}%`}
      </text>
    );
  };

  const renderChart = () => {
    if (viewType === 'pie') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={sortedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="earnings"
            >
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={sortedData}
          layout="horizontal"
          margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            type="number" 
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <YAxis 
            type="category" 
            dataKey="client" 
            width={70}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="earnings" 
            fill="#3B82F6" 
            radius={[0, 4, 4, 0]}
            name="Earnings"
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Earnings by Client
            </CardTitle>
            <CardDescription>Top revenue-generating clients</CardDescription>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="font-medium">${totalEarnings.toLocaleString()}</span>
            <span className="text-muted-foreground">Total</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {(onViewTypeChange || onSortOrderChange) && (
          <ChartControls
            chartType={viewType}
            onChartTypeChange={onViewTypeChange || (() => {})}
            sortOrder={sortOrder}
            onSortOrderChange={onSortOrderChange || (() => {})}
            availableTypes={availableTypes}
            title="Client Earnings"
          />
        )}
        {renderChart()}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sortedData.slice(0, 3).map((client, index) => {
            const percentage = ((client.earnings / totalEarnings) * 100).toFixed(1);
            return (
              <div key={client.client} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: client.color }}
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{client.client}</p>
                  <p className="text-xs text-muted-foreground">
                    {client.projects} project{client.projects !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">${client.earnings.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{percentage}%</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(ClientEarningsChart);
