import React, { useState } from 'react';
import { Plus, Save } from 'lucide-react';
import { useWorkoutStore } from '../../store/workoutStore';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  muscleGroup: string;
}

const WorkoutForm: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const addWorkout = useWorkoutStore((state) => state.addWorkout);

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      {
        id: Date.now().toString(),
        name: '',
        sets: 3,
        reps: 10,
        weight: 0,
        muscleGroup: '',
      },
    ]);
  };

  const handleExerciseChange = (id: string, field: keyof Exercise, value: any) => {
    setExercises(
      exercises.map((exercise) =>
        exercise.id === id ? { ...exercise, [field]: value } : exercise
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWorkout(new Date(), exercises);
    setExercises([]);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg">
      <div className="space-y-4">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Exercise name"
              value={exercise.name}
              onChange={(e) =>
                handleExerciseChange(exercise.id, 'name', e.target.value)
              }
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Muscle group"
              value={exercise.muscleGroup}
              onChange={(e) =>
                handleExerciseChange(exercise.id, 'muscleGroup', e.target.value)
              }
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Sets"
              value={exercise.sets}
              onChange={(e) =>
                handleExerciseChange(exercise.id, 'sets', parseInt(e.target.value))
              }
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Reps"
              value={exercise.reps}
              onChange={(e) =>
                handleExerciseChange(exercise.id, 'reps', parseInt(e.target.value))
              }
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              value={exercise.weight}
              onChange={(e) =>
                handleExerciseChange(exercise.id, 'weight', parseFloat(e.target.value))
              }
              className="p-2 border rounded"
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={handleAddExercise}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Exercise
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Workout
        </button>
      </div>
    </form>
  );
};

export default WorkoutForm;