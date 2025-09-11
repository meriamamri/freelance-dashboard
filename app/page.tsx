"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import Header from "@/components/layout/Header";
import AuthModal from "@/components/features/auth/AuthModal";
import DataManagement from "@/components/features/data/DataManagement";
import { Toaster } from "@/components/ui/sonner";
import {
  mockFinancialData,
  mockProjectHours,
  mockClientEarnings,
  mockCashFlowData,
} from "@/lib/mock-data";
import { toast } from "sonner";
import ClientEarningsChart from "@/components/features/charts/ClientEarningsChart";
import ProjectHoursChart from "@/components/features/charts/ProjectHoursChart";
import IncomeExpensesChart from "@/components/features/charts/IncomeExpensesChart";
import CashFlowChart from "@/components/features/charts/CashFlowChart";
import ControlPanel from "@/components/features/dashboard/ControlPanel";
import StatsCards from "@/components/features/dashboard/StatsCards";
import { DataStorage } from "@/lib/data-storage";

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDataManagement, setShowDataManagement] = useState(false);
  const [chartType, setChartType] = useState<string>("bar");
  const [timeRange, setTimeRange] = useState("6m");

  // Data state
  const [financialData, setFinancialData] = useState(mockFinancialData);
  const [projectHours, setProjectHours] = useState(mockProjectHours);
  const [clientEarnings, setClientEarnings] = useState(mockClientEarnings);
  const [cashFlowData, setCashFlowData] = useState(mockCashFlowData);

  // Load user data when authenticated
  useEffect(() => {
    if (user) {
      const savedData = DataStorage.loadDashboardData(user.id);
      if (savedData) {
        setFinancialData(
          savedData.financial.length > 0
            ? savedData.financial
            : mockFinancialData
        );
        setProjectHours(
          savedData.projects.length > 0 ? savedData.projects : mockProjectHours
        );
        setClientEarnings(
          savedData.clients.length > 0 ? savedData.clients : mockClientEarnings
        );
        setCashFlowData(
          savedData.cashflow.length > 0 ? savedData.cashflow : mockCashFlowData
        );
        toast.success("Dashboard data loaded successfully");
      }
    }
  }, [user]);

  // Save data when it changes (if user is authenticated)
  useEffect(() => {
    if (user) {
      const dashboardData = {
        financial: financialData,
        projects: projectHours,
        clients: clientEarnings,
        cashflow: cashFlowData,
        lastUpdated: new Date().toISOString(),
      };
      DataStorage.saveDashboardData(user.id, dashboardData);
    }
  }, [user, financialData, projectHours, clientEarnings, cashFlowData]);

  // Show auth modal if not authenticated and not loading
  useEffect(() => {
    if (!isLoading && !user) {
      setShowAuthModal(true);
    }
  }, [user, isLoading]);

  const handleExport = () => {
    if (!user) {
      toast.error("Please sign in to export data");
      return;
    }

    const data = DataStorage.exportData(user.id);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `freelance-dashboard-${
      new Date().toISOString().split("T")[0]
    }.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Dashboard exported successfully!", {
      description: "Your financial report has been downloaded as JSON.",
    });
  };

  const handleImport = () => {
    if (!user) {
      toast.error("Please sign in to import data");
      return;
    }
    setShowDataManagement(true);
  };

  const handleDataManagement = () => {
    if (!user) {
      toast.error("Please sign in to manage data");
      return;
    }
    setShowDataManagement(true);
  };

  const handleRefresh = () => {
    if (user) {
      const savedData = DataStorage.loadDashboardData(user.id);
      if (savedData) {
        setFinancialData(savedData.financial);
        setProjectHours(savedData.projects);
        setClientEarnings(savedData.clients);
        setCashFlowData(savedData.cashflow);
      }
    }
    toast.success("Data refreshed!", {
      description:
        "Dashboard data has been updated with the latest information.",
    });
  };

  const handleDataUpdate = (
    data: any[],
    type: string,
    action: "replace" | "add"
  ) => {
    if (!user) return;

    DataStorage.updateData(user.id, data, type, action);

    // Update local state
    const savedData = DataStorage.loadDashboardData(user.id);
    if (savedData) {
      setFinancialData(savedData.financial);
      setProjectHours(savedData.projects);
      setClientEarnings(savedData.clients);
      setCashFlowData(savedData.cashflow);
    }

    toast.success(
      `${type} data ${
        action === "replace" ? "imported" : "added"
      } successfully!`
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

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
          financialData={financialData}
          clientEarnings={clientEarnings}
          projectHours={projectHours}
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
          <IncomeExpensesChart data={financialData} viewType={chartType} />
        </div>

        {/* Project Hours */}
        <ProjectHoursChart data={projectHours} />

        {/* Client Earnings */}
        <ClientEarningsChart data={clientEarnings} />

        {/* Cash Flow - Full Width */}
        <div className="xl:col-span-2">
          <CashFlowChart data={cashFlowData} />
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
