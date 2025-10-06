#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { analyzeRepository } from './analyzer';
import { loadMetrics, loadAchievements } from './data-loader';
import { generateReport } from './reporter';

const program = new Command();

program
  .name('hacktober-dev')
  .description('Analyze your development habits and earn Hacktoberfest achievements! 🎃')
  .version('0.1.0')
  .option('-d, --dir <path>', 'Git repository directory to analyze', '.')
  .option('-v, --verbose', 'Show detailed analysis')
  .option('--submit', 'Submit results to Hacktoberfest leaderboard')
  .option('--test', 'Run with sample data for testing')
  .action(async (options) => {
    console.log(chalk.blue.bold('🎯 Hacktober Dev - Hackiness Measurement Tool'));
    console.log(chalk.gray('Analyzing your development habits...\n'));

    try {
      // Load metrics and achievements
      const metrics = await loadMetrics();
      const achievements = await loadAchievements();

      console.log(chalk.green(`✓ Loaded ${metrics.length} metrics and ${achievements.length} achievements`));

      // Analyze repository
      const analysis = await analyzeRepository(options.dir, metrics);

      // Generate report
      const report = generateReport(analysis, achievements);

      // Display results
      console.log(report.summary);

      if (options.verbose) {
        console.log(report.details);
      }

      if (options.submit) {
        console.log(chalk.yellow('\n🚀 Feature coming soon: Submit to leaderboard!'));
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error(chalk.red('❌ Error:'), errorMessage);
      process.exit(1);
    }
  });

program.parse();