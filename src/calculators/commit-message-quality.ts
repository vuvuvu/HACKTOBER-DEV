import { Commit } from '../types';

export function calculateCommitMessageQuality(commits: Commit[]): number {
  if (commits.length === 0) return 0;

  let totalScore = 0;

  for (const commit of commits) {
    const message = commit.message;
    let score = 0;

    // Check for minimum length (more than just "fix" or "update")
    if (message.length > 10) score += 20;

    // Check for proper first letter capitalization
    if (message[0] === message[0].toUpperCase() && message[0] !== message[0].toLowerCase()) {
      score += 15;
    }

    // Check for conventional commit format
    if ( /^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .+/.test(message) ) {
      score += 30;
    }

    // Check for explanatory body (separated by blank line)
    const lines = message.split('\n');
    if (lines.length > 2 && lines[1].trim() === '') {
      score += 20;
    }

    // Penalize very short, unhelpful messages
    if (message.length < 5 || /^(fix|update|wip|tmp).*/i.test(message)) {
      score -= 10;
    }

    // Penalize all-caps messages
    if (message === message.toUpperCase() && message !== message.toLowerCase()) {
      score -= 10;
    }

    totalScore += Math.max(0, Math.min(100, score));
  }

  // Average score and scale to 0-25
  const averageScore = totalScore / commits.length;
  return Math.round((averageScore / 100) * 25 * 100) / 100;
}