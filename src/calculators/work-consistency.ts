import { Commit } from '../types';

export function calculateWorkConsistency(commits: Commit[]): number {
  if (commits.length === 0) return 0;

  // Count commits by day of week (0 = Sunday, 1 = Monday, etc.)
  const commitsByDay = [0, 0, 0, 0, 0, 0, 0];

  for (const commit of commits) {
    const dayOfWeek = new Date(commit.date).getDay();
    commitsByDay[dayOfWeek]++;
  }

  // Calculate ideal distribution (commits spread evenly across all days)
  const totalCommits = commits.length;
  const idealPerDay = totalCommits / 7;

  // Calculate variance from ideal distribution
  let variance = 0;
  for (let i = 0; i < 7; i++) {
    const diff = commitsByDay[i] - idealPerDay;
    variance += diff * diff;
  }

  // Lower variance = higher consistency score
  const maxVariance = totalCommits * totalCommits; // Maximum possible variance
  const consistencyScore = Math.max(0, 1 - (variance / maxVariance));

  // Scale to 0-15
  return Math.round(consistencyScore * 15 * 100) / 100;
}