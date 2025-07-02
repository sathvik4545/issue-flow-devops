
import React, { useState, useCallback, useMemo } from "react";
import { CreateIssueDialog } from "@/components/CreateIssueDialog";
import { IssueDetailsDialog } from "@/components/IssueDetailsDialog";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardStats } from "@/components/DashboardStats";
import { DashboardFilters } from "@/components/DashboardFilters";
import { DashboardIssuesList } from "@/components/DashboardIssuesList";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import { useIssues } from "@/hooks/useIssues";

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

const Dashboard = () => {
  const {
    issues,
    loading: issuesLoading,
    addIssue,
    updateIssue,
    deleteIssue,
    getFilteredIssues,
    getStatusCounts
  } = useIssues();

  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const { user, logout } = useAuth();
  const { showSuccess, showInfo } = useNotifications();
  const navigate = useNavigate();

  const filteredIssues = useMemo(() => {
    return getFilteredIssues(searchTerm, statusFilter);
  }, [getFilteredIssues, searchTerm, statusFilter]);

  const statusCounts = useMemo(() => {
    return getStatusCounts;
  }, [getStatusCounts]);

  const handleLogout = useCallback(() => {
    logout();
    showSuccess("Logged out successfully");
    navigate("/");
  }, [logout, showSuccess, navigate]);

  const handleNotifications = useCallback(() => {
    showInfo("No new notifications");
  }, [showInfo]);

  const handleCreateIssue = useCallback((newIssue: any) => {
    const issue = addIssue({
      ...newIssue,
      assignee: user?.name || "Current User"
    });
    setShowCreateDialog(false);
    showSuccess("Issue created successfully!");
  }, [addIssue, user?.name, showSuccess]);

  const handleIssueClick = useCallback((issue: Issue) => {
    setSelectedIssue(issue);
    setShowDetailsDialog(true);
  }, []);

  const handleUpdateIssue = useCallback((updatedIssue: Issue) => {
    updateIssue(updatedIssue);
    setShowDetailsDialog(false);
    showSuccess("Issue updated successfully!");
  }, [updateIssue, showSuccess]);

  const handleDeleteIssue = useCallback((issueId: string) => {
    deleteIssue(issueId);
    setShowDetailsDialog(false);
    showSuccess("Issue deleted successfully!");
  }, [deleteIssue, showSuccess]);

  const handleStatusFilterChange = useCallback((status: string) => {
    setStatusFilter(status);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  if (issuesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <DashboardHeader
        userName={user?.name}
        onNotifications={handleNotifications}
        onLogout={handleLogout}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardStats statusCounts={statusCounts} />
        
        <DashboardFilters
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          onSearchChange={handleSearchChange}
          onStatusFilterChange={handleStatusFilterChange}
          onCreateIssue={() => setShowCreateDialog(true)}
        />

        <DashboardIssuesList
          filteredIssues={filteredIssues}
          onIssueClick={handleIssueClick}
        />
      </div>

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
