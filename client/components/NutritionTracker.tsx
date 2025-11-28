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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-accent mb-6">
        Nutrition Tracking
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Calories Card */}
        <div className="p-6 bg-card border border-primary/20 rounded-lg hover:border-accent/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-orange-500" />
              <h3 className="font-semibold">Calories</h3>
            </div>
          </div>
          <div className="text-3xl font-bold text-accent mb-4">{calories}</div>
          <Button
            onClick={() => setOpenDialog("calories")}
            variant="outline"
            className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
          >
            Log Calories
          </Button>
        </div>

        {/* Protein Card */}
        <div className="p-6 bg-card border border-primary/20 rounded-lg hover:border-accent/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Beef className="w-6 h-6 text-red-500" />
              <h3 className="font-semibold">Protein</h3>
            </div>
          </div>
          <div className="text-3xl font-bold text-accent mb-4">{protein}g</div>
          <Button
            onClick={() => setOpenDialog("protein")}
            variant="outline"
            className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
          >
            Log Protein
          </Button>
        </div>

        {/* Water Card */}
        <div className="p-6 bg-card border border-primary/20 rounded-lg hover:border-accent/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Droplet className="w-6 h-6 text-blue-500" />
              <h3 className="font-semibold">Water</h3>
            </div>
            <span className="text-xs text-muted-foreground">
              {Math.round(waterPercentage)}%
            </span>
          </div>
          <div className="text-3xl font-bold text-accent mb-4">
            {water}ml
          </div>
          <div className="w-full bg-muted rounded-full h-2 mb-4 overflow-hidden">
            <div
              className="bg-accent h-full transition-all"
              style={{ width: `${waterPercentage}%` }}
            />
          </div>
          <Button
            onClick={() => setOpenDialog("water")}
            variant="outline"
            className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
          >
            Log Water
          </Button>
        </div>
      </div>

      {/* Input Dialogs */}
      <Dialog open={openDialog !== null} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="border-primary/30 bg-card/95 backdrop-blur max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              {openDialog === "calories" && "Add Calories"}
              {openDialog === "protein" && "Add Protein"}
              {openDialog === "water" && "Add Water"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-6">
            <div className="space-y-2">
              <Label htmlFor="nutrition-input">
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
                className="bg-input text-foreground text-base h-12"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setOpenDialog(null)}
                variant="outline"
                className="flex-1 border-muted text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                Cancel
              </Button>
              <Button
                onClick={() =>
                  handleNutritionUpdate(openDialog as "calories" | "protein" | "water")
                }
                disabled={!inputValue}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
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
