import { Commit } from '../types';

export function calculateCommitFrequency(commits: Commit[]): number {
  if (commits.length === 0) return 0;

  // Sort commits by date
  const sortedCommits = commits.sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const firstCommit = new Date(sortedCommits[0].date);
  const lastCommit = new Date(sortedCommits[sortedCommits.length - 1].date);
  const daysSpan = Math.max(1, (lastCommit.getTime() - firstCommit.getTime()) / (1000 * 60 * 60 * 24));

  // Calculate commits per day, then normalize to 0-20 scale
  const commitsPerDay = commits.length / daysSpan;

  // Scoring: 1+ commits/day = full score, less than 1/day scales down
  const score = Math.min(20, commitsPerDay * 20);

  return Math.round(score * 100) / 100;
}