// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview Provides efficiency insights based on historical solar data and pump operation logs.
 *
 * - getEfficiencyInsights - A function that analyzes historical data and provides suggestions for optimizing solar panel efficiency.
 * - EfficiencyInsightsInput - The input type for the getEfficiencyInsights function.
 * - EfficiencyInsightsOutput - The return type for the getEfficiencyInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EfficiencyInsightsInputSchema = z.object({
  historicalData: z.string().describe('Historical solar data and pump operation logs in JSON format.'),
});
export type EfficiencyInsightsInput = z.infer<typeof EfficiencyInsightsInputSchema>;

const EfficiencyInsightsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('Suggestions for optimizing solar panel efficiency based on the historical data.'),
});
export type EfficiencyInsightsOutput = z.infer<typeof EfficiencyInsightsOutputSchema>;

export async function getEfficiencyInsights(input: EfficiencyInsightsInput): Promise<EfficiencyInsightsOutput> {
  return efficiencyInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'efficiencyInsightsPrompt',
  input: {schema: EfficiencyInsightsInputSchema},
  output: {schema: EfficiencyInsightsOutputSchema},
  prompt: `You are an expert in solar panel efficiency optimization.

  Analyze the following historical solar data and pump operation logs to identify patterns and provide suggestions for optimizing solar panel efficiency.
  Provide specific and actionable suggestions.

  Historical Data:
  {{historicalData}}

  Output the suggestions in a JSON array of strings.`,
});

const efficiencyInsightsFlow = ai.defineFlow(
  {
    name: 'efficiencyInsightsFlow',
    inputSchema: EfficiencyInsightsInputSchema,
    outputSchema: EfficiencyInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
