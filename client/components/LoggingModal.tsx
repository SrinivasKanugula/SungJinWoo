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
      <DialogContent className="border-primary/30 bg-card/95 backdrop-blur max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {stage === "weight" && "Log Your Weight"}
            {stage === "exercises" && "Log Your Exercises"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-6">
          {stage === "weight" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="weight-input" className="text-base">
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
                  className="bg-input text-foreground text-base h-12"
                />
              </div>

              <div className="flex gap-2">
                {onSkip && (
                  <Button
                    onClick={onSkip}
                    variant="outline"
                    className="flex-1 border-muted text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    Skip
                  </Button>
                )}
                <Button
                  onClick={handleWeightSubmit}
                  disabled={!weight}
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground h-10"
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
                  <Label htmlFor="pushups-input" className="text-base">
                    Pushups
                  </Label>
                  <Input
                    id="pushups-input"
                    type="number"
                    placeholder="Number of pushups"
                    value={pushups}
                    onChange={(e) => setPushups(e.target.value)}
                    autoFocus
                    className="bg-input text-foreground text-base h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="situps-input" className="text-base">
                    Situps
                  </Label>
                  <Input
                    id="situps-input"
                    type="number"
                    placeholder="Number of situps"
                    value={situps}
                    onChange={(e) => setSitups(e.target.value)}
                    className="bg-input text-foreground text-base h-12"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                {onSkip && (
                  <Button
                    onClick={onSkip}
                    variant="outline"
                    className="flex-1 border-muted text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    Skip
                  </Button>
                )}
                <Button
                  onClick={handleExercisesSubmit}
                  disabled={!pushups || !situps}
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground h-10"
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
