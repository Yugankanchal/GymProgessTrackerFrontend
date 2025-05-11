import React from 'react';
import WorkoutCalendar from '../features/workout/WorkoutCalendar';
import WorkoutForm from '../features/workout/WorkoutForm';
import WorkoutStats from '../features/workout/WorkoutStats';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="bg-white p-6 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900">Muscle Progress Tracker</h1>
          <p className="text-gray-600 mt-2">Track your fitness journey and muscle progress</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <WorkoutCalendar />
            <WorkoutStats />
          </div>
          <WorkoutForm />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;