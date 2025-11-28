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

interface LoggingModalProps {
  open: boolean;
  stage: "weight" | "exercises" | null;
  onWeightSubmit: (weight: number) => void;
  onExercisesSubmit: (pushups: number, situps: number) => void;
  onSkip?: () => void;
}

export function LoggingModal({
  open,
  stage,
  onWeightSubmit,
  onExercisesSubmit,
  onSkip,
}: LoggingModalProps) {
  const [weight, setWeight] = useState("");
  const [pushups, setPushups] = useState("");
  const [situps, setSitups] = useState("");

  const handleWeightSubmit = () => {
    if (weight) {
      onWeightSubmit(Number(weight));
      setWeight("");
    }
  };

  const handleExercisesSubmit = () => {
    if (pushups && situps) {
      onExercisesSubmit(Number(pushups), Number(situps));
      setPushups("");
      setSitups("");
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="glass-effect border-cyan-500/40 bg-black/40 backdrop-blur-xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl text-cyan-400">
            {stage === "weight" && "Log Your Weight"}
            {stage === "exercises" && "Log Your Exercises"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-6">
          {stage === "weight" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="weight-input" className="text-base text-cyan-300">
                  Weight (kg)
                </Label>
                <Input
                  id="weight-input"
                  type="number"
                  step="0.1"
                  placeholder="Enter your weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  autoFocus
                  className="bg-slate-950/40 border-cyan-500/30 text-cyan-300 placeholder-cyan-600/50 text-base h-12 focus:border-cyan-400/60 focus:ring-cyan-500/20"
                />
              </div>

              <div className="flex gap-2">
                {onSkip && (
                  <Button
                    onClick={onSkip}
                    variant="outline"
                    className="flex-1 border-blue-500/30 text-blue-300 hover:bg-blue-500/20 hover:text-blue-200"
                  >
                    Skip
                  </Button>
                )}
                <Button
                  onClick={handleWeightSubmit}
                  disabled={!weight}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 h-10 font-semibold shadow-lg shadow-cyan-500/40"
                >
                  Continue
                </Button>
              </div>
            </>
          )}

          {stage === "exercises" && (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pushups-input" className="text-base text-cyan-300">
                    Pushups
                  </Label>
                  <Input
                    id="pushups-input"
                    type="number"
                    placeholder="Number of pushups"
                    value={pushups}
                    onChange={(e) => setPushups(e.target.value)}
                    autoFocus
                    className="bg-slate-950/40 border-cyan-500/30 text-cyan-300 placeholder-cyan-600/50 text-base h-12 focus:border-cyan-400/60 focus:ring-cyan-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="situps-input" className="text-base text-cyan-300">
                    Situps
                  </Label>
                  <Input
                    id="situps-input"
                    type="number"
                    placeholder="Number of situps"
                    value={situps}
                    onChange={(e) => setSitups(e.target.value)}
                    className="bg-slate-950/40 border-cyan-500/30 text-cyan-300 placeholder-cyan-600/50 text-base h-12 focus:border-cyan-400/60 focus:ring-cyan-500/20"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                {onSkip && (
                  <Button
                    onClick={onSkip}
                    variant="outline"
                    className="flex-1 border-blue-500/30 text-blue-300 hover:bg-blue-500/20 hover:text-blue-200"
                  >
                    Skip
                  </Button>
                )}
                <Button
                  onClick={handleExercisesSubmit}
                  disabled={!pushups || !situps}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 h-10 font-semibold shadow-lg shadow-cyan-500/40"
                >
                  Continue
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
