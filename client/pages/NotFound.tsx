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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <AlertCircle className="w-16 h-16 text-accent mx-auto" />
        <div>
          <h1 className="text-5xl font-bold text-accent mb-2">404</h1>
          <p className="text-2xl font-semibold text-foreground mb-2">Page Not Found</p>
          <p className="text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist. Let's get you back on track with your fitness journey.
          </p>
        </div>
        <Button
          onClick={() => navigate("/")}
          className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 h-12 text-lg"
        >
          <Home className="w-5 h-5 mr-2" />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
