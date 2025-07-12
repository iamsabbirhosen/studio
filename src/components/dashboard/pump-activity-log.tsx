
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PumpLog } from '@/lib/types';

const generateInitialPumpLogs = (): PumpLog[] => {
    const logs: PumpLog[] = [];
    for (let i = 1; i <= 10; i++) {
        const time = new Date();
        time.setMinutes(time.getMinutes() - i * 25);
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

interface PumpActivityLogProps {
  className?: string;
}

export function PumpActivityLog({ className }: PumpActivityLogProps) {
    const [pumpLogs, setPumpLogs] = useState<PumpLog[]>(generateInitialPumpLogs);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() < 0.2) { // 20% chance to add a new log
                setPumpLogs(prevLogs => {
                    const newLogs = [...prevLogs];
                     if (newLogs.length >= 15) {
                        newLogs.shift(); // Keep the list from growing indefinitely
                    }
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
        }, 20000); // Update every 20 seconds

        return () => clearInterval(interval);
    }, []);

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle>Pump Activity Logs</CardTitle>
        <CardDescription>A log of recent automated cooling cycles.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] sm:h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead className="hidden text-center sm:table-cell">Pre-Cool Temp</TableHead>
                <TableHead className="hidden text-center sm:table-cell">Post-Cool Temp</TableHead>
                <TableHead className="text-center">Temp Change</TableHead>
                <TableHead className="text-right">Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...pumpLogs].reverse().map((log, index) => {
                const tempChange = (log.postCoolTemp - log.preCoolTemp).toFixed(1);
                const isDecrease = parseFloat(tempChange) < 0;

                return (
                  <TableRow key={`${log.id}-${index}`}>
                    <TableCell className="font-medium">{log.timestamp}</TableCell>
                    <TableCell className="hidden text-center sm:table-cell">{log.preCoolTemp}°C</TableCell>
                    <TableCell className="hidden text-center sm:table-cell">{log.postCoolTemp}°C</TableCell>
                    <TableCell className="text-center">
                       <Badge variant={isDecrease ? "secondary" : "destructive"} className="gap-1">
                          {isDecrease ? 
                            <ArrowDown className="h-3 w-3 text-green-500" /> : 
                            <ArrowUp className="h-3 w-3 text-red-500" />
                          }
                          {tempChange}°C
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right">{log.duration}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
