
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart } from 'recharts';
import type { HistoricalDataPoint, PumpLog } from '@/lib/types';

const generateInitialHistoricalData = (): HistoricalDataPoint[] => {
  const data: HistoricalDataPoint[] = [];
  for (let i = 6; i >= 0; i--) {
    const time = new Date();
    time.setHours(time.getHours() - i);
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      surfaceTemp: 40 + Math.random() * 15,
      ambientTemp: 28 + Math.random() * 6,
      voltage: 23.5 + Math.random(),
      power: 130 + Math.random() * 15,
    });
  }
  return data;
};

const generateInitialPumpLogs = (): PumpLog[] => {
    const logs: PumpLog[] = [];
    for (let i = 1; i <= 5; i++) {
        const time = new Date();
        time.setMinutes(time.getMinutes() - i * 45);
        const preCoolTemp = 60 + Math.random() * 15;
        const postCoolTemp = preCoolTemp - (10 + Math.random() * 10);
        logs.push({
            id: i,
            timestamp: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
            preCoolTemp: parseFloat(preCoolTemp.toFixed(1)),
            postCoolTemp: parseFloat(postCoolTemp.toFixed(1)),
            duration: '60s',
        });
    }
    return logs.reverse();
};

const chartConfig = {
  surfaceTemp: {
    label: 'Surface Temp (°C)',
    color: 'hsl(var(--primary))',
  },
  ambientTemp: {
    label: 'Ambient Temp (°C)',
    color: 'hsl(var(--accent))',
  },
  voltage: {
    label: 'Voltage (V)',
    color: 'hsl(var(--primary))',
  },
  power: {
    label: 'Power (W)',
    color: 'hsl(var(--accent))',
  },
  preCoolTemp: {
    label: 'Pre-Cool Temp (°C)',
    color: 'hsl(var(--destructive))',
  },
  postCoolTemp: {
    label: 'Post-Cool Temp (°C)',
    color: 'hsl(var(--primary))',
  },
  efficiencyGain: {
    label: 'Efficiency Gain (%)',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function HistoricalCharts() {
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>(generateInitialHistoricalData);
  const [pumpLogs, setPumpLogs] = useState<PumpLog[]>(generateInitialPumpLogs);

  useEffect(() => {
    const interval = setInterval(() => {
      setHistoricalData(prevData => {
        const newData = [...prevData.slice(1)];
        const lastPoint = prevData[prevData.length - 1];
        const time = new Date();
        newData.push({
          time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          surfaceTemp: Math.max(30, lastPoint.surfaceTemp + (Math.random() - 0.45) * 3),
          ambientTemp: Math.max(20, lastPoint.ambientTemp + (Math.random() - 0.5) * 2),
          voltage: Math.max(22, lastPoint.voltage + (Math.random() - 0.5) * 0.5),
          power: Math.max(110, lastPoint.power + (Math.random() - 0.45) * 5),
        });
        return newData;
      });

      if (Math.random() < 0.1) { // 10% chance to add a new pump log
        setPumpLogs(prevLogs => {
            const newLogs = [...prevLogs.slice(1)];
            const time = new Date();
            const preCoolTemp = 60 + Math.random() * 15;
            const postCoolTemp = preCoolTemp - (10 + Math.random() * 10);
            newLogs.push({
                id: (prevLogs[prevLogs.length-1]?.id || 0) + 1,
                timestamp: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
                preCoolTemp: parseFloat(preCoolTemp.toFixed(1)),
                postCoolTemp: parseFloat(postCoolTemp.toFixed(1)),
                duration: '60s',
            });
            return newLogs;
        });
      }

    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const coolingChartData = pumpLogs.map(log => ({
    ...log,
    efficiencyGain: parseFloat(((log.preCoolTemp - log.postCoolTemp) * 0.5 + 10).toFixed(2)),
  }));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Temperature Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <ResponsiveContainer>
              <LineChart data={historicalData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" tick={{ fill: 'hsl(var(--primary))' }} fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" tick={{ fill: 'hsl(var(--accent))' }} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line yAxisId="left" type="monotone" dataKey="surfaceTemp" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} name="Surface Temp" />
                <Line yAxisId="right" type="monotone" dataKey="ambientTemp" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} name="Ambient Temp" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Power & Voltage</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
             <ResponsiveContainer>
              <LineChart data={historicalData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" tick={{ fill: 'hsl(var(--primary))' }} fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" tick={{ fill: 'hsl(var(--accent))' }} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line yAxisId="left" type="monotone" dataKey="voltage" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} name="Voltage" />
                <Line yAxisId="right" type="monotone" dataKey="power" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} name="Power" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Cooling Efficiency</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <ResponsiveContainer>
              <ComposedChart data={coolingChartData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" tick={{ fill: 'hsl(var(--primary))' }} fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" tick={{ fill: 'hsl(var(--chart-2))' }} fontSize={12} unit="%" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar yAxisId="left" dataKey="preCoolTemp" fill="hsl(var(--destructive))" radius={4} name="Pre-Cool Temp" />
                <Bar yAxisId="left" dataKey="postCoolTemp" fill="hsl(var(--primary))" radius={4} name="Post-Cool Temp" />
                <Line yAxisId="right" type="monotone" dataKey="efficiencyGain" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{r: 4, fill: 'hsl(var(--chart-2))' }} name="Efficiency Gain (%)" unit="%" />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
