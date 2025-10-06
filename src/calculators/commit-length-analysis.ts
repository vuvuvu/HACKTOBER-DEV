import { Commit } from '../types';

export function calculateCommitLengthAnalysis(commits: Commit[]): number {
  if (commits.length === 0) return 0;

  // Calculate average commit message length
  const totalLength = commits.reduce((sum, commit) => {
    return sum + commit.message.length;
  }, 0);

  const averageLength = totalLength / commits.length;

  // Analyze length patterns
  let score = 0;

  // Ideal commit message length is around 50-72 characters for the first line
  // We'll analyze the full message length and score based on quality patterns
  
  if (averageLength < 10) {
    // Very short messages - likely poor quality
    score = 8; // Higher score = more problematic
  } else if (averageLength < 30) {
    // Short but potentially adequate
    score = 4;
  } else if (averageLength <= 100) {
    // Good length range
    score = 1;
  } else if (averageLength <= 200) {
    // Longer messages - could be detailed or verbose
    score = 3;
  } else {
    // Very long messages - potentially over-detailed
    score = 6;
  }

  // Check for consistency - calculate standard deviation
  const lengths = commits.map(commit => commit.message.length);
  const variance = lengths.reduce((sum, length) => {
    return sum + Math.pow(length - averageLength, 2);
  }, 0) / lengths.length;
  
  const standardDeviation = Math.sqrt(variance);
  
  // High variation in commit message length indicates inconsistency
  const variationPenalty = Math.min(3, standardDeviation / 50);
  score += variationPenalty;

  // Cap at max score of 10
  return Math.min(10, Math.round(score * 100) / 100);
}