'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, LineChart, Line } from 'recharts';
import { FinancialData } from '@/types/dashboard/financialData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign } from 'lucide-react';
import ChartControls from './ChartControls';
import { incomeExpenseChartTypes, chartColors } from './chartConfig';
import { FunctionComponent } from 'react';
import { TooltipProps } from '@/types/dashboard/tooltipProps';

interface IncomeExpensesChartProps {
  data: FinancialData[];
  viewType: string;
  onViewTypeChange?: (type: string) => void;
  sortOrder?: 'asc' | 'desc' | 'none';
  onSortOrderChange?: (order: 'asc' | 'desc' | 'none') => void;
}

 const IncomeExpensesChart:FunctionComponent<IncomeExpensesChartProps> = ({ 
  data, 
  viewType = 'bar',
  onViewTypeChange,
  sortOrder = 'none',
  onSortOrderChange
}) => {
  const totalIncome = data.reduce((sum, item) => sum + item.income, 0);
  const totalExpenses = data.reduce((sum, item) => sum + item.expenses, 0);
  const netProfit = totalIncome - totalExpenses;

  // Sort data based on sortOrder
  const sortedData = [...data].sort((a, b) => {
    if (sortOrder === 'none') return 0;
    const aValue = a.income - a.expenses;
    const bValue = b.income - b.expenses;
    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: ${entry.value.toLocaleString()}
            </p>
          ))}
          {payload[0] && payload[1] && (
            <p className="text-sm font-medium text-muted-foreground border-t pt-1 mt-1">
              Net: ${(payload[0].value - payload[1].value).toLocaleString()}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data: sortedData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    };

    switch (viewType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="income" 
              stroke={chartColors.income.stroke}
              strokeWidth={3}
              dot={{ fill: chartColors.income.dot, strokeWidth: 2, r: 4 }}
              name="Income"
            />
            <Line 
              type="monotone" 
              dataKey="expenses" 
              stroke={chartColors.expenses.stroke}
              strokeWidth={3}
              dot={{ fill: chartColors.expenses.dot, strokeWidth: 2, r: 4 }}
              name="Expenses"
            />
          </LineChart>
        );
      
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="income" 
              stackId="1" 
              stroke={chartColors.income.stroke}
              fill={chartColors.income.fill}
              fillOpacity={0.6}
              name="Income"
            />
            <Area 
              type="monotone" 
              dataKey="expenses" 
              stackId="2" 
              stroke={chartColors.expenses.stroke}
              fill={chartColors.expenses.fill}
              fillOpacity={0.6}
              name="Expenses"
            />
          </AreaChart>
        );
      
      default:
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="income" fill={chartColors.income.fill} name="Income" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" fill={chartColors.expenses.fill} name="Expenses" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
    }
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Income vs Expenses
            </CardTitle>
            <CardDescription>Monthly financial performance overview</CardDescription>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" style={{ color: chartColors.income.stroke }} />
              <span className="font-medium" style={{ color: chartColors.income.stroke }}>${totalIncome.toLocaleString()}</span>
              <span className="text-muted-foreground">Income</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" style={{ color: chartColors.expenses.stroke }} />
              <span className="font-medium" style={{ color: chartColors.expenses.stroke }}>${totalExpenses.toLocaleString()}</span>
              <span className="text-muted-foreground">Expenses</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" style={{ color: chartColors.netProfit.stroke }} />
              <span className="font-medium" style={{ color: chartColors.netProfit.stroke }}>${netProfit.toLocaleString()}</span>
              <span className="text-muted-foreground">Net Profit</span>
            </div>
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
            availableTypes={incomeExpenseChartTypes}
            title="Income vs Expenses"
          />
        )}
        <ResponsiveContainer width="100%" height={400}>
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default IncomeExpensesChart;