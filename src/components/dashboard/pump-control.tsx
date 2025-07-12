'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Sun } from 'lucide-react';

export function PumpControl() {
  const [isPumpOn, setIsPumpOn] = useState(true);

  return (
    <Card className="col-span-1 sm:col-span-2 lg:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">System Control</CardTitle>
        <Sun className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">Optimal</div>
              <div className="flex flex-col items-center gap-2">
                <Label htmlFor="pump-toggle" className="text-xs text-muted-foreground">Manual</Label>
                <Switch
                  id="pump-toggle"
                  checked={isPumpOn}
                  onCheckedChange={setIsPumpOn}
                  aria-label="Toggle cooling pump"
                />
              </div>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <p className="text-xs text-muted-foreground">Pump Status:</p>
            <Badge
              variant="outline"
              className={
                isPumpOn
                  ? 'border-green-500 bg-green-500/10 text-green-700 dark:text-green-400 animate-pulse'
                  : 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-400'
              }
            >
              {isPumpOn ? 'COOLING' : 'OFF'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
