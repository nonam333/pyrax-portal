import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Info, Lightbulb, TrendingUp } from "lucide-react";

interface CalloutProps {
  type?: string;
  title?: string;
  content: string;
  [key: string]: any;
}

export function Callout({ type = "info", title, content }: CalloutProps) {
  const icons = {
    info: Info,
    tip: Lightbulb,
    warning: AlertCircle,
    insight: TrendingUp,
  };

  const Icon = icons[type as keyof typeof icons] || Info;

  const colorClasses = {
    info: "border-blue-500/50 bg-blue-500/5",
    tip: "border-primary/50 bg-primary/5",
    warning: "border-yellow-500/50 bg-yellow-500/5",
    insight: "border-primary/50 bg-gradient-to-br from-primary/10 to-accent/10",
  };

  const iconColors = {
    info: "text-blue-400",
    tip: "text-primary",
    warning: "text-yellow-400",
    insight: "text-primary",
  };

  return (
    <Card className={`my-6 border-2 ${colorClasses[type as keyof typeof colorClasses] || colorClasses.info}`}>
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <Icon className={`w-6 h-6 ${iconColors[type as keyof typeof iconColors] || iconColors.info}`} />
          </div>
          <div className="flex-1 space-y-2">
            {title && (
              <h4 className="font-bold text-lg text-foreground">{title}</h4>
            )}
            <div
              className="prose prose-sm prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
