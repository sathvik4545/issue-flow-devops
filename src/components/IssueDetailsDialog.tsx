
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Save, X } from "lucide-react";

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

interface IssueDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  issue: Issue;
  onUpdateIssue: (issue: Issue) => void;
  onDeleteIssue: (issueId: string) => void;
}

export const IssueDetailsDialog = ({ 
  open, 
  onOpenChange, 
  issue, 
  onUpdateIssue, 
  onDeleteIssue 
}: IssueDetailsDialogProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedIssue, setEditedIssue] = useState(issue);

  const handleSave = () => {
    onUpdateIssue(editedIssue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedIssue(issue);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this issue?")) {
      onDeleteIssue(issue.id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Issue Details</DialogTitle>
            <div className="flex items-center space-x-2">
              {!isEditing ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDelete}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSave}
                    className="text-green-600 hover:text-green-700"
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label>Title</Label>
            {isEditing ? (
              <Input
                value={editedIssue.title}
                onChange={(e) => setEditedIssue({ ...editedIssue, title: e.target.value })}
              />
            ) : (
              <h2 className="text-xl font-semibold">{issue.title}</h2>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            {isEditing ? (
              <Textarea
                value={editedIssue.description}
                onChange={(e) => setEditedIssue({ ...editedIssue, description: e.target.value })}
                className="min-h-[100px]"
              />
            ) : (
              <p className="text-muted-foreground whitespace-pre-wrap">
                {issue.description || "No description provided"}
              </p>
            )}
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              {isEditing ? (
                <Select 
                  value={editedIssue.status} 
                  onValueChange={(value) => setEditedIssue({ ...editedIssue, status: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge variant="outline" className="w-fit">
                  {issue.status === "in-progress" ? "In Progress" : issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              {isEditing ? (
                <Select 
                  value={editedIssue.priority} 
                  onValueChange={(value) => setEditedIssue({ ...editedIssue, priority: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge variant="outline" className="w-fit">
                  {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
                </Badge>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="border-t pt-4 space-y-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="text-xs text-muted-foreground">Assignee</Label>
                <p>{issue.assignee}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Issue ID</Label>
                <p className="font-mono">{issue.id}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Created</Label>
                <p>{formatDate(issue.createdAt)}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Last Updated</Label>
                <p>{formatDate(issue.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
