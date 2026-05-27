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

export type DataType = 'Sample' | 'Real';

export type BuildStatus = 'Passed' | 'Failed';

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
  category: string;
  developmentMode: DevelopmentMode;
  aiTool: AiTool;
  dataType: DataType;
  buildStatus: BuildStatus;
  completionTimeMinutes: number;
  testsPassed: number;
  totalTests: number;
  lintErrors: number;
  qualityScore: number;
  notes: string;
}

export interface MetricGroup {
  completionTime: number;
  totalCompletionTime: number;
  qualityScore: number;
  lintErrors: number;
  testPassRate: number;
  testsPassed: number;
  totalTests: number;
  buildPassed: number;
  count: number;
}

export interface SummaryMetrics {
  totalRecords: number;
  sampleRecords: number;
  realRecords: number;
  activeDataType: DataType;
  withAi: MetricGroup;
  withoutAi: MetricGroup;
}
