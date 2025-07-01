
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, AlertCircle } from "lucide-react";

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

interface IssueCardProps {
  issue: Issue;
  onClick: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "open": return "bg-red-100 text-red-800 border-red-200";
    case "in-progress": return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "closed": return "bg-green-100 text-green-800 border-green-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "low": return "bg-blue-100 text-blue-800 border-blue-200";
    case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "high": return "bg-orange-100 text-orange-800 border-orange-200";
    case "critical": return "bg-red-100 text-red-800 border-red-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};

export const IssueCard = ({ issue, onClick }: IssueCardProps) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow duration-200 border-l-4 border-l-primary"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2 line-clamp-1">{issue.title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
              {issue.description}
            </p>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            {issue.priority === "critical" && (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Badge className={getStatusColor(issue.status)} variant="outline">
              {issue.status === "in-progress" ? "In Progress" : issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
            </Badge>
            <Badge className={getPriorityColor(issue.priority)} variant="outline">
              {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{issue.assignee}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{formatDate(issue.updatedAt)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
