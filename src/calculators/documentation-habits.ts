import { Commit } from '../types';

export function calculateDocumentationHabits(commits: Commit[]): number {
  if (commits.length === 0) return 0;

  let documentationCommits = 0;
  let codeCommits = 0;

  for (const commit of commits) {
    const message = commit.message.toLowerCase();
    const hasDocsKeywords = /doc|readme|md|changelog|guide|tutorial/i.test(message);

    if (hasDocsKeywords || message.includes('.md') || message.includes('documentation')) {
      documentationCommits++;
    } else {
      // Assume it's a code commit if not explicitly documentation
      codeCommits++;
    }
  }

  // Calculate ratio of documentation to total commits
  const totalRelevantCommits = documentationCommits + codeCommits;
  if (totalRelevantCommits === 0) return 0;

  const docRatio = documentationCommits / totalRelevantCommits;

  // Ideal ratio is around 10-20% documentation
  // Score peaks at 15% documentation ratio
  let score;
  if (docRatio <= 0.15) {
    score = (docRatio / 0.15) * 20;
  } else {
    // Too much documentation might indicate inefficiency
    score = 20 - ((docRatio - 0.15) * 50);
  }

  return Math.round(Math.max(0, Math.min(20, score)) * 100) / 100;
}