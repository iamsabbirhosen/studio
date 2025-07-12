import type { HistoricalDataPoint, PumpLog } from '@/lib/types';

export const historicalData: HistoricalDataPoint[] = [
  { time: '10:00', surfaceTemp: 35.2, ambientTemp: 28.5, voltage: 23.5, power: 130.1 },
  { time: '11:00', surfaceTemp: 42.1, ambientTemp: 30.1, voltage: 23.8, power: 135.8 },
  { time: '12:00', surfaceTemp: 51.5, ambientTemp: 32.5, voltage: 24.1, power: 140.2 },
  { time: '13:00', surfaceTemp: 55.8, ambientTemp: 34.2, voltage: 24.3, power: 142.5 },
  { time: '14:00', surfaceTemp: 48.2, ambientTemp: 33.8, voltage: 24.0, power: 138.7 },
  { time: '15:00', surfaceTemp: 43.7, ambientTemp: 31.9, voltage: 23.7, power: 134.3 },
  { time: '16:00', surfaceTemp: 38.9, ambientTemp: 29.8, voltage: 23.4, power: 128.9 },
];

export const pumpLogs: PumpLog[] = [
    { id: 1, timestamp: '12:45 PM', preCoolTemp: 58.5, postCoolTemp: 43.2, duration: '60s' },
    { id: 2, timestamp: '01:30 PM', preCoolTemp: 65.2, postCoolTemp: 45.1, duration: '60s' },
    { id: 3, timestamp: '02:15 PM', preCoolTemp: 72.3, postCoolTemp: 48.5, duration: '60s' },
    { id: 4, timestamp: '03:05 PM', preCoolTemp: 68.8, postCoolTemp: 46.1, duration: '60s' },
    { id: 5, timestamp: '03:50 PM', preCoolTemp: 75.5, postCoolTemp: 50.2, duration: '60s' },
];