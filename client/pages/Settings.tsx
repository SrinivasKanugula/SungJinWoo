import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ArrowLeft, AlertTriangle, RotateCcw } from "lucide-react";
import { getUser } from "@/lib/storage";

export default function Settings() {
  const navigate = useNavigate();
  const user = getUser();
  const [resetStage, setResetStage] = useState(0);
  const [showResetDialog, setShowResetDialog] = useState(false);

  const handleResetClick = () => {
    setShowResetDialog(true);
    setResetStage(1);
  };

  const handleResetConfirm = () => {
    if (resetStage === 1) {
      setResetStage(2);
    } else if (resetStage === 2) {
      setResetStage(3);
    } else if (resetStage === 3) {
      // Clear all data
      localStorage.removeItem("fitness_app_data");
      setShowResetDialog(false);
      setResetStage(0);
      navigate("/setup");
    }
  };

  const handleResetCancel = () => {
    setShowResetDialog(false);
    setResetStage(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-900 to-slate-800 tech-grid">
      {/* Header */}
      <div className="border-b border-purple-500/20 glass-effect sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            size="icon"
            className="text-purple-300/70 hover:text-purple-300 hover:bg-purple-500/20 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold glow-text-accent">Settings</h1>
            <p className="text-xs text-purple-300/60">Manage your account</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Account Info */}
          <div className="glass-effect glow-primary rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-bold glow-text-accent">Account Information</h2>
            <div className="space-y-3 text-purple-300/80">
              <div className="flex justify-between items-center py-2 border-b border-purple-500/10">
                <span>Current Weight</span>
                <span className="text-purple-400 font-semibold">
                  {user.setup.initialWeight} kg
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-purple-500/10">
                <span>Height</span>
                <span className="text-purple-400 font-semibold">
                  {user.setup.height} cm
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-purple-500/10">
                <span>Daily Water Goal</span>
                <span className="text-purple-400 font-semibold">
                  {user.setup.dailyWaterGoal} ml
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span>Transformation Days</span>
                <span className="text-purple-400 font-semibold">
                  {user.setup.countdownDays} days
                </span>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="glass-effect glow-border rounded-lg p-6 space-y-4 border-red-500/30">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <h2 className="text-xl font-bold text-red-300">Danger Zone</h2>
            </div>
            <p className="text-purple-300/70 text-sm">
              This action is irreversible. All your data including historical records will be permanently deleted.
            </p>
            <Button
              onClick={handleResetClick}
              className="glow-button w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white h-12 font-semibold shadow-lg shadow-red-500/40 transition-all"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset Everything & Start Over
            </Button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent className="glass-effect glow-primary border-purple-500/40 bg-black/40 backdrop-blur-xl max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-300">
              <AlertTriangle className="w-5 h-5" />
              Confirm Reset
            </DialogTitle>
            <DialogDescription className="text-purple-300/70">
              {resetStage === 1 && "Are you sure you want to reset everything? This will delete all your data."}
              {resetStage === 2 && "Are you really sure? All historical records will be lost forever."}
              {resetStage === 3 && "Final confirmation: This action cannot be undone. Click confirm one more time to proceed."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Progress indicator */}
            <div className="flex gap-2">
              {[1, 2, 3].map((stage) => (
                <div
                  key={stage}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    stage <= resetStage
                      ? "bg-gradient-to-r from-purple-500 to-magenta-500"
                      : "bg-purple-500/20"
                  }`}
                />
              ))}
            </div>

            <div className="text-center text-purple-300/80 text-sm">
              <p>Step {resetStage} of 3</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleResetCancel}
              variant="outline"
              className="flex-1 border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleResetConfirm}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold shadow-lg shadow-red-500/40"
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
