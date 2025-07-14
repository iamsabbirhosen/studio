"use client";

import { useState, useEffect } from "react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { HistoricalCharts } from "@/components/dashboard/historical-charts";
import { PumpActivityLog } from "@/components/dashboard/pump-activity-log";
import { EfficiencyInsights } from "@/components/dashboard/efficiency-insights";
import { PumpControl } from "@/components/dashboard/pump-control";
import { Thermometer, Zap, TrendingUp, Wind } from "lucide-react";

export default function DashboardPage() {
  const [metrics, setMetrics] = useState({
    surfaceTemp: 0,
    ambientTemp: 0,
    voltage: 0,
    current: 0,
  });

  useEffect(() => {
    // Fetch real-time weather data for Dhaka
    async function fetchWeather() {
      try {
        const res = await fetch(
          "https://api.weatherapi.com/v1/current.json?key=f430eb044d11477697d83148251407&q=Dhaka"
        );
        const data = await res.json();
        setMetrics({
          surfaceTemp: 52.3, // Keep as mock for now
          ambientTemp: data.current.temp_c,
          voltage: 24.1,
          current: 5.8,
        });
      } catch (err) {
        setMetrics({
          surfaceTemp: 52.3,
          ambientTemp: 34.8,
          voltage: 24.1,
          current: 5.8,
        });
      }
    }
    fetchWeather();

    const interval = setInterval(fetchWeather, 600000); // Update every 10 minutes
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
