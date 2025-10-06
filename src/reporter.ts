import chalk from 'chalk';
import Table from 'cli-table3';
import { RepositoryAnalysis, Achievement, MetricResult } from './types';

export function generateReport(analysis: RepositoryAnalysis, achievements: Achievement[]): {
  summary: string;
  details: string;
  achievements: Achievement[];
} {
  const percentage = Math.round((analysis.totalScore / analysis.maxScore) * 100);

  // Generate summary
  const summary = generateSummary(analysis, percentage);

  // Generate detailed report
  const details = generateDetails(analysis);

  // Determine earned achievements
  const earnedAchievements = getEarnedAchievements(analysis.metrics, achievements);

  return {
    summary,
    details,
    achievements: earnedAchievements
  };
}

function generateSummary(analysis: RepositoryAnalysis, percentage: number): string {
  let output = '';

  // Header with score
  output += chalk.blue.bold('\n🎯 Your Hacktoberfest Score\n');
  output += chalk.gray('─'.repeat(40)) + '\n\n';

  // Big score display
  const scoreColor = percentage >= 80 ? chalk.green :
                    percentage >= 60 ? chalk.yellow :
                    percentage >= 40 ? chalk.hex('#FFA500') : chalk.red;

  output += scoreColor.bold(`${analysis.totalScore}/${analysis.maxScore} (${percentage}%)`) + '\n\n';

  // Repository info
  output += chalk.gray(`Repository: ${analysis.repository}\n`);
  output += chalk.gray(`Commits analyzed: ${analysis.totalCommits}\n`);
  output += chalk.gray(`Date range: ${analysis.dateRange.start.toLocaleDateString()} - ${analysis.dateRange.end.toLocaleDateString()}\n\n`);

  // Top achievements preview
  const topMetrics = analysis.metrics
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (topMetrics.length > 0) {
    output += chalk.blue.bold('Top Metrics:\n');
    topMetrics.forEach(metric => {
      const percentage = Math.round((metric.score / 20) * 100); // Assuming max of 20 for display
      output += `  • ${chalk.cyan(metric.metricId)}: ${chalk.green(metric.score.toFixed(1))} (${percentage}%)\n`;
    });
    output += '\n';
  }

  // Call to action
  output += chalk.yellow('Run with --verbose for detailed analysis\n');
  output += chalk.yellow('Run with --submit to share your score! 🚀\n');

  return output;
}

function generateDetails(analysis: RepositoryAnalysis): string {
  let output = '';

  output += chalk.blue.bold('\n📊 Detailed Analysis\n');
  output += chalk.gray('─'.repeat(50)) + '\n\n';

  // Metrics table
  const table = new Table({
    head: ['Metric', 'Score', 'Max', 'Percentage'],
    colWidths: [25, 10, 8, 12]
  });

  analysis.metrics.forEach(metric => {
    const percentage = Math.round((metric.score / 20) * 100); // Normalize to percentage
    const scoreColor = percentage >= 80 ? chalk.green :
                      percentage >= 60 ? chalk.yellow :
                      percentage >= 40 ? chalk.hex('#FFA500') : chalk.red;

    table.push([
      metric.metricId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      scoreColor(metric.score.toFixed(1)),
      '20',
      scoreColor(`${percentage}%`)
    ]);
  });

  output += table.toString();
  output += '\n\n';

  // Insights
  output += chalk.blue.bold('💡 Insights\n');
  output += chalk.gray('─'.repeat(20)) + '\n';

  const insights = generateInsights(analysis.metrics);
  insights.forEach(insight => {
    output += `• ${insight}\n`;
  });

  output += '\n';

  return output;
}

function generateInsights(metrics: MetricResult[]): string[] {
  const insights: string[] = [];

  metrics.forEach(metric => {
    const percentage = (metric.score / 20) * 100; // Normalize to percentage

    switch (metric.metricId) {
      case 'commit-frequency':
        if (percentage < 50) {
          insights.push(chalk.yellow('Try to commit more consistently to build better habits'));
        } else if (percentage >= 80) {
          insights.push(chalk.green('Great job maintaining consistent commit frequency!'));
        }
        break;

      case 'commit-message-quality':
        if (percentage < 60) {
          insights.push(chalk.yellow('Focus on writing more descriptive commit messages'));
        } else if (percentage >= 80) {
          insights.push(chalk.green('Excellent commit message quality! Very professional.'));
        }
        break;

      case 'work-consistency':
        if (percentage < 40) {
          insights.push(chalk.yellow('Consider spreading your work more evenly throughout the week'));
        }
        break;

      case 'documentation-habits':
        if (percentage < 50) {
          insights.push(chalk.yellow('Remember to update documentation with your code changes'));
        } else if (percentage >= 80) {
          insights.push(chalk.green('Fantastic documentation habits! Your future self thanks you.'));
        }
        break;

      case 'burst-work-pattern':
        if (percentage >= 70) {
          insights.push(chalk.cyan('You tend to work in focused bursts - embrace your flow!'));
        } else {
          insights.push(chalk.green('You maintain a steady, consistent work pace'));
        }
        break;
    }
  });

  return insights;
}

function getEarnedAchievements(metrics: MetricResult[], allAchievements: Achievement[]): Achievement[] {
  const earned: Achievement[] = [];

  for (const achievement of allAchievements) {
    const metricResult = metrics.find(m => m.metricId === achievement.requirement.metric);

    if (!metricResult) continue;

    const { operator, value } = achievement.requirement;
    const metricValue = metricResult.score;

    let achievementEarned = false;
    switch (operator) {
      case '>=':
        achievementEarned = metricValue >= value;
        break;
      case '<=':
        achievementEarned = metricValue <= value;
        break;
      case '>':
        achievementEarned = metricValue > value;
        break;
      case '<':
        achievementEarned = metricValue < value;
        break;
    }

    if (achievementEarned) {
      earned.push(achievement);
    }
  }

  return earned;
}