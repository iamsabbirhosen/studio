
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart } from 'recharts';
import { historicalData, pumpLogs } from '@/lib/mock-data';

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

const coolingChartData = pumpLogs.map(log => ({
  ...log,
  efficiencyGain: ((log.preCoolTemp - log.postCoolTemp) * 0.4).toFixed(2),
}));

export function HistoricalCharts() {
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
