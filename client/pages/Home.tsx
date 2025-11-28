import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MorningModal } from "@/components/MorningModal";
import { LoggingModal } from "@/components/LoggingModal";
import { WorkoutDisplay } from "@/components/WorkoutDisplay";
import { NutritionTracker } from "@/components/NutritionTracker";
import { Button } from "@/components/ui/button";
import {
  getUser,
  getTodayData,
  updateTodayData,
  getWorkoutForToday,
  updateNutrition,
  getTodayDate,
  checkAndPerformDailyReset,
  updateExerciseCompletion,
} from "@/lib/storage";
import { Activity } from "lucide-react";

type LoggingStage = "weight" | "exercises" | "workout" | "nutrition" | "complete";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUser());
  const [todayData, setTodayData] = useState(getTodayData());
  const [currentStage, setCurrentStage] = useState<LoggingStage | "morning">(
    "morning"
  );
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [showNutritionMessage, setShowNutritionMessage] = useState(false);

  const today = getTodayDate();
  const hasLoggedToday = !!todayData.weight;

  useEffect(() => {
    checkAndPerformDailyReset();
  }, []);

  if (!user.setup.setupComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <Activity className="w-16 h-16 text-cyan-400 mx-auto animate-cyan-glow" />
          <h1 className="text-4xl font-bold glow-text-accent">Welcome to FitPulse</h1>
          <p className="text-cyan-300/70 max-w-md">
            Your Solo Levelling-inspired fitness transformation journey starts
            here
          </p>
          <Button
            onClick={() => navigate("/setup")}
            className="glow-button bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 px-8 h-12 text-lg font-semibold shadow-lg shadow-cyan-500/40"
          >
            Start Your Transformation
          </Button>
        </div>
      </div>
    );
  }

  const handleMorningStart = () => {
    setCurrentStage("weight");
  };

  const handleWeightLogged = (weight: number) => {
    updateTodayData({ weight });
    setTodayData(getTodayData());
    setCurrentStage("exercises");
  };

  const handleExercisesLogged = (pushups: number, situps: number) => {
    updateTodayData({ pushups, situps });
    setTodayData(getTodayData());
    setCurrentStage("workout");
  };

  const handleWorkoutComplete = () => {
    setShowCompletionMessage(true);
    setTimeout(() => {
      setShowCompletionMessage(false);
      setShowNutritionMessage(true);
    }, 2000);
  };

  const handleNutritionMessageClose = () => {
    setShowNutritionMessage(false);
    setCurrentStage("nutrition");
  };

  const handleCaloriesChange = (value: number) => {
    updateNutrition("calories", value);
    setTodayData(getTodayData());
  };

  const handleProteinChange = (value: number) => {
    updateNutrition("protein", value);
    setTodayData(getTodayData());
  };

  const handleWaterChange = (value: number) => {
    updateNutrition("water", value);
    setTodayData(getTodayData());
  };

  const workout = getWorkoutForToday();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-900 to-slate-800">
      {/* Header */}
      <div className="border-b border-cyan-500/20 bg-black/30 backdrop-blur-lg glass-effect sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold glow-text-accent">FitPulse</h1>
            <p className="text-xs text-cyan-300/60">
              Day {todayData.countdownDay} / {user.setup.countdownDays}
            </p>
          </div>
          <Button
            onClick={() => navigate("/analysis")}
            variant="outline"
            className="glow-button border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 hover:text-cyan-200 hover:border-cyan-400/60 transition-all"
          >
            View Progress
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Morning Modal */}
        <MorningModal
          open={currentStage === "morning" && !hasLoggedToday}
          countdownDay={todayData.countdownDay}
          totalDays={user.setup.countdownDays}
          onStart={handleMorningStart}
        />

        {/* Logging Modals */}
        <LoggingModal
          open={currentStage === "weight"}
          stage="weight"
          onWeightSubmit={handleWeightLogged}
          onSkip={() => setCurrentStage("exercises")}
        />

        <LoggingModal
          open={currentStage === "exercises"}
          stage="exercises"
          onExercisesSubmit={handleExercisesLogged}
          onSkip={() => setCurrentStage("workout")}
        />

        {/* Completion Message */}
        {showCompletionMessage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-accent rounded-xl p-8 text-center space-y-4 max-w-md">
              <p className="text-2xl font-bold text-accent">
                Not enough... 💪
              </p>
              <p className="text-muted-foreground">
                Now focus on the nutrition
              </p>
            </div>
          </div>
        )}

        {/* Nutrition Message */}
        {showNutritionMessage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-accent rounded-xl p-8 text-center space-y-6 max-w-md">
              <p className="text-2xl font-bold text-accent">
                Complete Your Day 🎯
              </p>
              <p className="text-muted-foreground">
                Log your nutrition to finish strong
              </p>
              <Button
                onClick={handleNutritionMessageClose}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-10"
              >
                Continue to Nutrition
              </Button>
            </div>
          </div>
        )}

        {/* Workout Section */}
        {currentStage === "workout" && (
          <div className="space-y-8 pb-8">
            <WorkoutDisplay
              workout={workout}
              onWorkoutComplete={handleWorkoutComplete}
            />
          </div>
        )}

        {/* Nutrition Section */}
        {currentStage === "nutrition" && (
          <div className="space-y-8 pb-8">
            <NutritionTracker
              calories={todayData.nutrition.calories}
              protein={todayData.nutrition.protein}
              water={todayData.nutrition.water}
              dailyWaterGoal={user.setup.dailyWaterGoal}
              onCaloriesChange={handleCaloriesChange}
              onProteinChange={handleProteinChange}
              onWaterChange={handleWaterChange}
            />
          </div>
        )}

        {/* Summary for logged day */}
        {hasLoggedToday && currentStage === "morning" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-card border border-primary/20 rounded-lg">
                <p className="text-muted-foreground text-sm">Weight</p>
                <p className="text-2xl font-bold text-accent">
                  {todayData.weight}kg
                </p>
              </div>
              <div className="p-4 bg-card border border-primary/20 rounded-lg">
                <p className="text-muted-foreground text-sm">Pushups</p>
                <p className="text-2xl font-bold text-accent">
                  {todayData.pushups || 0}
                </p>
              </div>
              <div className="p-4 bg-card border border-primary/20 rounded-lg">
                <p className="text-muted-foreground text-sm">Situps</p>
                <p className="text-2xl font-bold text-accent">
                  {todayData.situps || 0}
                </p>
              </div>
              <div className="p-4 bg-card border border-primary/20 rounded-lg">
                <p className="text-muted-foreground text-sm">Water</p>
                <p className="text-2xl font-bold text-accent">
                  {todayData.nutrition.water}ml
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Continue Your Day</h3>
              <Button
                onClick={() => setCurrentStage("nutrition")}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12"
              >
                Log Nutrition
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
