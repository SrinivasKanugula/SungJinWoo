import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { saveSetup } from "@/lib/storage";
import { SetupData, WorkoutDay, Exercise } from "@shared/types";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function Setup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [setup, setSetup] = useState<SetupData>({
    dailyWaterGoal: 2000,
    initialWeight: 70,
    height: 175,
    countdownDays: 10,
    workoutRoutine: days.map((day) => ({
      day,
      exercises: [],
    })),
    setupComplete: false,
  });

  const [currentExercise, setCurrentExercise] = useState({
    name: "",
    sets: 1,
    reps: 10,
  });

  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  const handleBasicInfo = () => {
    if (setup.dailyWaterGoal && setup.initialWeight && setup.height && setup.countdownDays) {
      setStep(2);
    }
  };

  const handleAddExercise = () => {
    if (!currentExercise.name.trim()) return;

    const newExercise: Exercise = {
      id: `${Date.now()}-${Math.random()}`,
      name: currentExercise.name,
      sets: currentExercise.sets,
      reps: currentExercise.reps,
      completed: false,
    };

    const updatedRoutine = [...setup.workoutRoutine];
    updatedRoutine[currentDayIndex].exercises.push(newExercise);

    setSetup({ ...setup, workoutRoutine: updatedRoutine });
    setCurrentExercise({ name: "", sets: 1, reps: 10 });
  };

  const handleRemoveExercise = (exerciseId: string) => {
    const updatedRoutine = [...setup.workoutRoutine];
    updatedRoutine[currentDayIndex].exercises = updatedRoutine[
      currentDayIndex
    ].exercises.filter((e) => e.id !== exerciseId);

    setSetup({ ...setup, workoutRoutine: updatedRoutine });
  };

  const handleNextDay = () => {
    if (currentDayIndex < days.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
    } else {
      setStep(3);
    }
  };

  const handlePreviousDay = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
    }
  };

  const handleComplete = () => {
    saveSetup(setup);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-900 to-slate-800 flex items-center justify-center p-3 sm:p-4 tech-grid">
      <div className="w-full max-w-2xl px-0 sm:px-4">
        {/* Progress indicator */}
        <div className="mb-8 flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-colors ${
                s <= step ? "bg-gradient-to-r from-purple-500 to-magenta-500" : "bg-slate-700/50"
              }`}
            />
          ))}
        </div>

        <Card className="glass-effect glow-primary border-purple-500/40 bg-black/30 backdrop-blur-xl mx-3 sm:mx-0">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl glow-text-accent">
              {step === 1
                ? "Fitness Transformation Setup"
                : step === 2
                  ? "Workout Routine"
                  : "Review & Start"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="water" className="text-purple-300">Daily Water Goal (ml)</Label>
                  <Input
                    id="water"
                    type="number"
                    value={setup.dailyWaterGoal}
                    onChange={(e) =>
                      setSetup({
                        ...setup,
                        dailyWaterGoal: Number(e.target.value),
                      })
                    }
                    className="bg-purple-950/40 border-purple-500/30 text-purple-300 placeholder-purple-600/50 focus:border-purple-300/60 focus:ring-purple-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-purple-300">Current Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={setup.initialWeight}
                    onChange={(e) =>
                      setSetup({
                        ...setup,
                        initialWeight: Number(e.target.value),
                      })
                    }
                    className="bg-purple-950/40 border-purple-500/30 text-purple-300 placeholder-purple-600/50 focus:border-purple-300/60 focus:ring-purple-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height" className="text-purple-300">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={setup.height}
                    onChange={(e) =>
                      setSetup({ ...setup, height: Number(e.target.value) })
                    }
                    className="bg-purple-950/40 border-purple-500/30 text-purple-300 placeholder-purple-600/50 focus:border-purple-300/60 focus:ring-purple-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="countdown" className="text-purple-300">Countdown Days</Label>
                  <Input
                    id="countdown"
                    type="number"
                    value={setup.countdownDays}
                    onChange={(e) =>
                      setSetup({
                        ...setup,
                        countdownDays: Number(e.target.value),
                      })
                    }
                    className="bg-purple-950/40 border-purple-500/30 text-purple-300 placeholder-purple-600/50 focus:border-purple-300/60 focus:ring-purple-500/20"
                  />
                </div>

                <Button
                  onClick={handleBasicInfo}
                  className="w-full glow-button bg-gradient-to-r from-purple-600 to-magenta-500 hover:from-purple-500 hover:to-magenta-400 text-white font-semibold shadow-lg shadow-purple-500/40 h-10 sm:h-12 text-sm sm:text-base"
                >
                  Next
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="text-sm text-muted-foreground mb-4">
                  Day {currentDayIndex + 1} of {days.length}
                </div>
                <h3 className="text-lg font-semibold text-purple-300">
                  {setup.workoutRoutine[currentDayIndex].day}
                </h3>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="exercise" className="text-purple-300">Exercise Name</Label>
                    <Input
                      id="exercise"
                      value={currentExercise.name}
                      onChange={(e) =>
                        setCurrentExercise({
                          ...currentExercise,
                          name: e.target.value,
                        })
                      }
                      placeholder="e.g., Bench Press"
                      className="bg-purple-950/40 border-purple-500/30 text-purple-300 placeholder-purple-600/50 focus:border-purple-300/60 focus:ring-purple-500/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="sets" className="text-purple-300">Sets</Label>
                      <Input
                        id="sets"
                        type="number"
                        min="1"
                        value={currentExercise.sets}
                        onChange={(e) =>
                          setCurrentExercise({
                            ...currentExercise,
                            sets: Number(e.target.value),
                          })
                        }
                        className="bg-purple-950/40 border-purple-500/30 text-purple-300 placeholder-purple-600/50 focus:border-purple-300/60 focus:ring-purple-500/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reps" className="text-purple-300">Reps</Label>
                      <Input
                        id="reps"
                        type="number"
                        min="1"
                        value={currentExercise.reps}
                        onChange={(e) =>
                          setCurrentExercise({
                            ...currentExercise,
                            reps: Number(e.target.value),
                          })
                        }
                        className="bg-purple-950/40 border-purple-500/30 text-purple-300 placeholder-purple-600/50 focus:border-purple-300/60 focus:ring-purple-500/20"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleAddExercise}
                    variant="outline"
                    className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200 hover:border-purple-300/60 transition-all"
                  >
                    Add Exercise
                  </Button>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {setup.workoutRoutine[currentDayIndex].exercises.map(
                    (exercise) => (
                      <div
                        key={exercise.id}
                        className="p-3 bg-muted/50 rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium text-purple-300">{exercise.name}</p>
                          <p className="text-sm text-purple-300/60">
                            {exercise.sets} sets × {exercise.reps} reps
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveExercise(exercise.id)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          ×
                        </button>
                      </div>
                    )
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handlePreviousDay}
                    variant="outline"
                    disabled={currentDayIndex === 0}
                    className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 hover:text-blue-200 disabled:opacity-50"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleNextDay}
                    className="flex-1 glow-button bg-gradient-to-r from-purple-600 to-magenta-500 hover:from-purple-500 hover:to-magenta-400 text-white font-semibold shadow-lg shadow-purple-500/40"
                  >
                    {currentDayIndex === days.length - 1
                      ? "Review"
                      : "Next Day"}
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-3 p-4 glass-effect border-purple-500/30 rounded-lg glow-accent">
                  <h4 className="font-semibold text-purple-300">Summary</h4>
                  <div className="text-sm space-y-1 text-purple-300/70">
                    <p>Daily Water Goal: {setup.dailyWaterGoal} ml</p>
                    <p>Current Weight: {setup.initialWeight} kg</p>
                    <p>Height: {setup.height} cm</p>
                    <p>Countdown: {setup.countdownDays} days</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-purple-300">Workout Days</h4>
                  {setup.workoutRoutine.map((day) => (
                    <div key={day.day} className="p-3 glass-effect border-blue-500/30 rounded-lg hover:border-purple-300/50 transition-all">
                      <p className="font-medium text-purple-300">{day.day}</p>
                      <p className="text-sm text-purple-300/60">
                        {day.exercises.length} exercises
                      </p>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handleComplete}
                  className="glow-button w-full bg-gradient-to-r from-purple-600 to-magenta-500 hover:from-purple-500 hover:to-magenta-400 text-white h-12 text-lg font-semibold shadow-lg shadow-purple-500/40"
                >
                  Start Your Journey
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
