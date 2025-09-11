'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { useAuth } from '@/lib/auth';
import { 
  Sun, 
  Moon, 
  User, 
  Settings, 
  Download, 
  Upload,
  Menu,
  X,
  LogOut,
  Database
} from 'lucide-react';

interface HeaderProps {
  onExport: () => void;
  onImport: () => void;
  onDataManagement: () => void;
}

export default function Header({ onExport, onImport, onDataManagement }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold">FreelanceDash</h1>
          <nav className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">Dashboard</Button>
            <Button variant="ghost" size="sm">Projects</Button>
            <Button variant="ghost" size="sm">Clients</Button>
            <Button variant="ghost" size="sm">Reports</Button>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {user && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={onDataManagement}
                className="hidden sm:flex"
              >
                <Database className="h-4 w-4 mr-2" />
                Data
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={onImport}
                className="hidden sm:flex"
              >
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={onExport}
                className="hidden sm:flex"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </>
          )}

          {mounted && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          )}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  {user.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDataManagement} className="sm:hidden">
                  <Database className="h-4 w-4 mr-2" />
                  Data Management
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onImport} className="sm:hidden">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Data
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onExport} className="sm:hidden">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm">
              <User className="h-4 w-4" />
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <Button variant="ghost" size="sm" className="justify-start">Dashboard</Button>
            <Button variant="ghost" size="sm" className="justify-start">Projects</Button>
            <Button variant="ghost" size="sm" className="justify-start">Clients</Button>
            <Button variant="ghost" size="sm" className="justify-start">Reports</Button>
          </nav>
        </div>
      )}
    </header>
  );
}