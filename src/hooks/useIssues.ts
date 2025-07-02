
import { useState, useEffect, useCallback, useMemo } from 'react';

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

const STORAGE_KEY = 'devtrack_issues';

// Mock initial data
const mockIssues: Issue[] = [
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

export const useIssues = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  // Load issues from localStorage
  useEffect(() => {
    try {
      const savedIssues = localStorage.getItem(STORAGE_KEY);
      if (savedIssues) {
        setIssues(JSON.parse(savedIssues));
      } else {
        setIssues(mockIssues);
      }
    } catch (error) {
      console.error('Error loading issues:', error);
      setIssues(mockIssues);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced save to localStorage
  useEffect(() => {
    if (!loading && issues.length > 0) {
      const timeoutId = setTimeout(() => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(issues));
        } catch (error) {
          console.error('Error saving issues:', error);
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [issues, loading]);

  const addIssue = useCallback((newIssue: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>) => {
    const issue: Issue = {
      ...newIssue,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setIssues(prev => [issue, ...prev]);
    return issue;
  }, []);

  const updateIssue = useCallback((updatedIssue: Issue) => {
    setIssues(prev => prev.map(issue => 
      issue.id === updatedIssue.id 
        ? { ...updatedIssue, updatedAt: new Date().toISOString() } 
        : issue
    ));
  }, []);

  const deleteIssue = useCallback((issueId: string) => {
    setIssues(prev => prev.filter(issue => issue.id !== issueId));
  }, []);

  const getFilteredIssues = useMemo(() => {
    return (searchTerm: string, statusFilter: string) => {
      return issues.filter(issue => {
        const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             issue.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
        return matchesSearch && matchesStatus;
      });
    };
  }, [issues]);

  const getStatusCounts = useMemo(() => {
    return {
      open: issues.filter(i => i.status === "open").length,
      inProgress: issues.filter(i => i.status === "in-progress").length,
      closed: issues.filter(i => i.status === "closed").length
    };
  }, [issues]);

  return {
    issues,
    loading,
    addIssue,
    updateIssue,
    deleteIssue,
    getFilteredIssues,
    getStatusCounts
  };
};
