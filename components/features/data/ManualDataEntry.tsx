'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Plus, Save, Trash2 } from 'lucide-react';

interface ManualDataEntryProps {
  onDataAdded: (data: any, type: string) => void;
}

export default function ManualDataEntry({ onDataAdded }: ManualDataEntryProps) {
  // Financial Data Form
  const [financialForm, setFinancialForm] = useState({
    month: '',
    income: '',
    expenses: ''
  });

  // Project Hours Form
  const [projectForm, setProjectForm] = useState({
    project: '',
    client: '',
    hours: ''
  });

  // Client Earnings Form
  const [clientForm, setClientForm] = useState({
    client: '',
    earnings: '',
    projects: ''
  });

  // Cash Flow Form
  const [cashFlowForm, setCashFlowForm] = useState({
    date: '',
    amount: '',
    type: 'income' as 'income' | 'expense'
  });

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const handleFinancialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!financialForm.month || !financialForm.income || !financialForm.expenses) {
      toast.error('Please fill in all fields');
      return;
    }

    const income = parseFloat(financialForm.income);
    const expenses = parseFloat(financialForm.expenses);

    if (isNaN(income) || isNaN(expenses) || income < 0 || expenses < 0) {
      toast.error('Please enter valid positive numbers');
      return;
    }

    const data = {
      month: financialForm.month,
      income,
      expenses,
      netSavings: income - expenses
    };

    onDataAdded(data, 'financial');
    toast.success('Financial data added successfully');
    setFinancialForm({ month: '', income: '', expenses: '' });
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectForm.project || !projectForm.client || !projectForm.hours) {
      toast.error('Please fill in all fields');
      return;
    }

    const hours = parseFloat(projectForm.hours);
    if (isNaN(hours) || hours <= 0) {
      toast.error('Please enter valid hours');
      return;
    }

    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
    const data = {
      project: projectForm.project,
      client: projectForm.client,
      hours,
      color: colors[Math.floor(Math.random() * colors.length)]
    };

    onDataAdded(data, 'projects');
    toast.success('Project data added successfully');
    setProjectForm({ project: '', client: '', hours: '' });
  };

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clientForm.client || !clientForm.earnings || !clientForm.projects) {
      toast.error('Please fill in all fields');
      return;
    }

    const earnings = parseFloat(clientForm.earnings);
    const projects = parseInt(clientForm.projects);

    if (isNaN(earnings) || isNaN(projects) || earnings < 0 || projects <= 0) {
      toast.error('Please enter valid values');
      return;
    }

    const data = {
      client: clientForm.client,
      earnings,
      projects
    };

    onDataAdded(data, 'clients');
    toast.success('Client data added successfully');
    setClientForm({ client: '', earnings: '', projects: '' });
  };

  const handleCashFlowSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cashFlowForm.date || !cashFlowForm.amount) {
      toast.error('Please fill in all fields');
      return;
    }

    const amount = parseFloat(cashFlowForm.amount);
    if (isNaN(amount) || amount === 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    const data = {
      date: cashFlowForm.date,
      amount: cashFlowForm.type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
      type: cashFlowForm.type
    };

    onDataAdded(data, 'cashflow');
    toast.success('Cash flow entry added successfully');
    setCashFlowForm({ date: '', amount: '', type: 'income' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Manual Data Entry
        </CardTitle>
        <CardDescription>
          Add individual records to your dashboard data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="financial" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
          </TabsList>

          <TabsContent value="financial" className="space-y-4">
            <form onSubmit={handleFinancialSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="month">Month</Label>
                  <Select value={financialForm.month} onValueChange={(value) => setFinancialForm(prev => ({ ...prev, month: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map(month => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="income">Income ($)</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="0.00"
                    value={financialForm.income}
                    onChange={(e) => setFinancialForm(prev => ({ ...prev, income: e.target.value }))}
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expenses">Expenses ($)</Label>
                  <Input
                    id="expenses"
                    type="number"
                    placeholder="0.00"
                    value={financialForm.expenses}
                    onChange={(e) => setFinancialForm(prev => ({ ...prev, expenses: e.target.value }))}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Add Financial Record
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project">Project Name</Label>
                  <Input
                    id="project"
                    placeholder="Enter project name"
                    value={projectForm.project}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, project: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="client">Client Name</Label>
                  <Input
                    id="client"
                    placeholder="Enter client name"
                    value={projectForm.client}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, client: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hours">Hours</Label>
                  <Input
                    id="hours"
                    type="number"
                    placeholder="0"
                    value={projectForm.hours}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, hours: e.target.value }))}
                    min="0"
                    step="0.5"
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Add Project Record
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="clients" className="space-y-4">
            <form onSubmit={handleClientSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    placeholder="Enter client name"
                    value={clientForm.client}
                    onChange={(e) => setClientForm(prev => ({ ...prev, client: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="earnings">Total Earnings ($)</Label>
                  <Input
                    id="earnings"
                    type="number"
                    placeholder="0.00"
                    value={clientForm.earnings}
                    onChange={(e) => setClientForm(prev => ({ ...prev, earnings: e.target.value }))}
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="projectCount">Number of Projects</Label>
                  <Input
                    id="projectCount"
                    type="number"
                    placeholder="1"
                    value={clientForm.projects}
                    onChange={(e) => setClientForm(prev => ({ ...prev, projects: e.target.value }))}
                    min="1"
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Add Client Record
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="cashflow" className="space-y-4">
            <form onSubmit={handleCashFlowSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={cashFlowForm.date}
                    onChange={(e) => setCashFlowForm(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={cashFlowForm.amount}
                    onChange={(e) => setCashFlowForm(prev => ({ ...prev, amount: e.target.value }))}
                    step="0.01"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={cashFlowForm.type} onValueChange={(value: 'income' | 'expense') => setCashFlowForm(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Add Cash Flow Entry
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}