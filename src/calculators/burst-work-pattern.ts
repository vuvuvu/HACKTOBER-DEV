import { Commit } from '../types';

export function calculateBurstWorkPattern(commits: Commit[]): number {
  if (commits.length === 0) return 0;

  // Sort commits by date
  const sortedCommits = commits.sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Group commits by day
  const commitsByDay = new Map<string, number>();

  for (const commit of sortedCommits) {
    const day = commit.date.split('T')[0]; // YYYY-MM-DD
    commitsByDay.set(day, (commitsByDay.get(day) || 0) + 1);
  }

  const dailyCounts = Array.from(commitsByDay.values());

  if (dailyCounts.length === 0) return 0;

  // Calculate statistics
  const mean = dailyCounts.reduce((sum, count) => sum + count, 0) / dailyCounts.length;
  const variance = dailyCounts.reduce((sum, count) => sum + Math.pow(count - mean, 2), 0) / dailyCounts.length;
  const standardDeviation = Math.sqrt(variance);

  // High standard deviation relative to mean indicates bursty work pattern
  const coefficientOfVariation = mean > 0 ? standardDeviation / mean : 0;

  // Scale to 0-20 (higher means more bursty)
  const burstScore = Math.min(20, coefficientOfVariation * 10);

  return Math.round(burstScore * 100) / 100;
}