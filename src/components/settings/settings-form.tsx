'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const settingsFormSchema = z.object({
  tempThreshold: z.number().min(30).max(80),
  refreshRate: z.string(),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

const defaultValues: Partial<SettingsFormValues> = {
  tempThreshold: 45,
  refreshRate: '30',
};

export function SettingsForm() {
  const { toast } = useToast();
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues,
  });

  const [tempValue, setTempValue] = useState(defaultValues.tempThreshold ?? 45);

  function onSubmit(data: SettingsFormValues) {
    toast({
      title: 'Settings Saved',
      description: (
        <pre className="mt-2 w-full max-w-[340px] rounded-md bg-slate-950 p-4 overflow-x-auto">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="tempThreshold"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cooling Temperature Threshold (°C)</FormLabel>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <FormControl className="flex-1">
                  <Slider
                    min={30}
                    max={80}
                    step={1}
                    value={[tempValue]}
                    onValueChange={(value) => {
                      setTempValue(value[0]);
                      field.onChange(value[0]);
                    }}
                  />
                </FormControl>
                <div className="w-full sm:w-24">
                  <Input type="number" value={tempValue} onChange={(e) => {
                      const val = Number(e.target.value);
                      setTempValue(val);
                      field.onChange(val);
                  }} className="text-center" />
                </div>
              </div>
              <FormDescription>
                The surface temperature at which the cooling pump will activate.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="refreshRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data Refresh Rate</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select refresh rate" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="15">15 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">60 seconds (1 minute)</SelectItem>
                  <SelectItem value="300">300 seconds (5 minutes)</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                How often the dashboard data should be updated from the sensors.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Settings</Button>
      </form>
    </Form>
  );
}
