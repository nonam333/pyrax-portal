import { Card, CardContent } from "@/components/ui/card";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

interface StatBoxProps {
  label?: string;
  value?: string;
  change?: string;
  content: string;
  [key: string]: any;
}

function AnimatedNumber({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const animation = animate(count, value, { duration: 2, ease: "easeOut" });
    return animation.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
}

export function StatBox({ label, value, change, content }: StatBoxProps) {
  // Try to parse content as JSON, otherwise use props
  let stat: any = {};
  try {
    stat = JSON.parse(content);
  } catch (e) {
    stat = { label, value, change };
  }

  // Extract numeric value for animation
  const numericValue = typeof stat.value === "string"
    ? parseFloat(stat.value.replace(/[^0-9.-]/g, ""))
    : stat.value;

  const isPositive = stat.change?.startsWith("+");
  const isNegative = stat.change?.startsWith("-");

  return (
    <Card className="my-6 border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 hover:border-primary/50 transition-all duration-300">
      <CardContent className="p-6">
        <div className="text-center space-y-2">
          {stat.label && (
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {stat.label}
            </p>
          )}
          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {typeof numericValue === "number" && !isNaN(numericValue) ? (
              <>
                {stat.value.match(/^[^0-9]*/)?.[0]}
                <AnimatedNumber value={numericValue} />
                {stat.value.match(/[^0-9]*$/)?.[0]}
              </>
            ) : (
              stat.value
            )}
          </div>
          {stat.change && (
            <p
              className={`text-sm font-semibold ${
                isPositive
                  ? "text-green-400"
                  : isNegative
                  ? "text-red-400"
                  : "text-muted-foreground"
              }`}
            >
              {stat.change}
            </p>
          )}
          {stat.description && (
            <p className="text-sm text-muted-foreground mt-2">{stat.description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
