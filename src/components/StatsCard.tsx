import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: number;
}

export const StatsCard = ({ title, value, icon: Icon, description, trend }: StatsCardProps) => {
  return (
    <Card className="relative overflow-hidden transition-all hover:shadow-lg">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-academic-primary/10 to-academic-accent/10 rounded-full -mr-16 -mt-16" />
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-10 w-10 rounded-full bg-academic-primary/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-academic-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend !== undefined && (
          <p className={`text-xs mt-1 ${trend >= 0 ? "text-success" : "text-destructive"}`}>
            {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}% from last week
          </p>
        )}
      </CardContent>
    </Card>
  );
};
