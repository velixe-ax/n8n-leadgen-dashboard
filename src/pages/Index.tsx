import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { AITaskModal } from "@/components/AITaskModal";
import { LeadDetailModal } from "@/components/LeadDetailModal";

export interface Task {
  Id: number;
  Title: string;
  "Task-Status": 1 | 2 | 3;
  created_time: string;
  progress?: number;
  totalLeads?: number;
  deliverableEmails?: number;
  totalHotLeads?: number;
  coldLeads?: number;
  hotLeads?: number;
  warmLeads?: number;
  scoreRanges?: { [key: string]: number };
  checkpointStatus?: number;
}

export interface Lead {
  Id: number;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  companyName: string;
  score: number;
  verdict: 'hot' | 'warm' | 'cold';
  isAddedToInstantly?: boolean;
} 

const Index = () => {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('url for getting created tasks');
        const data = await response.json();
        if (data && data.data && Array.isArray(data.data.data)) {
          setTasks(data.data.data.map((task: any) => ({
            ...task,
            checkpointStatus: task['Checkpoint-Status'],
          })));
          if (data.data.data.length > 0) {
            setSelectedTask(data.data.data[0].Id.toString());
          }
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchTaskDetailsAndLeads = async () => {
      if (selectedTask) {
        setIsLoading(true);
        try {
          const response = await fetch(`url for loading task info| id=${selectedTask}`);
          const data = await response.json();

          if (data && data.data) {
            const { 
              "total-leads": totalLeads,
              "deliverable-email-count": deliverableEmails,
              "total-hot-leads": totalHotLeads,
              "cold-leads": coldLeads,
              "hot-leads": hotLeads,
              "warm-leads": warmLeads,
              "score-ranges": scoreRanges,
              leads: fetchedLeads
            } = data.data;

            setTasks(prevTasks => prevTasks.map(task => 
              task.Id.toString() === selectedTask ? 
              { 
                ...task, 
                totalLeads, 
                deliverableEmails, 
                totalHotLeads, 
                coldLeads, 
                hotLeads, 
                warmLeads,
                scoreRanges
              } : task
            ));

            const processedLeads: Lead[] = fetchedLeads.map((lead: any) => ({
              Id: lead.Id,
              firstName: lead['First Name'],
              lastName: lead['Last Name'],
              email: lead['E-mail'],
              title: lead.title,
              companyName: lead['Company name'],
              score: lead['Overall Score'] ? parseInt(lead['Overall Score'].split('/')[0]) : 0,
              verdict: lead.VERDICT ? lead.VERDICT.toLowerCase().replace(' lead', '') as 'hot' | 'warm' | 'cold' : 'cold',
              isAddedToInstantly: lead.isAddedToInstantly || false,
            }));
            setLeads(processedLeads);
          }
        } catch (error) {
          console.error("Failed to fetch task details or leads:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchTaskDetailsAndLeads();
  }, [selectedTask]);

  const currentTask = tasks.find(task => task.Id.toString() === selectedTask);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex w-full">
      <Sidebar
        tasks={tasks}
        selectedTask={selectedTask}
        onTaskSelect={setSelectedTask}
        onNewTask={() => setIsAIModalOpen(true)}
      />
      
      <main className="flex-1 p-6 overflow-auto">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-400 mb-2">Loading Task Data...</h2>
              <p className="text-gray-500">Please wait</p>
            </div>
          </div>
        ) : (
        <Dashboard 
          task={currentTask}
            leads={leads}
          onLeadSelect={setSelectedLead}
        />
        )}
      </main>

      <AITaskModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
      />

      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          isOpen={true}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
};

export default Index;
