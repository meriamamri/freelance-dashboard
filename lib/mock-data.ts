import { CashFlowData } from "@/types/dashboard/CashFlowData";
import { ClientEarnings } from "@/types/dashboard/clientEarnings";
import { FinancialData } from "@/types/dashboard/financialData";
import { ProjectHours } from "@/types/dashboard/projectHours";

export const mockFinancialData: FinancialData[] = [
  { month: 'Jan', income: 8500, expenses: 3200, netSavings: 5300 },
  { month: 'Feb', income: 9200, expenses: 3800, netSavings: 5400 },
  { month: 'Mar', income: 7800, expenses: 3100, netSavings: 4700 },
  { month: 'Apr', income: 10500, expenses: 4200, netSavings: 6300 },
  { month: 'May', income: 11200, expenses: 3900, netSavings: 7300 },
  { month: 'Jun', income: 9800, expenses: 3600, netSavings: 6200 },
];

export const mockProjectHours: ProjectHours[] = [
  { project: 'E-commerce Platform', client: 'TechCorp', hours: 120, color: '#3B82F6' },
  { project: 'Mobile App', client: 'StartupX', hours: 85, color: '#10B981' },
  { project: 'Website Redesign', client: 'CreativeAgency', hours: 65, color: '#F59E0B' },
  { project: 'API Development', client: 'DataSystems', hours: 45, color: '#EF4444' },
  { project: 'Consulting', client: 'Various', hours: 30, color: '#8B5CF6' },
];

export const mockClientEarnings: ClientEarnings[] = [
  { client: 'TechCorp', earnings: 24500, projects: 3 },
  { client: 'StartupX', earnings: 18200, projects: 2 },
  { client: 'CreativeAgency', earnings: 15800, projects: 4 },
  { client: 'DataSystems', earnings: 12300, projects: 2 },
  { client: 'FinanceInc', earnings: 8900, projects: 1 },
];

export const mockCashFlowData: CashFlowData[] = [
  { date: '2024-01-01', amount: 2500, type: 'income' },
  { date: '2024-01-05', amount: -800, type: 'expense' },
  { date: '2024-01-10', amount: 3200, type: 'income' },
  { date: '2024-01-15', amount: -1200, type: 'expense' },
  { date: '2024-01-20', amount: 2800, type: 'income' },
  { date: '2024-01-25', amount: -600, type: 'expense' },
  { date: '2024-01-30', amount: 4100, type: 'income' },
];