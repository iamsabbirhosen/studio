import { MetricCard } from '@/components/dashboard/metric-card';
import { HistoricalCharts } from '@/components/dashboard/historical-charts';
import { PumpActivityLog } from '@/components/dashboard/pump-activity-log';
import { EfficiencyInsights } from '@/components/dashboard/efficiency-insights';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Thermometer, Zap, TrendingUp, Sun, Wind } from 'lucide-react';

export default function DashboardPage() {
  return (
    <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
      <div className="grid gap-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <MetricCard
            icon={Thermometer}
            title="Surface Temperature"
            value="52.3"
            unit="°C"
            footerText="+2.1°C from last hour"
          />
          <MetricCard
            icon={Wind}
            title="Ambient Temperature"
            value="34.8"
            unit="°C"
            footerText="+1.5°C from last hour"
          />
          <MetricCard
            icon={Zap}
            title="Voltage Output"
            value="24.1"
            unit="V"
            footerText="-0.2V from last hour"
          />
          <MetricCard
            icon={TrendingUp}
            title="Current Output"
            value="5.8"
            unit="A"
            footerText="+0.3A from last hour"
          />
          <Card className="col-span-1 sm:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <Sun className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Optimal</div>
              <div className="flex items-center gap-2 pt-1">
                <p className="text-xs text-muted-foreground">Pump Status:</p>
                <Badge variant="outline" className="border-green-500 bg-green-500/10 text-green-700 dark:text-green-400 animate-pulse">
                  COOLING
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <HistoricalCharts />

        <div className="grid grid-cols-1 gap-6">
          <EfficiencyInsights />
        </div>
      </div>
    </main>
  );
}
