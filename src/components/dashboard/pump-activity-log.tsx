'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { pumpLogs } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowUp } from 'lucide-react';

export function PumpActivityLog() {
  return (
    <Card className="h-full">
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
              {pumpLogs.map((log, index) => {
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
