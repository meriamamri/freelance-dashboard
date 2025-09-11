'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Upload, FileText, Download } from 'lucide-react';

interface CSVImportProps {
  onDataImported: (data: any[], type: string) => void;
}

export default function CSVImport({ onDataImported }: CSVImportProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dataType, setDataType] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dataTypes = [
    { value: 'financial', label: 'Financial Data (Income/Expenses)' },
    { value: 'projects', label: 'Project Hours' },
    { value: 'clients', label: 'Client Earnings' },
    { value: 'cashflow', label: 'Cash Flow Data' }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setSelectedFile(file);
    } else {
      toast.error('Please select a valid CSV file');
    }
  };

  const parseCSV = (text: string): string[][] => {
    const lines = text.split('\n').filter(line => line.trim());
    return lines.map(line => {
      const result = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    });
  };

  const processFinancialData = (rows: string[][]) => {
    const headers = rows[0];
    const data = rows.slice(1);
    
    return data.map(row => ({
      month: row[0] || '',
      income: parseFloat(row[1]) || 0,
      expenses: parseFloat(row[2]) || 0,
      netSavings: parseFloat(row[3]) || (parseFloat(row[1]) || 0) - (parseFloat(row[2]) || 0)
    }));
  };

  const processProjectData = (rows: string[][]) => {
    const data = rows.slice(1);
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
    
    return data.map((row, index) => ({
      project: row[0] || '',
      client: row[1] || '',
      hours: parseFloat(row[2]) || 0,
      color: colors[index % colors.length]
    }));
  };

  const processClientData = (rows: string[][]) => {
    const data = rows.slice(1);
    
    return data.map(row => ({
      client: row[0] || '',
      earnings: parseFloat(row[1]) || 0,
      projects: parseInt(row[2]) || 1
    }));
  };

  const processCashFlowData = (rows: string[][]) => {
    const data = rows.slice(1);
    
    return data.map(row => ({
      date: row[0] || '',
      amount: parseFloat(row[1]) || 0,
      type: (row[2]?.toLowerCase() === 'expense' ? 'expense' : 'income') as 'income' | 'expense'
    }));
  };

  const handleImport = async () => {
    if (!selectedFile || !dataType) {
      toast.error('Please select a file and data type');
      return;
    }

    setIsProcessing(true);

    try {
      const text = await selectedFile.text();
      const rows = parseCSV(text);

      if (rows.length < 2) {
        toast.error('CSV file must contain at least a header row and one data row');
        return;
      }

      let processedData;
      switch (dataType) {
        case 'financial':
          processedData = processFinancialData(rows);
          break;
        case 'projects':
          processedData = processProjectData(rows);
          break;
        case 'clients':
          processedData = processClientData(rows);
          break;
        case 'cashflow':
          processedData = processCashFlowData(rows);
          break;
        default:
          throw new Error('Invalid data type');
      }

      onDataImported(processedData, dataType);
      toast.success(`Successfully imported ${processedData.length} records`);
      
      // Reset form
      setSelectedFile(null);
      setDataType('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast.error('Error processing CSV file. Please check the format.');
      console.error('CSV import error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadTemplate = (type: string) => {
    let csvContent = '';
    
    switch (type) {
      case 'financial':
        csvContent = 'Month,Income,Expenses,Net Savings\nJan,8500,3200,5300\nFeb,9200,3800,5400';
        break;
      case 'projects':
        csvContent = 'Project,Client,Hours\nE-commerce Platform,TechCorp,120\nMobile App,StartupX,85';
        break;
      case 'clients':
        csvContent = 'Client,Earnings,Projects\nTechCorp,24500,3\nStartupX,18200,2';
        break;
      case 'cashflow':
        csvContent = 'Date,Amount,Type\n2024-01-01,2500,income\n2024-01-05,-800,expense';
        break;
    }

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_template.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Import CSV Data
        </CardTitle>
        <CardDescription>
          Upload CSV files to import your financial data, project hours, or client information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="dataType">Data Type</Label>
          <Select value={dataType} onValueChange={setDataType}>
            <SelectTrigger>
              <SelectValue placeholder="Select data type to import" />
            </SelectTrigger>
            <SelectContent>
              {dataTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {dataType && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => downloadTemplate(dataType)}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
            <span className="text-sm text-muted-foreground">
              Download a sample CSV template for {dataTypes.find(t => t.value === dataType)?.label}
            </span>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="csvFile">CSV File</Label>
          <Input
            id="csvFile"
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            ref={fileInputRef}
          />
        </div>

        {selectedFile && (
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{selectedFile.name}</span>
            <span className="text-xs text-muted-foreground">
              ({(selectedFile.size / 1024).toFixed(1)} KB)
            </span>
          </div>
        )}

        <Button
          onClick={handleImport}
          disabled={!selectedFile || !dataType || isProcessing}
          className="w-full"
        >
          {isProcessing ? 'Processing...' : 'Import Data'}
        </Button>

        <div className="text-xs text-muted-foreground space-y-1">
          <p><strong>CSV Format Requirements:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>First row must contain column headers</li>
            <li>Use commas to separate values</li>
            <li>Wrap text containing commas in quotes</li>
            <li>Dates should be in YYYY-MM-DD format</li>
            <li>Numbers should not contain currency symbols</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}