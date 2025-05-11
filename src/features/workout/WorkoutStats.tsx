import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';
import { useWorkoutStore } from '../../store/workoutStore';
import { startOfWeek, endOfWeek, format } from 'date-fns';

const WorkoutStats: React.FC = () => {
  const getWorkoutsByDateRange = useWorkoutStore((state) => state.getWorkoutsByDateRange);
  
  const weekStart = startOfWeek(new Date());
  const weekEnd = endOfWeek(new Date());
  const weeklyWorkouts = getWorkoutsByDateRange(weekStart, weekEnd);
  
  const data = weeklyWorkouts.map((workout) => ({
    name: format(new Date(workout.date), 'EEE'),
    exercises: workout.exercises.length,
    isRest: workout.isRestDay,
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-semibold">Weekly Progress</h2>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="exercises"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WorkoutStats;