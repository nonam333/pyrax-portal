import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ArticleChartProps {
  type?: string;
  title?: string;
  description?: string;
  data: string;
  [key: string]: any;
}

export function ArticleChart({ type = "line", title, description, data, ...props }: ArticleChartProps) {
  // Parse JSON data
  let chartData: any[] = [];
  try {
    chartData = JSON.parse(data);
  } catch (e) {
    console.error("Failed to parse chart data:", e);
    return null;
  }

  const orangeGradient = "url(#orangeGradient)";
  const chartColors = [
    "hsl(20 100% 60%)",   // Primary orange
    "hsl(25 100% 55%)",   // Light orange
    "hsl(30 100% 50%)",   // Yellow-orange
    "hsl(35 100% 55%)",   // More yellow
    "hsl(40 100% 60%)",   // Golden
  ];

  const renderChart = () => {
    switch (type.toLowerCase()) {
      case "area":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(20 100% 60%)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(20 100% 60%)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" />
              <XAxis dataKey="name" stroke="hsl(0 0% 60%)" />
              <YAxis stroke="hsl(0 0% 60%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0 0% 10%)",
                  border: "1px solid hsl(20 100% 60%)",
                  borderRadius: "6px",
                  color: "hsl(0 0% 100%)",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(20 100% 60%)"
                strokeWidth={2}
                fill="url(#orangeGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case "bar":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" />
              <XAxis dataKey="name" stroke="hsl(0 0% 60%)" />
              <YAxis stroke="hsl(0 0% 60%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0 0% 10%)",
                  border: "1px solid hsl(20 100% 60%)",
                  borderRadius: "6px",
                  color: "hsl(0 0% 100%)",
                }}
              />
              <Bar dataKey="value" fill="hsl(20 100% 60%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0 0% 10%)",
                  border: "1px solid hsl(20 100% 60%)",
                  borderRadius: "6px",
                  color: "hsl(0 0% 100%)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      case "line":
      default:
        return (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" />
              <XAxis dataKey="name" stroke="hsl(0 0% 60%)" />
              <YAxis stroke="hsl(0 0% 60%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0 0% 10%)",
                  border: "1px solid hsl(20 100% 60%)",
                  borderRadius: "6px",
                  color: "hsl(0 0% 100%)",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(20 100% 60%)"
                strokeWidth={3}
                dot={{ fill: "hsl(20 100% 60%)", r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <Card className="my-8 border-border/50 bg-card/50 backdrop-blur">
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle className="text-2xl">{title}</CardTitle>}
          {description && <CardDescription className="text-base">{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>{renderChart()}</CardContent>
    </Card>
  );
}
