import { Metric, Achievement } from './types';
import * as fs from 'fs';
import * as path from 'path';

export async function loadMetrics(): Promise<Metric[]> {
  const metricsDir = path.join(__dirname, '../data/metrics');

  if (!fs.existsSync(metricsDir)) {
    throw new Error(`Metrics directory not found: ${metricsDir}`);
  }

  const files = fs.readdirSync(metricsDir).filter(file => file.endsWith('.json'));
  const metrics: Metric[] = [];

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(metricsDir, file), 'utf-8');
      const metric = JSON.parse(content) as Metric;
      metrics.push(metric);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.warn(`Warning: Failed to load metric from ${file}:`, errorMessage);
    }
  }

  return metrics;
}

export async function loadAchievements(): Promise<Achievement[]> {
  const achievementsDir = path.join(__dirname, '../data/achievements');

  if (!fs.existsSync(achievementsDir)) {
    throw new Error(`Achievements directory not found: ${achievementsDir}`);
  }

  const files = fs.readdirSync(achievementsDir).filter(file => file.endsWith('.json'));
  const achievements: Achievement[] = [];

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(achievementsDir, file), 'utf-8');
      const achievement = JSON.parse(content) as Achievement;
      achievements.push(achievement);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.warn(`Warning: Failed to load achievement from ${file}:`, errorMessage);
    }
  }

  return achievements;
}