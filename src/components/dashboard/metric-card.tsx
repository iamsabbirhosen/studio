import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
  icon: LucideIcon;
  title: string;
  value: string;
  unit: string;
  footerText: string;
  className?: string;
};

export function MetricCard({ icon: Icon, title, value, unit, footerText, className }: MetricCardProps) {
  return (
    <Card className={cn("shadow-sm hover:shadow-md transition-shadow", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">
          {value}
          <span className="text-sm font-medium text-muted-foreground ml-1">{unit}</span>
        </div>
        <p className="text-xs text-muted-foreground">{footerText}</p>
      </CardContent>
    </Card>
  );
}
