
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, AlertCircle, ArrowUp, ArrowDown, Minus } from "lucide-react";

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

interface OptimizedIssueCardProps {
  issue: Issue;
  onClick: (issue: Issue) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "open": return "bg-red-50 text-red-700 border-red-200 hover:bg-red-100";
    case "in-progress": return "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100";
    case "closed": return "bg-green-50 text-green-700 border-green-200 hover:bg-green-100";
    default: return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "low": return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100";
    case "medium": return "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100";
    case "high": return "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100";
    case "critical": return "bg-red-50 text-red-700 border-red-200 hover:bg-red-100";
    default: return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100";
  }
};

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case "low": return <ArrowDown className="h-3 w-3" />;
    case "medium": return <Minus className="h-3 w-3" />;
    case "high": return <ArrowUp className="h-3 w-3" />;
    case "critical": return <AlertCircle className="h-3 w-3" />;
    default: return <Minus className="h-3 w-3" />;
  }
};

const getStatusBorderColor = (status: string) => {
  switch (status) {
    case "open": return "border-l-red-500";
    case "in-progress": return "border-l-yellow-500";
    case "closed": return "border-l-green-500";
    default: return "border-l-gray-500";
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};

export const OptimizedIssueCard = React.memo<OptimizedIssueCardProps>(({ issue, onClick }) => {
  const handleClick = React.useCallback(() => {
    onClick(issue);
  }, [issue, onClick]);

  return (
    <Card 
      className={`cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 ${getStatusBorderColor(issue.status)} bg-white/80 backdrop-blur-sm border-0 shadow-lg group`}
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
              {issue.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-3 leading-relaxed">
              {issue.description}
            </p>
          </div>
          {issue.priority === "critical" && (
            <div className="flex items-center space-x-2 ml-4">
              <div className="p-1 bg-red-100 rounded-full">
                <AlertCircle className="h-4 w-4 text-red-500" />
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Badge className={`${getStatusColor(issue.status)} transition-colors font-medium`} variant="outline">
              {issue.status === "in-progress" ? "In Progress" : issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
            </Badge>
            <Badge className={`${getPriorityColor(issue.priority)} transition-colors font-medium flex items-center gap-1`} variant="outline">
              {getPriorityIcon(issue.priority)}
              {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1 bg-slate-50 px-2 py-1 rounded-full">
              <User className="h-3 w-3" />
              <span className="font-medium">{issue.assignee}</span>
            </div>
            <div className="flex items-center space-x-1 bg-slate-50 px-2 py-1 rounded-full">
              <Clock className="h-3 w-3" />
              <span>{formatDate(issue.updatedAt)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

OptimizedIssueCard.displayName = 'OptimizedIssueCard';
