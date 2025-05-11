import { create } from 'zustand';
import { format } from 'date-fns';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  muscleGroup: string;
}

interface WorkoutDay {
  date: string;
  exercises: Exercise[];
  isRestDay: boolean;
}

interface WorkoutStore {
  workouts: Record<string, WorkoutDay>;
  addWorkout: (date: Date, exercises: Exercise[]) => void;
  markRestDay: (date: Date) => void;
  getWorkoutsByDateRange: (startDate: Date, endDate: Date) => WorkoutDay[];
}

export const useWorkoutStore = create<WorkoutStore>((set, get) => ({
  workouts: {},
  
  addWorkout: (date, exercises) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    set((state) => ({
      workouts: {
        ...state.workouts,
        [formattedDate]: {
          date: formattedDate,
          exercises,
          isRestDay: false,
        },
      },
    }));
  },
  
  markRestDay: (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    set((state) => ({
      workouts: {
        ...state.workouts,
        [formattedDate]: {
          date: formattedDate,
          exercises: [],
          isRestDay: true,
        },
      },
    }));
  },
  
  getWorkoutsByDateRange: (startDate, endDate) => {
    const workouts = get().workouts;
    const result: WorkoutDay[] = [];
    let currentDate = startDate;
    
    while (currentDate <= endDate) {
      const formattedDate = format(currentDate, 'yyyy-MM-dd');
      result.push(
        workouts[formattedDate] || {
          date: formattedDate,
          exercises: [],
          isRestDay: false,
        }
      );
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }
    
    return result;
  },
}));