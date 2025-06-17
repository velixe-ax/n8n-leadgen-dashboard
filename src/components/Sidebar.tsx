import { Plus, Clock, Loader2, CheckCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Task } from "@/pages/Index";

interface SidebarProps {
  tasks: Task[];
  selectedTask: string | null;
  onTaskSelect: (taskId: string) => void;
  onNewTask: () => void;
}

export const Sidebar = ({ tasks, selectedTask, onTaskSelect, onNewTask }: SidebarProps) => {
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };

  const getStatusIcon = (status: Task['Task-Status']) => {
    switch (status) {
      case 1: // Pending
        return <Clock className="w-5 h-5 text-blue-400" />;
      case 2: // In Progress
        return <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" />;
      case 3: // Completed
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Task['Task-Status']) => {
    switch (status) {
      case 1:
        return 'border-l-blue-500';
      case 2:
        return 'border-l-yellow-500';
      case 3:
        return 'border-l-green-500';
      default:
        return 'border-l-gray-500';
    }
  };

  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6">Lead Generation Tasks</h2>
        <Button 
          onClick={onNewTask}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Task
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-4">
        {tasks.map((task) => (
          <div
            key={task.Id}
            onClick={() => onTaskSelect(task.Id.toString())}
            className={cn(
              "p-5 rounded-lg border-l-4 cursor-pointer transition-all duration-200 hover:bg-gray-700/50",
              getStatusColor(task['Task-Status']),
              selectedTask === task.Id.toString() 
                ? "bg-gray-700 shadow-lg" 
                : "bg-gray-800/50"
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getStatusIcon(task['Task-Status'])}
                <span className="font-semibold text-lg text-white">{task.Title}</span>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-400 mt-2">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-gray-300">{formatDateTime(task.created_time)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
