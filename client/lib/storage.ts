import { User, DailyData, HistoricalData, SetupData, WorkoutDay } from "@shared/types";

const STORAGE_KEY = "fitness_app_data";
const LAST_RESET_KEY = "fitness_last_reset";

const defaultUser: User = {
  setup: {
    dailyWaterGoal: 2000,
    initialWeight: 70,
    height: 175,
    countdownDays: 10,
    workoutRoutine: [],
    setupComplete: false,
  },
  dailyData: [],
  historicalData: [],
  lastReset: new Date().toISOString().split("T")[0],
};

export const getUser = (): User => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return defaultUser;
    return JSON.parse(data);
  } catch {
    return defaultUser;
  }
};

export const saveUser = (user: User): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Failed to save user data:", error);
  }
};

export const getTodayDate = (): string => {
  return new Date().toISOString().split("T")[0];
};

export const getCurrentCountdownDay = (): number => {
  const user = getUser();
  const today = getTodayDate();
  const lastReset = user.lastReset || getTodayDate();

  if (today === lastReset) {
    return user.dailyData[user.dailyData.length - 1]?.countdownDay || 1;
  }

  // Calculate new countdown day
  const lastData = user.dailyData[user.dailyData.length - 1];
  let newCountdownDay = (lastData?.countdownDay || 0) + 1;

  if (newCountdownDay > user.setup.countdownDays) {
    newCountdownDay = 1;
  }

  return newCountdownDay;
};

export const checkAndPerformDailyReset = (): boolean => {
  const user = getUser();
  const today = getTodayDate();
  const lastReset = user.lastReset || getTodayDate();

  if (today !== lastReset) {
    // Archive yesterday's data
    const yesterdayData = user.dailyData[user.dailyData.length - 1];
    if (yesterdayData && yesterdayData.weight !== undefined) {
      user.historicalData.push({
        date: yesterdayData.date,
        countdownDay: yesterdayData.countdownDay,
        weight: yesterdayData.weight,
        pushups: yesterdayData.pushups || 0,
        situps: yesterdayData.situps || 0,
        nutrition: yesterdayData.nutrition,
      });
    }

    // Reset daily data
    const newCountdownDay = getCurrentCountdownDay();
    const newDailyData: DailyData = {
      date: today,
      countdownDay: newCountdownDay,
      workoutCompleted: false,
      nutrition: {
        calories: 0,
        protein: 0,
        water: 0,
      },
    };

    user.dailyData = [newDailyData];
    user.lastReset = today;
    saveUser(user);
    return true;
  }

  return false;
};

export const getTodayData = (): DailyData => {
  checkAndPerformDailyReset();
  const user = getUser();
  const today = getTodayDate();

  let todayData = user.dailyData.find((d) => d.date === today);

  if (!todayData) {
    const newCountdownDay = getCurrentCountdownDay();
    todayData = {
      date: today,
      countdownDay: newCountdownDay,
      workoutCompleted: false,
      nutrition: {
        calories: 0,
        protein: 0,
        water: 0,
      },
    };
    user.dailyData.push(todayData);
    saveUser(user);
  }

  return todayData;
};

export const updateTodayData = (updates: Partial<DailyData>): void => {
  const user = getUser();
  const today = getTodayDate();

  let todayData = user.dailyData.find((d) => d.date === today);

  if (todayData) {
    Object.assign(todayData, updates);
  } else {
    todayData = {
      date: today,
      countdownDay: getCurrentCountdownDay(),
      workoutCompleted: false,
      nutrition: {
        calories: 0,
        protein: 0,
        water: 0,
      },
      ...updates,
    };
    user.dailyData.push(todayData);
  }

  saveUser(user);
};

export const updateNutrition = (
  type: "calories" | "protein" | "water",
  value: number
): void => {
  const user = getUser();
  const todayData = getTodayData();

  todayData.nutrition[type] = value;
  user.dailyData = user.dailyData.map((d) =>
    d.date === getTodayDate() ? todayData : d
  );

  saveUser(user);
};

export const getWorkoutForToday = (): WorkoutDay | null => {
  const user = getUser();
  const todayData = getTodayData();
  const dayOfWeek = new Date(todayData.date).getDay();
  const dayName = getDayName(dayOfWeek);

  return (
    user.setup.workoutRoutine.find((w) => w.day === dayName) || null
  );
};

const getDayName = (dayIndex: number): string => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[dayIndex];
};

export const updateExerciseCompletion = (exerciseId: string): void => {
  const user = getUser();
  const workout = getWorkoutForToday();

  if (workout) {
    const exercise = workout.exercises.find((e) => e.id === exerciseId);
    if (exercise) {
      exercise.completed = true;
    }
  }

  saveUser(user);
};

export const saveSetup = (setup: SetupData): void => {
  const user = getUser();
  user.setup = {
    ...setup,
    setupComplete: true,
  };
  user.lastReset = getTodayDate();

  const todayData: DailyData = {
    date: getTodayDate(),
    countdownDay: 1,
    workoutCompleted: false,
    nutrition: {
      calories: 0,
      protein: 0,
      water: 0,
    },
  };

  user.dailyData = [todayData];
  saveUser(user);
};

export const getHistoricalData = (): HistoricalData[] => {
  const user = getUser();
  return user.historicalData;
};
