'use client';

import { CashFlowData } from "@/types/dashboard/CashFlowData";
import { ClientEarnings } from "@/types/dashboard/clientEarnings";
import { FinancialData } from "@/types/dashboard/financialData";
import { ProjectHours } from "@/types/dashboard/projectHours";


export interface DashboardData {
  financial: FinancialData[];
  projects: ProjectHours[];
  clients: ClientEarnings[];
  cashflow: CashFlowData[];
  lastUpdated: string;
}

export class DataStorage {
  private static readonly STORAGE_KEY = 'freelance_dash_data';

  static saveDashboardData(userId: string, data: DashboardData): void {
    const key = `${this.STORAGE_KEY}_${userId}`;
    localStorage.setItem(key, JSON.stringify(data));
  }

  static loadDashboardData(userId: string): DashboardData | null {
    const key = `${this.STORAGE_KEY}_${userId}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  }

  static updateData(userId: string, newData: any[], type: string, action: 'replace' | 'add'): void {
    const existing = this.loadDashboardData(userId);
    const currentData = existing || {
      financial: [],
      projects: [],
      clients: [],
      cashflow: [],
      lastUpdated: new Date().toISOString()
    };

    switch (type) {
      case 'financial':
        if (action === 'replace') {
          currentData.financial = newData as FinancialData[];
        } else {
          // Check for duplicates by month
          const existingMonths = currentData.financial.map(d => d.month);
          const newItem = newData[0] as FinancialData;
          const existingIndex = currentData.financial.findIndex(d => d.month === newItem.month);
          
          if (existingIndex >= 0) {
            currentData.financial[existingIndex] = newItem;
          } else {
            currentData.financial.push(newItem);
          }
        }
        break;

      case 'projects':
        if (action === 'replace') {
          currentData.projects = newData as ProjectHours[];
        } else {
          currentData.projects.push(...(newData as ProjectHours[]));
        }
        break;

      case 'clients':
        if (action === 'replace') {
          currentData.clients = newData as ClientEarnings[];
        } else {
          // Check for duplicates by client name
          const newItem = newData[0] as ClientEarnings;
          const existingIndex = currentData.clients.findIndex(d => d.client === newItem.client);
          
          if (existingIndex >= 0) {
            currentData.clients[existingIndex] = newItem;
          } else {
            currentData.clients.push(newItem);
          }
        }
        break;

      case 'cashflow':
        if (action === 'replace') {
          currentData.cashflow = newData as CashFlowData[];
        } else {
          currentData.cashflow.push(...(newData as CashFlowData[]));
          // Sort by date
          currentData.cashflow.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        }
        break;
    }

    currentData.lastUpdated = new Date().toISOString();
    this.saveDashboardData(userId, currentData);
  }

  static exportData(userId: string): string {
    const data = this.loadDashboardData(userId);
    return JSON.stringify(data, null, 2);
  }

  static clearData(userId: string): void {
    const key = `${this.STORAGE_KEY}_${userId}`;
    localStorage.removeItem(key);
  }
}