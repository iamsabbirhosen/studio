import { PumpActivityLog } from '@/components/dashboard/pump-activity-log';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function ActivityPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Activity Log & Reports</h1>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
        <PumpActivityLog />
      </div>
    </main>
  );
}
