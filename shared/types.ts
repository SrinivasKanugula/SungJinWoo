export interface SetupData {
  dailyWaterGoal: number;
  initialWeight: number;
  height: number;
  countdownDays: number;
  workoutRoutine: WorkoutDay[];
  setupComplete: boolean;
}

export interface WorkoutDay {
  day: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  completed: boolean;
}

export interface DailyData {
  date: string;
  countdownDay: number;
  weight?: number;
  pushups?: number;
  situps?: number;
  workoutCompleted: boolean;
  nutrition: {
    calories: number;
    protein: number;
    water: number;
  };
}

export interface HistoricalData {
  date: string;
  countdownDay: number;
  weight: number;
  pushups: number;
  situps: number;
  nutrition: {
    calories: number;
    protein: number;
    water: number;
  };
}

export interface User {
  setup: SetupData;
  dailyData: DailyData[];
  historicalData: HistoricalData[];
  lastReset: string;
}
