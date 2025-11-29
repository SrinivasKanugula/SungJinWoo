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
import { Activity, Settings as SettingsIcon } from "lucide-react";

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
      <div className="min-h-screen bg-gradient-to-br from-background via-slate-900 to-slate-800 flex items-center justify-center p-4 tech-grid">
        <div className="text-center space-y-6">
          <Activity className="w-16 h-16 text-purple-400 mx-auto animate-purple-glow" />
          <h1 className="text-4xl font-bold glow-text-accent">Welcome to FitPulse</h1>
          <p className="text-purple-300/70 max-w-md">
            Your Solo Levelling-inspired fitness transformation journey starts
            here
          </p>
          <Button
            onClick={() => navigate("/setup")}
            className="glow-button bg-gradient-to-r from-purple-600 to-magenta-500 hover:from-purple-500 hover:to-magenta-400 text-white px-8 h-12 text-lg font-semibold shadow-lg shadow-purple-500/40"
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
      <div className="border-b border-purple-500/20 glass-effect sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold glow-text-accent truncate">FitPulse</h1>
            <p className="text-xs text-purple-300/60">
              Day {todayData.countdownDay} / {user.setup.countdownDays}
            </p>
          </div>
          <div className="flex gap-1 sm:gap-2 flex-shrink-0">
            <Button
              onClick={() => navigate("/analysis")}
              variant="outline"
              className="glow-button border-purple-500/40 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200 hover:border-purple-400/60 transition-all text-xs sm:text-sm px-2 sm:px-4 h-8 sm:h-10"
            >
              <span className="hidden sm:inline">View Progress</span>
              <span className="sm:hidden">Progress</span>
            </Button>
            <Button
              onClick={() => navigate("/settings")}
              variant="outline"
              size="icon"
              className="glow-button border-purple-500/40 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200 hover:border-purple-400/60 transition-all h-8 w-8 sm:h-10 sm:w-10"
            >
              <SettingsIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
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
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="glass-effect glow-primary border-purple-500/40 rounded-xl p-8 text-center space-y-4 max-w-md">
              <p className="text-2xl font-bold glow-text-accent">
                Not enough... 💪
              </p>
              <p className="text-purple-300/70">
                Now focus on the nutrition
              </p>
            </div>
          </div>
        )}

        {/* Nutrition Message */}
        {showNutritionMessage && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="glass-effect glow-primary border-purple-500/40 rounded-xl p-8 text-center space-y-6 max-w-md">
              <p className="text-2xl font-bold glow-text-accent">
                Complete Your Day 🎯
              </p>
              <p className="text-purple-300/70">
                Log your nutrition to finish strong
              </p>
              <Button
                onClick={handleNutritionMessageClose}
                className="w-full bg-gradient-to-r from-purple-600 to-magenta-500 hover:from-purple-500 hover:to-magenta-400 text-white h-10 font-semibold shadow-lg shadow-purple-500/40"
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
              <div className="p-3 sm:p-4 glass-effect border-purple-500/30 rounded-lg glow-primary hover:border-purple-400/50 transition-all">
                <p className="text-purple-300/70 text-xs sm:text-sm">Weight</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-300">
                  {todayData.weight}kg
                </p>
              </div>
              <div className="p-3 sm:p-4 glass-effect border-purple-500/30 rounded-lg glow-primary hover:border-purple-400/50 transition-all">
                <p className="text-purple-300/70 text-xs sm:text-sm">Pushups</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-300">
                  {todayData.pushups || 0}
                </p>
              </div>
              <div className="p-3 sm:p-4 glass-effect border-purple-500/30 rounded-lg glow-primary hover:border-purple-400/50 transition-all">
                <p className="text-purple-300/70 text-xs sm:text-sm">Situps</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-300">
                  {todayData.situps || 0}
                </p>
              </div>
              <div className="p-3 sm:p-4 glass-effect border-purple-500/30 rounded-lg glow-primary hover:border-purple-400/50 transition-all">
                <p className="text-purple-300/70 text-xs sm:text-sm">Water</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-300">
                  {todayData.nutrition.water}ml
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold glow-text-accent">Continue Your Day</h3>
              <Button
                onClick={() => setCurrentStage("nutrition")}
                className="glow-button w-full bg-gradient-to-r from-purple-600 to-magenta-500 hover:from-purple-500 hover:to-magenta-400 text-white h-10 sm:h-12 font-semibold shadow-lg shadow-purple-500/40 text-sm sm:text-base"
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
