import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import fetch from "node-fetch";
import { parse } from "csv-parse/sync";

/**
 * Fetches and parses CSV data from a public Google Sheet link.
 * @param {string} csvUrl - The public CSV URL of the Google Sheet.
 * @returns {Promise<any[]>} - Array of objects representing each row.
 */
export async function fetchGoogleSheetCSV(csvUrl: string): Promise<any[]> {
  const response = await fetch(csvUrl);
  const csvText = await response.text();
  const records = parse(csvText, { columns: true });
  return records;
}
