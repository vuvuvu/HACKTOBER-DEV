import { Commit } from '../types';

export function calculateCodeChurn(commits: Commit[]): number {
  if (commits.length === 0) return 0;

  // Note: The current Commit interface doesn't include lines added/deleted
  // This is a placeholder implementation that would need to be enhanced
  // when commit stats are available in the data model
  
  // For now, we'll use a heuristic based on commit message patterns
  // and frequency to estimate code churn
  let churnScore = 0;
  
  // Look for patterns that might indicate high churn
  const churnIndicators = [
    /fix/i,
    /refactor/i,
    /revert/i,
    /hotfix/i,
    /patch/i,
    /bug/i
  ];
  
  const totalCommits = commits.length;
  let churnCommits = 0;
  
  commits.forEach(commit => {
    const hasChurnIndicator = churnIndicators.some(pattern => 
      pattern.test(commit.message)
    );
    
    if (hasChurnIndicator) {
      churnCommits++;
    }
  });
  
  // Calculate churn ratio (0-1) and scale to max score of 15
  const churnRatio = totalCommits > 0 ? churnCommits / totalCommits : 0;
  
  // Higher churn ratio = higher score (more problematic)
  // Scale to 0-15 range as specified in the metric definition
  churnScore = churnRatio * 15;
  
  return Math.round(churnScore * 100) / 100;
}