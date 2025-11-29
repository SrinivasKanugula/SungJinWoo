import { useState } from "react";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { WorkoutDay } from "@shared/types";

interface WorkoutDisplayProps {
  workout: WorkoutDay | null;
  onWorkoutComplete: () => void;
}

export function WorkoutDisplay({ workout, onWorkoutComplete }: WorkoutDisplayProps) {
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(
    new Set()
  );

  if (!workout) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No workout scheduled for today</p>
      </div>
    );
  }

  const handleExerciseComplete = (exerciseId: string) => {
    const newCompleted = new Set(completedExercises);
    newCompleted.add(exerciseId);
    setCompletedExercises(newCompleted);

    // Check if all exercises are completed
    if (newCompleted.size === workout.exercises.length) {
      setTimeout(() => {
        onWorkoutComplete();
      }, 500);
    }
  };

  const allCompleted = completedExercises.size === workout.exercises.length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold glow-text-accent mb-2">
          {workout.day}'s Workout
        </h2>
        <p className="text-purple-300/70">
          {workout.exercises.length} exercises to complete
        </p>
      </div>

      <div className="space-y-3">
        {workout.exercises.map((exercise) => {
          const isCompleted = completedExercises.has(exercise.id);

          return (
            <div
              key={exercise.id}
              className={`p-4 rounded-lg border-2 transition-all glass-effect ${
                isCompleted
                  ? "border-purple-400/50 glow-primary bg-purple-500/10"
                  : "border-purple-500/30 hover:border-purple-400/50 hover:glow-primary"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-purple-300">{exercise.name}</h3>
                  <p className="text-sm text-purple-300/60">
                    {exercise.sets} sets × {exercise.reps} reps
                  </p>
                </div>

                <Button
                  onClick={() => handleExerciseComplete(exercise.id)}
                  disabled={isCompleted}
                  className={`ml-4 ${
                    isCompleted
                      ? "bg-gradient-to-r from-purple-600 to-magenta-500 hover:from-purple-500 hover:to-magenta-400 text-white shadow-lg shadow-purple-500/40"
                      : "bg-gradient-to-r from-magenta-600 to-purple-500 hover:from-magenta-500 hover:to-purple-400 text-white shadow-lg shadow-magenta-500/40"
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Done
                    </>
                  ) : (
                    "I Did"
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {allCompleted && (
        <div className="p-4 glass-effect glow-primary border-purple-400/50 rounded-lg text-center">
          <p className="text-purple-300 font-semibold">
            ✓ All exercises completed!
          </p>
        </div>
      )}
    </div>
  );
}
