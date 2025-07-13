
'use client';

import { useState, useEffect } from 'react';
import { MetricCard } from '@/components/dashboard/metric-card';
import { HistoricalCharts } from '@/components/dashboard/historical-charts';
import { PumpActivityLog } from '@/components/dashboard/pump-activity-log';
import { EfficiencyInsights } from '@/components/dashboard/efficiency-insights';
import { PumpControl } from '@/components/dashboard/pump-control';
import { Thermometer, Zap, TrendingUp, Wind } from 'lucide-react';

export default function DashboardPage() {
  const [metrics, setMetrics] = useState({
    surfaceTemp: 0,
    ambientTemp: 0,
    voltage: 0,
    current: 0,
  });

  useEffect(() => {
    // Set initial metrics on client-side to avoid hydration mismatch
    setMetrics({
        surfaceTemp: 52.3,
        ambientTemp: 34.8,
        voltage: 24.1,
        current: 5.8,
    });

    const interval = setInterval(() => {
      setMetrics(prevMetrics => ({
        surfaceTemp: parseFloat((prevMetrics.surfaceTemp + (Math.random() - 0.5) * 2).toFixed(1)),
        ambientTemp: parseFloat((prevMetrics.ambientTemp + (Math.random() - 0.5) * 1).toFixed(1)),
        voltage: parseFloat((prevMetrics.voltage + (Math.random() - 0.5) * 0.2).toFixed(1)),
        current: parseFloat((prevMetrics.current + (Math.random() - 0.5) * 0.3).toFixed(1)),
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);


  return (
    <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
      <div className="grid gap-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <MetricCard
            icon={Thermometer}
            title="Surface Temperature"
            value={metrics.surfaceTemp.toFixed(1)}
            unit="°C"
            footerText="Real-time data"
          />
          <MetricCard
            icon={Wind}
            title="Ambient Temperature"
            value={metrics.ambientTemp.toFixed(1)}
            unit="°C"
            footerText="Real-time data"
          />
          <MetricCard
            icon={Zap}
            title="Voltage Output"
            value={metrics.voltage.toFixed(1)}
            unit="V"
            footerText="Real-time data"
          />
          <MetricCard
            icon={TrendingUp}
            title="Current Output"
            value={metrics.current.toFixed(1)}
            unit="A"
            footerText="Real-time data"
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
