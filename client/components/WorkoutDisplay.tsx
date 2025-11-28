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
        <p className="text-cyan-300/70">
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
                  ? "border-cyan-400/50 glow-accent bg-cyan-500/10"
                  : "border-blue-500/30 hover:border-cyan-400/50 hover:glow-accent"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-cyan-300">{exercise.name}</h3>
                  <p className="text-sm text-cyan-300/60">
                    {exercise.sets} sets × {exercise.reps} reps
                  </p>
                </div>

                <Button
                  onClick={() => handleExerciseComplete(exercise.id)}
                  disabled={isCompleted}
                  className={`ml-4 ${
                    isCompleted
                      ? "bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/40"
                      : "bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-300 text-slate-950 shadow-lg shadow-blue-500/40"
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
        <div className="p-4 glass-effect glow-accent border-cyan-400/50 rounded-lg text-center">
          <p className="text-cyan-400 font-semibold">
            ✓ All exercises completed!
          </p>
        </div>
      )}
    </div>
  );
}
