
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter, Search, Bell, User, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { IssueCard } from "@/components/IssueCard";
import { CreateIssueDialog } from "@/components/CreateIssueDialog";
import { IssueDetailsDialog } from "@/components/IssueDetailsDialog";

// Mock data - will be replaced with Supabase data
const mockIssues = [
  {
    id: "1",
    title: "Fix login button alignment",
    description: "The login button is not properly aligned on mobile devices",
    status: "open",
    priority: "medium",
    assignee: "John Doe",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    title: "Implement dark mode",
    description: "Add dark mode support across the application",
    status: "in-progress",
    priority: "high",
    assignee: "Jane Smith",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-15T09:15:00Z"
  },
  {
    id: "3",
    title: "Database optimization",
    description: "Optimize database queries for better performance",
    status: "closed",
    priority: "critical",
    assignee: "Mike Johnson",
    createdAt: "2024-01-13T16:45:00Z",
    updatedAt: "2024-01-15T11:00:00Z"
  }
];

const Dashboard = () => {
  const [issues, setIssues] = useState(mockIssues);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateIssue = (newIssue) => {
    const issue = {
      ...newIssue,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignee: "Current User"
    };
    setIssues([issue, ...issues]);
    setShowCreateDialog(false);
  };

  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
    setShowDetailsDialog(true);
  };

  const handleUpdateIssue = (updatedIssue) => {
    setIssues(prev => prev.map(issue => 
      issue.id === updatedIssue.id ? { ...updatedIssue, updatedAt: new Date().toISOString() } : issue
    ));
    setShowDetailsDialog(false);
  };

  const handleDeleteIssue = (issueId) => {
    setIssues(prev => prev.filter(issue => issue.id !== issueId));
    setShowDetailsDialog(false);
  };

  const getStatusCounts = () => {
    return {
      open: issues.filter(i => i.status === "open").length,
      inProgress: issues.filter(i => i.status === "in-progress").length,
      closed: issues.filter(i => i.status === "closed").length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">DevTrack</h1>
              <Badge variant="secondary">v1.0</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{statusCounts.open}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{statusCounts.inProgress}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Closed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{statusCounts.closed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Actions and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
            >
              All
            </Button>
            <Button
              variant={statusFilter === "open" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("open")}
            >
              Open
            </Button>
            <Button
              variant={statusFilter === "in-progress" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("in-progress")}
            >
              In Progress
            </Button>
            <Button
              variant={statusFilter === "closed" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("closed")}
            >
              Closed
            </Button>
          </div>
          <Button onClick={() => setShowCreateDialog(true)} className="shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            New Issue
          </Button>
        </div>

        {/* Issues List */}
        <div className="space-y-4">
          {filteredIssues.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No issues found</p>
              </CardContent>
            </Card>
          ) : (
            filteredIssues.map(issue => (
              <IssueCard
                key={issue.id}
                issue={issue}
                onClick={() => handleIssueClick(issue)}
              />
            ))
          )}
        </div>
      </div>

      {/* Dialogs */}
      <CreateIssueDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onCreateIssue={handleCreateIssue}
      />
      
      {selectedIssue && (
        <IssueDetailsDialog
          open={showDetailsDialog}
          onOpenChange={setShowDetailsDialog}
          issue={selectedIssue}
          onUpdateIssue={handleUpdateIssue}
          onDeleteIssue={handleDeleteIssue}
        />
      )}
    </div>
  );
};

export default Dashboard;
