import simpleGit from 'simple-git';
import * as path from 'path';
import { Metric, MetricResult, RepositoryAnalysis, Commit } from './types';
import * as calculators from './calculators';

export async function analyzeRepository(repoPath: string, metrics: Metric[]): Promise<RepositoryAnalysis> {
  const git = simpleGit(repoPath);

  // Check if we're in a git repository
  const isRepo = await git.checkIsRepo();
  if (!isRepo) {
    throw new Error(`Not a git repository: ${repoPath}`);
  }

  // Get all commits
  const log = await git.log({ maxCount: 1000 });
  const commits: Commit[] = log.all.map(commit => ({
    hash: commit.hash,
    date: commit.date,
    message: commit.message,
    author_name: commit.author_name,
    author_email: commit.author_email
  }));

  if (commits.length === 0) {
    throw new Error('No commits found in repository');
  }

  // Get repository info
  const remotes = await git.getRemotes(true);
  const repoName = path.basename(repoPath);

  // Calculate date range
  const dates = commits.map(c => new Date(c.date));
  const startDate = new Date(Math.min(...dates.map(d => d.getTime())));
  const endDate = new Date(Math.max(...dates.map(d => d.getTime())));

  // Calculate metrics
  const metricResults: MetricResult[] = [];
  let totalScore = 0;
  let maxScore = 0;

  for (const metric of metrics) {
    const result = await calculateMetric(commits, metric);
    metricResults.push(result);
    totalScore += result.score;
    maxScore += metric.max;
  }

  return {
    repository: repoName,
    totalCommits: commits.length,
    dateRange: {
      start: startDate,
      end: endDate
    },
    metrics: metricResults,
    totalScore,
    maxScore
  };
}

async function calculateMetric(commits: Commit[], metric: Metric): Promise<MetricResult> {
  // Dynamically call the calculator function
  const calculatorFunction = (calculators as any)[metric.calculator];

  if (!calculatorFunction || typeof calculatorFunction !== 'function') {
    throw new Error(`Calculator function not found: ${metric.calculator}`);
  }

  try {
    const value = calculatorFunction(commits);
    const score = Math.min(value, metric.max);

    return {
      metricId: metric.id,
      value,
      score
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.warn(`Warning: Failed to calculate metric ${metric.id}:`, errorMessage);
    return {
      metricId: metric.id,
      value: 0,
      score: 0,
      details: `Error: ${errorMessage}`
    };
  }
}