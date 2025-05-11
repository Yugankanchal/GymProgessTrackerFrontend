import React from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { Calendar } from 'lucide-react';
import { useWorkoutStore } from '../../store/workoutStore';

const WorkoutCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const { workouts } = useWorkoutStore();

  const renderWeek = (startDate: Date) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = addDays(startDate, i);
      const formattedDate = format(currentDate, 'yyyy-MM-dd');
      const workout = workouts[formattedDate];
      
      days.push(
        <div
          key={i}
          className={`p-4 border rounded-lg cursor-pointer transition-all ${
            isSameDay(currentDate, selectedDate)
              ? 'bg-blue-500 text-white'
              : workout?.isRestDay
              ? 'bg-gray-100'
              : workout?.exercises.length
              ? 'bg-green-100'
              : 'hover:bg-gray-50'
          }`}
          onClick={() => setSelectedDate(currentDate)}
        >
          <div className="text-sm font-medium">{format(currentDate, 'EEE')}</div>
          <div className="text-lg">{format(currentDate, 'd')}</div>
          {workout?.exercises.length > 0 && (
            <div className="text-xs mt-1">
              {workout.exercises.length} exercises
            </div>
          )}
          {workout?.isRestDay && (
            <div className="text-xs mt-1">Rest Day</div>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-semibold">Workout Calendar</h2>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {renderWeek(startOfWeek(selectedDate))}
      </div>
    </div>
  );
};

export default WorkoutCalendar;