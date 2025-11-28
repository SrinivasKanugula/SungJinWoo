import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const FITNESS_QUOTES = [
  "The only bad workout is the one that didn't happen.",
  "Your body can stand almost anything. It's your mind that you need to convince.",
  "Success is the result of preparation, hard work, and learning from failure.",
  "Discipline is choosing between what you want now and what you want most.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Don't watch the clock; do what it does. Keep going.",
  "The gym is a place of worship, and gains are the religion.",
  "Sweat is just your fat crying.",
  "You don't have to see the whole staircase, just take the first step.",
  "Excellence is not a skill, it's an attitude.",
];

interface MorningModalProps {
  open: boolean;
  countdownDay: number;
  totalDays: number;
  onStart: () => void;
}

export function MorningModal({
  open,
  countdownDay,
  totalDays,
  onStart,
}: MorningModalProps) {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    if (open) {
      setQuote(
        FITNESS_QUOTES[Math.floor(Math.random() * FITNESS_QUOTES.length)]
      );
    }
  }, [open]);

  return (
    <Dialog open={open}>
      <DialogContent className="glass-effect border-cyan-500/40 bg-black/40 backdrop-blur-xl max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl"></DialogTitle>
        </DialogHeader>

        <div className="space-y-8 py-6 text-center">
          {/* Quote */}
          <div className="space-y-4">
            <p className="text-lg italic glow-text-accent leading-relaxed">
              "{quote}"
            </p>
          </div>

          {/* Countdown */}
          <div className="space-y-2">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-cyan-400/50 glow-accent animate-cyan-glow">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400">
                  {countdownDay}
                </div>
                <div className="text-xs text-cyan-300/70">
                  / {totalDays}
                </div>
              </div>
            </div>
            <p className="text-sm text-cyan-300/60">Days of Transformation</p>
          </div>

          {/* Start Button */}
          <Button
            onClick={onStart}
            className="glow-button w-full bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 h-12 text-lg font-semibold rounded-lg shadow-lg shadow-cyan-500/40 hover:shadow-cyan-400/60 transition-all duration-300"
          >
            Let's Start
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
