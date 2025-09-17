"use client";

import { useState } from "react";
import {
  mockFinancialData,
  mockProjectHours,
  mockClientEarnings,
  mockCashFlowData,
} from "@/lib/mock-data";
import { toast } from "sonner";
import ControlPanel from "@/components/features/dashboard/ControlPanel";
import StatsCards from "@/components/features/dashboard/StatsCards";
import IncomeExpensesChart from "@/components/features/charts/incomeExpenses/IncomeExpensesChart";
import ProjectHoursChart from "@/components/features/charts/ProjectHours/ProjectHoursChart";
import ClientEarningsChart from "@/components/features/charts/clientEarnings/ClientEarningsChart";
import CashFlowChart from "@/components/features/charts/cashFlow/CashFlowChart";

export default function Dashboard() {
  const [chartType, setChartType] = useState<string>("bar");
  const [timeRange, setTimeRange] = useState("6m");

  const handleRefresh = () => {
    toast.success("Data refreshed!", {
      description:
        "Dashboard data has been updated with the latest information.",
    });
  };

  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      {/* Welcome Message */}
      <section className="text-center py-4">
        <h2 className="text-2xl font-bold mb-2">Welcome back, test!</h2>
        <p className="text-muted-foreground">
          Here&apos;s your freelance business overview
        </p>
      </section>

      {/* Stats Overview */}
      <section>
        <StatsCards
          financialData={mockFinancialData}
          clientEarnings={mockClientEarnings}
          projectHours={mockProjectHours}
        />
      </section>

      {/* Control Panel */}
      <section>
        <ControlPanel
          chartType={chartType}
          onChartTypeChange={setChartType}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          onRefresh={handleRefresh}
        />
      </section>

      {/* Charts Grid */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Income vs Expenses - Full Width */}
        <div className="xl:col-span-2">
          <IncomeExpensesChart data={mockFinancialData} viewType={chartType} />
        </div>

        {/* Project Hours */}
        <ProjectHoursChart data={mockProjectHours} />

        {/* Client Earnings */}
        <ClientEarningsChart data={mockClientEarnings} />

        {/* Cash Flow - Full Width */}
        <div className="xl:col-span-2">
          <CashFlowChart data={mockCashFlowData} />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-muted-foreground py-8">
        <p>
          © 2024 FreelanceDash. Built with Next.js, Recharts, and Tailwind CSS.
        </p>
      </footer>
    </main>
  );
}
