'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CSVImport from './CSVImport';
import ManualDataEntry from './ManualDataEntry';
import { Database, Upload, Edit } from 'lucide-react';

interface DataManagementProps {
  isOpen: boolean;
  onClose: () => void;
  onDataUpdate: (data: any[], type: string, action: 'replace' | 'add') => void;
}

export default function DataManagement({ isOpen, onClose, onDataUpdate }: DataManagementProps) {
  const handleDataImported = (data: any[], type: string) => {
    onDataUpdate(data, type, 'replace');
  };

  const handleDataAdded = (data: any, type: string) => {
    onDataUpdate([data], type, 'add');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Management
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="import" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="import" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Import CSV
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Manual Entry
            </TabsTrigger>
          </TabsList>

          <TabsContent value="import" className="mt-6">
            <CSVImport onDataImported={handleDataImported} />
          </TabsContent>

          <TabsContent value="manual" className="mt-6">
            <ManualDataEntry onDataAdded={handleDataAdded} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}