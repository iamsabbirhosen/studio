// This file is machine-generated - edit at your own risk.
'use server';

import { getEfficiencyInsights } from '@/ai/flows/efficiency-insights';
import { pumpLogs, historicalData } from '@/lib/mock-data';

export async function generateInsights() {
  try {
    const historicalDataString = JSON.stringify({
      pumpLogs,
      performanceData: historicalData,
    });
    
    // Artificial delay to simulate network latency
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = await getEfficiencyInsights({
      historicalData: historicalDataString,
    });

    if (!result || !result.suggestions) {
      return { success: false, error: 'Received an invalid response from the AI.' };
    }

    return { success: true, suggestions: result.suggestions };
  } catch (error) {
    console.error('Error generating efficiency insights:', error);
    return { success: false, error: 'Failed to generate insights due to a server error.' };
  }
}
