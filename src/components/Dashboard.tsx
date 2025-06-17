import { SummaryCard } from "@/components/SummaryCard";
import { AnalyticsSection } from "@/components/AnalyticsSection";
import { LeadsTable } from "@/components/LeadsTable";
import type { Task, Lead } from "@/pages/Index";

interface DashboardProps {
  task?: Task;
  leads: Lead[];
  onLeadSelect: (lead: Lead) => void;
}

export const Dashboard = ({ task, leads, onLeadSelect }: DashboardProps) => {
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };

  if (!task) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center p-8 rounded-lg bg-gray-800 border border-gray-700 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-300 mb-4">No Task Selected</h2>
          <p className="text-lg text-gray-500">Select a task from the sidebar to view detailed analytics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-700">
        <h1 className="text-4xl font-extrabold text-white">{task.Title}</h1>
      </div>

      <SummaryCard task={task} />
      <AnalyticsSection task={task} />
      <LeadsTable task={task} leads={leads} onLeadSelect={onLeadSelect} />
    </div>
  );
};
