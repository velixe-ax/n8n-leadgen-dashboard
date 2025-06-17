import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreDistributionChart } from "@/components/charts/ScoreDistributionChart";
import { VerdictChart } from "@/components/charts/VerdictChart";
import { CheckpointTimeline } from "@/components/CheckpointTimeline";
import type { Task } from "@/pages/Index";

interface AnalyticsSectionProps {
  task: Task;
} 

export const AnalyticsSection = ({ task }: AnalyticsSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Performance Overview */}
      <Card className="bg-gray-800 border-gray-700 p-4">
        <CardHeader className="pb-6">
          <CardTitle className="text-white text-2xl">Performance Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-300 mb-4">Score Distribution</h4>
            <ScoreDistributionChart task={task} />
            <p className="text-sm text-gray-400 mt-4 leading-relaxed">
            Our lead scoring system uses a 100-point scale that focuses on four key factors.
            Company Need for your solutions or tools (40%), 
            Decision-Maker Authority to make purchasing decisions (30%), 
            Engagement with relevant topics (20%), and Market Timing for implementation (10%). 
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-300 mb-4">Lead Quality Breakdown</h4>
            <VerdictChart task={task} />
          </div>
        </CardContent>
      </Card>

      {/* Checkpoint Timeline */}
      <Card className="bg-gray-800 border-gray-700 p-4">
        <CardHeader className="pb-6">
          <CardTitle className="text-white text-2xl">Process Timeline</CardTitle>
        </CardHeader>
        <CardContent className="py-6">
          <CheckpointTimeline task={task} />
        </CardContent>
      </Card>
    </div>
  );
};
