
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Activity } from "lucide-react";

interface StatusCounts {
  open: number;
  inProgress: number;
  closed: number;
}

interface DashboardStatsProps {
  statusCounts: StatusCounts;
}

export const DashboardStats = ({ statusCounts }: DashboardStatsProps) => {
  return (
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
  );
};
