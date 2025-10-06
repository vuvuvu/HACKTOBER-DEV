import { Commit } from '../types';

export function calculateTimeOfDayAnalysis(commits: Commit[]): number {
  if (commits.length === 0) return 0;

  // Analyze commit times to determine patterns
  const hourCounts = new Array(24).fill(0);
  
  commits.forEach(commit => {
    const date = new Date(commit.date);
    const hour = date.getHours();
    hourCounts[hour]++;
  });

  // Define time periods
  const nightOwlHours = [22, 23, 0, 1, 2, 3]; // 10 PM - 3 AM
  const earlyBirdHours = [5, 6, 7, 8]; // 5 AM - 8 AM
  const normalHours = [9, 10, 11, 12, 13, 14, 15, 16, 17]; // 9 AM - 5 PM
  const eveningHours = [18, 19, 20, 21]; // 6 PM - 9 PM

  // Count commits in each period
  const nightOwlCommits = nightOwlHours.reduce((sum, hour) => sum + hourCounts[hour], 0);
  const earlyBirdCommits = earlyBirdHours.reduce((sum, hour) => sum + hourCounts[hour], 0);
  const normalCommits = normalHours.reduce((sum, hour) => sum + hourCounts[hour], 0);
  const eveningCommits = eveningHours.reduce((sum, hour) => sum + hourCounts[hour], 0);

  const totalCommits = commits.length;

  // Calculate percentages
  const nightOwlRatio = nightOwlCommits / totalCommits;
  const earlyBirdRatio = earlyBirdCommits / totalCommits;
  const normalRatio = normalCommits / totalCommits;
  const eveningRatio = eveningCommits / totalCommits;

  let score = 0;

  // Score based on how extreme the pattern is
  // Higher scores indicate more unusual patterns
  
  if (nightOwlRatio > 0.4) {
    // Strong night owl pattern - potentially problematic for team collaboration
    score += 6;
  } else if (nightOwlRatio > 0.2) {
    // Moderate night owl pattern
    score += 3;
  }

  if (earlyBirdRatio > 0.4) {
    // Strong early bird pattern - generally positive but could indicate overwork
    score += 2;
  }

  if (normalRatio < 0.3) {
    // Very few commits during normal hours - could indicate poor work-life balance
    score += 4;
  }

  // Check for weekend/late night coding patterns
  const lateNightCommits = [0, 1, 2, 3, 4].reduce((sum, hour) => sum + hourCounts[hour], 0);
  const lateNightRatio = lateNightCommits / totalCommits;
  
  if (lateNightRatio > 0.2) {
    // Significant late-night coding - potential burnout indicator
    score += 3;
  }

  // Cap at max score of 10
  return Math.min(10, Math.round(score * 100) / 100);
}