import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter, Search, Bell, User, LogOut, TrendingUp, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";
import { IssueCard } from "@/components/IssueCard";
import { CreateIssueDialog } from "@/components/CreateIssueDialog";
import { IssueDetailsDialog } from "@/components/IssueDetailsDialog";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { useNavigate } from "react-router-dom";

// Mock data - will be replaced with Supabase data
const mockIssues = [
  {
    id: "1",
    title: "Fix login button alignment",
    description: "The login button is not properly aligned on mobile devices",
    status: "open" as const,
    priority: "medium" as const,
    assignee: "John Doe",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    title: "Implement dark mode",
    description: "Add dark mode support across the application",
    status: "in-progress" as const,
    priority: "high" as const,
    assignee: "Jane Smith",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-15T09:15:00Z"
  },
  {
    id: "3",
    title: "Database optimization",
    description: "Optimize database queries for better performance",
    status: "closed" as const,
    priority: "critical" as const,
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
  
  const { user, logout } = useAuth();
  const { showSuccess, showInfo } = useNotifications();
  const navigate = useNavigate();

  // Load issues from localStorage on mount
  useEffect(() => {
    const savedIssues = localStorage.getItem('devtrack_issues');
    if (savedIssues) {
      setIssues(JSON.parse(savedIssues));
    }
  }, []);

  // Save issues to localStorage whenever issues change
  useEffect(() => {
    localStorage.setItem('devtrack_issues', JSON.stringify(issues));
  }, [issues]);

  const handleLogout = () => {
    logout();
    showSuccess("Logged out successfully");
    navigate("/");
  };

  const handleNotifications = () => {
    showInfo("No new notifications");
  };

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
      assignee: user?.name || "Current User"
    };
    setIssues([issue, ...issues]);
    setShowCreateDialog(false);
    showSuccess("Issue created successfully!");
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
    showSuccess("Issue updated successfully!");
  };

  const handleDeleteIssue = (issueId) => {
    setIssues(prev => prev.filter(issue => issue.id !== issueId));
    setShowDetailsDialog(false);
    showSuccess("Issue deleted successfully!");
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <header className="border-b bg-white/70 backdrop-blur-lg shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  DevTrack
                </h1>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                v1.0
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-muted-foreground hidden sm:block">
                Welcome, {user?.name}
              </span>
              <Button variant="ghost" size="sm" className="hover:bg-blue-50 transition-colors" onClick={handleNotifications}>
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-blue-50 transition-colors">
                <User className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-red-50 hover:text-red-600 transition-colors" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-red-600 text-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-red-100">Open Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{statusCounts.open}</div>
              <div className="flex items-center mt-2 text-red-100">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">Needs attention</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-orange-500 text-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-yellow-100">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{statusCounts.inProgress}</div>
              <div className="flex items-center mt-2 text-yellow-100">
                <Activity className="h-4 w-4 mr-1" />
                <span className="text-sm">Active work</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-green-100">Closed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{statusCounts.closed}</div>
              <div className="flex items-center mt-2 text-green-100">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">Completed</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Actions and Filters */}
        <Card className="mb-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-0 bg-slate-50 focus:bg-white transition-colors"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("all")}
                  className="transition-all hover:scale-105"
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === "open" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("open")}
                  className="transition-all hover:scale-105"
                >
                  Open
                </Button>
                <Button
                  variant={statusFilter === "in-progress" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("in-progress")}
                  className="transition-all hover:scale-105"
                >
                  In Progress
                </Button>
                <Button
                  variant={statusFilter === "closed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("closed")}
                  className="transition-all hover:scale-105"
                >
                  Closed
                </Button>
              </div>
              <Button 
                onClick={() => setShowCreateDialog(true)} 
                className="shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all hover:scale-105 shadow-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Issue
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Issues List */}
        <div className="space-y-4">
          {filteredIssues.length === 0 ? (
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-slate-400" />
                </div>
                <p className="text-muted-foreground text-lg">No issues found</p>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
              </CardContent>
            </Card>
          ) : (
            filteredIssues.map((issue, index) => (
              <div 
                key={issue.id} 
                className="animate-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <IssueCard
                  issue={issue}
                  onClick={() => handleIssueClick(issue)}
                />
              </div>
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
