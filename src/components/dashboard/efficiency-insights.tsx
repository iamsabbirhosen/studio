'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb, AlertTriangle, Sparkles } from 'lucide-react';
import { generateInsights } from '@/app/actions';
import { cn } from '@/lib/utils';

interface EfficiencyInsightsProps {
  className?: string;
}

export function EfficiencyInsights({ className }: EfficiencyInsightsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestions([]);

    const result = await generateInsights();

    if (result.success) {
      setSuggestions(result.suggestions);
    } else {
      setError(result.error ?? 'An unknown error occurred.');
    }
    setIsLoading(false);
  };

  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <CardTitle>Efficiency Insights</CardTitle>
        </div>
        <CardDescription>AI-powered suggestions to optimize your solar setup.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow min-h-[240px]">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : suggestions.length > 0 ? (
          <ul className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex gap-3 items-start text-sm">
                <Lightbulb className="h-4 w-4 mt-1 shrink-0 text-accent" />
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-muted-foreground pt-4 flex flex-col items-center justify-center h-full">
            <p>Click the button to generate efficiency insights.</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleAnalyze} disabled={isLoading} className="w-full">
          {isLoading ? 'Analyzing...' : 'Generate Insights'}
        </Button>
      </CardFooter>
    </Card>
  );
}
