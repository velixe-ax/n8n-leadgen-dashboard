import { CheckCircle, Loader2, Clock, Mail, Search, Users, Lightbulb } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { Task } from "@/pages/Index";

interface CheckpointTimelineProps {
  task: Task;
}

export const CheckpointTimeline = ({ task }: CheckpointTimelineProps) => {
  const checkpoints = [
    {
      id: 'getting-leads',
      title: 'Getting Leads',
      icon: Users,
      status: (task.checkpointStatus && task.checkpointStatus >= 1) ? 'completed' : 'pending',
      progress: (task.checkpointStatus && task.checkpointStatus >= 1) ? 100 : 0,
      metrics: { count: task.totalLeads }
    },
    {
      id: 'verifying-emails',
      title: 'Verifying Emails', 
      icon: Mail,
      status: (task.checkpointStatus && task.checkpointStatus >= 2) ? 'completed' : 'pending',
      progress: (task.checkpointStatus && task.checkpointStatus >= 2) ? 100 : 0,
      metrics: { deliverableEmails: task.deliverableEmails, bounceRate: task.totalLeads - task.deliverableEmails  }
    },
    {
      id: 'researching-leads',
      title: 'Researching Leads',
      icon: Search,
      status: (task.checkpointStatus && task.checkpointStatus >= 3) ? 'completed' : 'pending',
      progress: (task.checkpointStatus && task.checkpointStatus >= 3) ? 100 : 0,
      metrics: { }
    },
    {
      id: 'creating-icebreakers',
      title: 'Creating Icebreakers',
      icon: Lightbulb,  
      status: (task.checkpointStatus && task.checkpointStatus >= 4) ? 'completed' : 'pending',
      progress: (task.checkpointStatus && task.checkpointStatus >= 4) ? 100 : 0,
      metrics: { }
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'active': // Active status will not be used, but keeping for getStatusIcon function signature
        return <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />;
      default:
        return <Clock className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'border-green-600 bg-green-900/20';
      case 'active': return 'border-blue-600 bg-blue-900/20';
      default: return 'border-gray-600 bg-gray-800/50';
    }
  };

  const getIconBgColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-900/30 border-green-600';
      case 'active': return 'bg-blue-900/30 border-blue-600';
      default: return 'bg-gray-800 border-gray-600';
    }
  };

  return (
    <div className="space-y-6 py-2">
      {checkpoints.map((checkpoint) => {
        const Icon = checkpoint.icon;
        
        return (
          <div key={checkpoint.id} className={`flex items-start space-x-5 p-5 rounded-lg border ${getStatusColor(checkpoint.status)}`}>
            <div className={`flex items-center justify-center w-14 h-14 rounded-full border-2 ${getIconBgColor(checkpoint.status)}`}>
              <Icon className="w-6 h-6" />
            </div>
            
            <div className="flex-1 pt-0.5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xl font-semibold text-white">{checkpoint.title}</h4>
                {getStatusIcon(checkpoint.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-base">
                {Object.entries(checkpoint.metrics).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
