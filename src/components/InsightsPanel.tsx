
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Award, Target, Zap } from "lucide-react";
import type { Task } from "@/pages/Index";

interface InsightsPanelProps {
  task: Task;
}

export const InsightsPanel = ({ task }: InsightsPanelProps) => {
  const insights = [
    {
      title: 'Top Performing Segments',
      icon: Award,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      data: [
        { label: 'SaaS Companies (100-500 employees)', score: 85 },
        { label: 'CTOs with 5+ years experience', score: 82 },
        { label: 'London-based executives', score: 78 }
      ]
    },
    {
      title: 'Quality Trends',
      icon: TrendingUp,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      data: [
        { label: 'Average score improvement', score: '+15%' },
        { label: 'Email verification rate', score: '87%' },
        { label: 'Research completeness', score: '94%' }
      ]
    },
    {
      title: 'Conversion Predictions',
      icon: Target,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      data: [
        { label: 'High conversion potential', score: '68 leads' },
        { label: 'Medium conversion potential', score: '124 leads' },
        { label: 'Requires nurturing', score: '55 leads' }
      ]
    },
    {
      title: 'AI Recommendations',
      icon: Zap,
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
      data: [
        { label: 'Focus on SaaS segment', score: '92% success' },
        { label: 'Prioritize verified emails', score: '3x response' },
        { label: 'Personalize for CTOs', score: '+40% engagement' }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {insights.map((insight) => {
        const Icon = insight.icon;
        
        return (
          <Card key={insight.title} className={`${insight.bgColor} border-gray-600`}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Icon className={`w-5 h-5 ${insight.color}`} />
                <h4 className="font-medium text-white text-sm">{insight.title}</h4>
              </div>
              
              <div className="space-y-2">
                {insight.data.map((item, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <span className="text-xs text-gray-400 flex-1 mr-2">{item.label}</span>
                    <span className={`text-xs font-medium ${insight.color}`}>{item.score}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
