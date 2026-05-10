export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type TaskCategory =
  | 'Bug Fix'
  | 'Feature'
  | 'Refactoring'
  | 'Testing'
  | 'Validation'
  | 'Error Handling';

export type DevelopmentMode = 'With AI' | 'Without AI';

export type AiTool = 'Codex' | 'ChatGPT' | 'GitHub Copilot' | 'Cursor' | 'None' | 'Other';

export interface ProgrammingTask {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  category: TaskCategory;
}

export interface ExperimentRecord {
  id: string;
  taskName: string;
  developmentMode: DevelopmentMode;
  aiTool: AiTool;
  completionTimeMinutes: number;
  testsPassed: number;
  totalTests: number;
  lintErrors: number;
  qualityScore: number;
  notes: string;
}

export interface MetricGroup {
  completionTime: number;
  qualityScore: number;
  lintErrors: number;
  testPassRate: number;
  count: number;
}

export interface SummaryMetrics {
  totalRecords: number;
  withAi: MetricGroup;
  withoutAi: MetricGroup;
}
