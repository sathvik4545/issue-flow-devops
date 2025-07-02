
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, User, LogOut, Activity } from "lucide-react";

interface DashboardHeaderProps {
  userName?: string;
  onNotifications: () => void;
  onLogout: () => void;
}

export const DashboardHeader = ({ userName, onNotifications, onLogout }: DashboardHeaderProps) => {
  return (
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
              Welcome, {userName}
            </span>
            <Button variant="ghost" size="sm" className="hover:bg-blue-50 transition-colors" onClick={onNotifications}>
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-blue-50 transition-colors">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-red-50 hover:text-red-600 transition-colors" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
