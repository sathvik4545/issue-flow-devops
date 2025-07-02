
export interface Issue {
  id: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  assignee: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface CreateIssueData {
  title: string;
  description: string;
  priority: Issue['priority'];
  status: Issue['status'];
}

export interface StatusCounts {
  open: number;
  inProgress: number;
  closed: number;
}
