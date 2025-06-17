import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Target, TrendingUp } from "lucide-react";
import type { Task } from "@/pages/Index";

interface SummaryCardProps {
  task: Task;
}

export const SummaryCard = ({ task }: SummaryCardProps) => {
  const getStatusColor = (status: Task['Task-Status']) => {
    switch (status) {
      case 1: return 'text-blue-400'; // Pending
      case 2: return 'text-yellow-400'; // In Progress
      case 3: return 'text-emerald-400'; // Completed
      default: return 'text-gray-400';
    }
  };

  const getStatusText = (status: Task['Task-Status']) => {
    switch (status) {
      case 1: return 'Pending';
      case 2: return 'In Progress';
      case 3: return 'Completed';
      default: return 'Unknown';
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`text-2xl font-bold ${getStatusColor(task['Task-Status'])}`}>
              {getStatusText(task['Task-Status'])}
            </div>
            {task['Task-Status'] === 2 && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400">Processing...</span>
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700 text-white border-0"
            >
              <Play className="w-4 h-4 mr-2" />
              {task['Task-Status'] === 2 ? 'Pause' : 'Start'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 px-4">
          <div className="text-center py-4">
            <div className="flex items-center justify-center w-14 h-14 bg-blue-600/20 rounded-lg mb-4 mx-auto">
              <Target className="w-7 h-7 text-blue-400" />
            </div>
            <div className="text-4xl font-extrabold text-blue-400 mb-1">
              {task.totalLeads || (task['Task-Status'] === 2 ? task.totalLeads || 0 : '---')}
            </div>
            <div className="text-base text-gray-400">Total Leads</div>
          </div>

          <div className="text-center py-4">
            <div className="flex items-center justify-center w-14 h-14 bg-green-600/20 rounded-lg mb-4 mx-auto">
              <Target className="w-7 h-7 text-green-400" />
            </div>
            <div className="text-4xl font-extrabold text-green-400 mb-1">
              {task.deliverableEmails || (task['Task-Status'] === 2 ? task.deliverableEmails || 0 : '---')}
            </div>
            <div className="text-base text-gray-400">Deliverable Leads</div>
          </div>

          <div className="text-center py-4">
            <div className="flex items-center justify-center w-14 h-14 bg-purple-600/20 rounded-lg mb-4 mx-auto">
              <TrendingUp className="w-7 h-7 text-purple-400" />
            </div>
            <div className="text-4xl font-extrabold text-purple-400 mb-1">
              {task.totalHotLeads || (task['Task-Status'] === 2 ? task.totalHotLeads || 0 : '---')}
            </div>
            <div className="text-base text-gray-400">Total Hot Leads</div>
          </div>
        </div>

        {task['Task-Status'] === 2 && task.progress && (
          <div className="mt-8 px-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-400">Overall Progress</span>
              <span className="text-sm font-medium text-white">{task.progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
