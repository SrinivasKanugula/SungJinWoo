import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <AlertCircle className="w-16 h-16 text-purple-300 mx-auto animate-purple-glow" />
        <div>
          <h1 className="text-5xl font-bold glow-text-accent mb-2">404</h1>
          <p className="text-2xl font-semibold text-purple-300 mb-2">Page Not Found</p>
          <p className="text-purple-300/70 max-w-md mx-auto">
            The page you're looking for doesn't exist. Let's get you back on track with your fitness journey.
          </p>
        </div>
        <Button
          onClick={() => navigate("/")}
          className="glow-button bg-gradient-to-r from-purple-600 to-magenta-500 hover:from-purple-500 hover:to-magenta-400 text-white px-8 h-12 text-lg font-semibold shadow-lg shadow-purple-500/40"
        >
          <Home className="w-5 h-5 mr-2" />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
