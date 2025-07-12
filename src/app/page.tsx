import { MetricCard } from '@/components/dashboard/metric-card';
import { HistoricalCharts } from '@/components/dashboard/historical-charts';
import { PumpActivityLog } from '@/components/dashboard/pump-activity-log';
import { EfficiencyInsights } from '@/components/dashboard/efficiency-insights';
import { PumpControl } from '@/components/dashboard/pump-control';
import { Thermometer, Zap, TrendingUp, Wind } from 'lucide-react';

export default function DashboardPage() {
  return (
    <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
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
          <PumpControl />
        </div>

        <HistoricalCharts />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
           <EfficiencyInsights className="xl:col-span-1" />
           <PumpActivityLog className="xl:col-span-2" />
        </div>
      </div>
    </main>
  );
}
