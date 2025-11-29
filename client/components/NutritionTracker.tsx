import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Droplet, Flame, Beef } from "lucide-react";

interface NutritionTrackerProps {
  calories: number;
  protein: number;
  water: number;
  dailyWaterGoal: number;
  onCaloriesChange: (value: number) => void;
  onProteinChange: (value: number) => void;
  onWaterChange: (value: number) => void;
}

export function NutritionTracker({
  calories,
  protein,
  water,
  dailyWaterGoal,
  onCaloriesChange,
  onProteinChange,
  onWaterChange,
}: NutritionTrackerProps) {
  const [openDialog, setOpenDialog] = useState<
    "calories" | "protein" | "water" | null
  >(null);
  const [inputValue, setInputValue] = useState("");

  const handleNutritionUpdate = (type: "calories" | "protein" | "water") => {
    if (!inputValue) return;

    const value = Number(inputValue);
    if (type === "calories") {
      onCaloriesChange(calories + value);
    } else if (type === "protein") {
      onProteinChange(protein + value);
    } else if (type === "water") {
      onWaterChange(water + value);
    }

    setInputValue("");
    setOpenDialog(null);
  };

  const waterPercentage = Math.min((water / dailyWaterGoal) * 100, 100);

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold glow-text-accent mb-4 sm:mb-6">
        Nutrition Tracking
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Calories Card */}
        <div className="p-4 sm:p-6 glass-effect border-purple-500/30 rounded-lg glow-primary hover:border-purple-400/60 transition-all">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
              <h3 className="font-semibold text-purple-300 text-sm sm:text-base">Calories</h3>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-purple-300 mb-3 sm:mb-4">{calories}</div>
          <Button
            onClick={() => setOpenDialog("calories")}
            variant="outline"
            className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200 hover:border-purple-400/60 transition-all h-9 sm:h-10 text-xs sm:text-sm"
          >
            Log Calories
          </Button>
        </div>

        {/* Protein Card */}
        <div className="p-4 sm:p-6 glass-effect border-purple-500/30 rounded-lg glow-primary hover:border-purple-400/60 transition-all">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <Beef className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
              <h3 className="font-semibold text-purple-300 text-sm sm:text-base">Protein</h3>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-purple-300 mb-3 sm:mb-4">{protein}g</div>
          <Button
            onClick={() => setOpenDialog("protein")}
            variant="outline"
            className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200 hover:border-purple-400/60 transition-all h-9 sm:h-10 text-xs sm:text-sm"
          >
            Log Protein
          </Button>
        </div>

        {/* Water Card */}
        <div className="p-4 sm:p-6 glass-effect border-purple-500/30 rounded-lg glow-primary hover:border-purple-400/60 transition-all">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <Droplet className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              <h3 className="font-semibold text-purple-300 text-sm sm:text-base">Water</h3>
            </div>
            <span className="text-xs text-purple-300/60">
              {Math.round(waterPercentage)}%
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-purple-300 mb-3 sm:mb-4">
            {water}ml
          </div>
          <div className="w-full bg-purple-950/40 rounded-full h-2 mb-3 sm:mb-4 overflow-hidden border border-purple-500/20">
            <div
              className="bg-gradient-to-r from-purple-500 to-magenta-500 h-full transition-all shadow-lg shadow-purple-500/50"
              style={{ width: `${waterPercentage}%` }}
            />
          </div>
          <Button
            onClick={() => setOpenDialog("water")}
            variant="outline"
            className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200 hover:border-purple-400/60 transition-all h-9 sm:h-10 text-xs sm:text-sm"
          >
            Log Water
          </Button>
        </div>
      </div>

      {/* Input Dialogs */}
      <Dialog open={openDialog !== null} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="glass-effect glow-primary border-purple-500/40 bg-black/40 backdrop-blur-xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-purple-300">
              {openDialog === "calories" && "Add Calories"}
              {openDialog === "protein" && "Add Protein"}
              {openDialog === "water" && "Add Water"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-6">
            <div className="space-y-2">
              <Label htmlFor="nutrition-input" className="text-purple-300">
                {openDialog === "calories" && "Calories (kcal)"}
                {openDialog === "protein" && "Protein (g)"}
                {openDialog === "water" && "Water (ml)"}
              </Label>
              <Input
                id="nutrition-input"
                type="number"
                placeholder="Enter amount"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
                className="bg-purple-950/40 border-purple-500/30 text-purple-300 placeholder-purple-600/50 text-base h-12 focus:border-purple-400/60 focus:ring-purple-500/20"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setOpenDialog(null)}
                variant="outline"
                className="flex-1 border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200 h-10 text-sm"
              >
                Cancel
              </Button>
              <Button
                onClick={() =>
                  handleNutritionUpdate(openDialog as "calories" | "protein" | "water")
                }
                disabled={!inputValue}
                className="flex-1 bg-gradient-to-r from-purple-600 to-magenta-500 hover:from-purple-500 hover:to-magenta-400 text-white font-semibold shadow-lg shadow-purple-500/40 h-10 text-sm"
              >
                Add
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
