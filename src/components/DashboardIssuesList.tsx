
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { OptimizedIssueCard } from "@/components/OptimizedIssueCard";

interface Issue {
  id: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  assignee: string;
  createdAt: string;
  updatedAt: string;
}

interface DashboardIssuesListProps {
  filteredIssues: Issue[];
  onIssueClick: (issue: Issue) => void;
}

export const DashboardIssuesList = ({ filteredIssues, onIssueClick }: DashboardIssuesListProps) => {
  if (filteredIssues.length === 0) {
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="py-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
            <Search className="h-8 w-8 text-slate-400" />
          </div>
          <p className="text-muted-foreground text-lg">No issues found</p>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {filteredIssues.map((issue, index) => (
        <div 
          key={issue.id} 
          className="animate-in slide-in-from-bottom-4"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <OptimizedIssueCard
            issue={issue}
            onClick={onIssueClick}
          />
        </div>
      ))}
    </div>
  );
};
