
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

interface DashboardFiltersProps {
  searchTerm: string;
  statusFilter: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusFilterChange: (status: string) => void;
  onCreateIssue: () => void;
}

export const DashboardFilters = ({ 
  searchTerm, 
  statusFilter, 
  onSearchChange, 
  onStatusFilterChange, 
  onCreateIssue 
}: DashboardFiltersProps) => {
  return (
    <Card className="mb-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search issues..."
              value={searchTerm}
              onChange={onSearchChange}
              className="pl-10 border-0 bg-slate-50 focus:bg-white transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => onStatusFilterChange("all")}
              className="transition-all hover:scale-105"
            >
              All
            </Button>
            <Button
              variant={statusFilter === "open" ? "default" : "outline"}
              size="sm"
              onClick={() => onStatusFilterChange("open")}
              className="transition-all hover:scale-105"
            >
              Open
            </Button>
            <Button
              variant={statusFilter === "in-progress" ? "default" : "outline"}
              size="sm"
              onClick={() => onStatusFilterChange("in-progress")}
              className="transition-all hover:scale-105"
            >
              In Progress
            </Button>
            <Button
              variant={statusFilter === "closed" ? "default" : "outline"}
              size="sm"
              onClick={() => onStatusFilterChange("closed")}
              className="transition-all hover:scale-105"
            >
              Closed
            </Button>
          </div>
          <Button 
            onClick={onCreateIssue} 
            className="shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all hover:scale-105 shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Issue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
