import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser, getHistoricalData, getTodayData } from "@/lib/storage";
import { BarChart3, ArrowLeft } from "lucide-react";

export default function Analysis() {
  const navigate = useNavigate();
  const user = getUser();
  const historicalData = getHistoricalData();
  const todayData = getTodayData();

  // Prepare chart data
  const chartData = useMemo(() => {
    return [
      ...historicalData.map((data) => ({
        date: data.date,
        weight: data.weight,
        pushups: data.pushups,
        situps: data.situps,
        calories: data.nutrition.calories,
        protein: data.nutrition.protein,
        water: data.nutrition.water,
      })),
      {
        date: todayData.date,
        weight: todayData.weight,
        pushups: todayData.pushups || 0,
        situps: todayData.situps || 0,
        calories: todayData.nutrition.calories,
        protein: todayData.nutrition.protein,
        water: todayData.nutrition.water,
      },
    ].filter((d) => d.weight || d.pushups || d.situps); // Only show days with logged data
  }, [historicalData, todayData]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const tooltipFormatter = (value: number) => {
    return value.toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-900 to-slate-800">
      {/* Header */}
      <div className="border-b border-purple-500/20 bg-black/30 backdrop-blur-lg glass-effect sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              size="icon"
              className="text-purple-300/70 hover:text-purple-300 hover:bg-purple-500/20 transition-all h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold glow-text-accent truncate">Progress Analytics</h1>
              <p className="text-xs text-purple-300/60">
                Track your journey
              </p>
            </div>
          </div>
          <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300 flex-shrink-0" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {chartData.length === 0 ? (
          <Card className="glass-effect border-purple-500/40 bg-black/30">
            <CardContent className="pt-10 text-center py-12">
              <p className="text-purple-300/70 text-lg">
                No data yet. Start logging your daily progress to see charts!
              </p>
              <Button
                onClick={() => navigate("/")}
                className="mt-4 glow-button bg-gradient-to-r from-purple-600 to-magenta-500 hover:from-purple-500 hover:to-magenta-400 text-white font-semibold shadow-lg shadow-purple-500/40"
              >
                Start Logging
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Weight Chart */}
            <Card className="glass-effect border-purple-500/40 bg-black/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-purple-300">Weight Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="date"
                      formatter={formatDate}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      formatter={tooltipFormatter}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="hsl(var(--accent))"
                      strokeWidth={3}
                      isAnimationActive={true}
                      dot={{ fill: "hsl(var(--accent))", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pushups & Situps Chart */}
            <Card className="glass-effect border-purple-500/40 bg-black/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-purple-300">Workout Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="date"
                      formatter={formatDate}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      formatter={tooltipFormatter}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="pushups"
                      stroke="hsl(280 60% 55%)"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="situps"
                      stroke="hsl(45 93% 50%)"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Nutrition Chart - Calories */}
            <Card className="glass-effect border-purple-500/40 bg-black/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-purple-300">Daily Calorie Intake</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="date"
                      formatter={formatDate}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      formatter={tooltipFormatter}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="calories"
                      stroke="hsl(10 84% 60%)"
                      strokeWidth={3}
                      isAnimationActive={true}
                      dot={{ fill: "hsl(10 84% 60%)", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Protein Chart */}
            <Card className="glass-effect border-purple-500/40 bg-black/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-purple-300">Daily Protein Intake</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="date"
                      formatter={formatDate}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      formatter={tooltipFormatter}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="protein"
                      stroke="hsl(0 84% 60%)"
                      strokeWidth={3}
                      isAnimationActive={true}
                      dot={{ fill: "hsl(0 84% 60%)", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Water Intake Chart */}
            <Card className="glass-effect border-purple-500/40 bg-black/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-purple-300">Daily Water Intake</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="date"
                      formatter={formatDate}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      formatter={tooltipFormatter}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="water"
                      stroke="hsl(210 100% 50%)"
                      strokeWidth={3}
                      isAnimationActive={true}
                      dot={{ fill: "hsl(210 100% 50%)", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
