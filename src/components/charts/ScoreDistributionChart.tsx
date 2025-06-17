import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import type { Task } from "@/pages/Index";

interface ScoreDistributionChartProps {
  task: Task;
}

export const ScoreDistributionChart = ({ task }: ScoreDistributionChartProps) => {
  // Transform webhook data for score distribution
  const data = task.scoreRanges ? Object.entries(task.scoreRanges).map(([range, count]) => ({
    range,
    count,
    // percentage can be calculated if needed, but not strictly required by the chart as is
  })) : [];

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
          <XAxis 
            dataKey="range" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#374151',
              border: 'none',
              borderRadius: '8px',
              color: '#F9FAFB'
            }}
            formatter={(value: number) => [`${value} leads`, 'Count']}
          />
          <Bar 
            dataKey="count" 
            fill="url(#scoreGradient)"
            radius={[2, 2, 0, 0]}
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
