// Simple-git commit type
export interface Commit {
  hash: string;
  date: string;
  message: string;
  author_name: string;
  author_email: string;
}

export interface Metric {
  id: string;
  name: string;
  description: string;
  weight: number;
  calculator: string; // Reference to calculator function
  max: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  requirement: {
    metric: string;
    value: number;
    operator: '>=' | '<=' | '>' | '<';
  };
  badge: string;
  category: 'positive' | 'negative' | 'neutral';
}

export interface MetricResult {
  metricId: string;
  value: number;
  score: number;
  details?: string;
}

export interface RepositoryAnalysis {
  repository: string;
  totalCommits: number;
  dateRange: {
    start: Date;
    end: Date;
  };
  metrics: MetricResult[];
  totalScore: number;
  maxScore: number;
}

export interface Report {
  summary: string;
  details: string;
  achievements: Achievement[];
}

// Legacy types for backward compatibility
export type ComparisonOperator = "<" | "<=" | ">" | ">=";

export interface HabitDefinition {
  id: string;
  name: string;
  description: string;
  metric: string;
  operator: ComparisonOperator;
  threshold: number;
  guidance: string;
}

export interface HabitDetection {
  definition: HabitDefinition;
  active: boolean;
}