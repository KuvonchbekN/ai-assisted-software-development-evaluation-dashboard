import { useEffect, useState } from 'react';
import { realExperiments, sampleExperiments, sampleTasks } from './sampleData';
import type { ExperimentRecord, ProgrammingTask } from '../types/evaluation';

const TASKS_KEY = 'thesis-evaluation-tasks';
const EXPERIMENTS_KEY = 'thesis-evaluation-experiments';
const SEED_VERSION_KEY = 'thesis-evaluation-seed-version';
const CURRENT_SEED_VERSION = 'real-thesis-records-2026-05';
const LEGACY_SAMPLE_TASK_IDS = new Set([
  'task-validation',
  'task-delete-bug',
  'task-crud-tests',
  'task-service-refactor',
  'task-search-filter',
  'task-error-handling',
]);

function readStoredValue<T>(key: string, fallback: T): T {
  try {
    const rawValue = localStorage.getItem(key);
    return rawValue ? (JSON.parse(rawValue) as T) : fallback;
  } catch {
    return fallback;
  }
}

function normalizeExperimentRecord(record: Partial<ExperimentRecord>): ExperimentRecord {
  return {
    id: record.id ?? `experiment-${Date.now()}`,
    taskName: record.taskName ?? '',
    category: record.category ?? 'Uncategorized',
    developmentMode: record.developmentMode ?? 'With AI',
    aiTool: record.aiTool ?? 'None',
    dataType: record.dataType ?? 'Sample',
    buildStatus: record.buildStatus ?? 'Passed',
    completionTimeMinutes: record.completionTimeMinutes ?? 0,
    testsPassed: record.testsPassed ?? 0,
    totalTests: record.totalTests ?? 0,
    lintErrors: record.lintErrors ?? 0,
    qualityScore: record.qualityScore ?? 1,
    notes: record.notes ?? '',
  };
}

export function useLocalStorageState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => readStoredValue(key, fallback));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

export function useEvaluationData() {
  const [tasks, setTasks] = useLocalStorageState<ProgrammingTask[]>(TASKS_KEY, sampleTasks);
  const [experiments, setExperiments] = useLocalStorageState<ExperimentRecord[]>(
    EXPERIMENTS_KEY,
    sampleExperiments,
  );

  useEffect(() => {
    const seedVersion = localStorage.getItem(SEED_VERSION_KEY);

    if (seedVersion === CURRENT_SEED_VERSION) {
      return;
    }

    setTasks((currentTasks) => {
      const looksLikeLegacyTaskSeedData = currentTasks.every((task) =>
        LEGACY_SAMPLE_TASK_IDS.has(task.id),
      );

      return looksLikeLegacyTaskSeedData ? sampleTasks : currentTasks;
    });
    setExperiments((currentExperiments) => {
      const normalizedExperiments = currentExperiments.map(normalizeExperimentRecord);
      const looksLikeUntouchedSeedData = normalizedExperiments.every((record) =>
        record.id.startsWith('exp-'),
      );

      if (looksLikeUntouchedSeedData) {
        return sampleExperiments;
      }

      const currentIds = new Set(normalizedExperiments.map((record) => record.id));
      const missingRealExperiments = realExperiments.filter((record) => !currentIds.has(record.id));

      return [...missingRealExperiments, ...normalizedExperiments];
    });
    localStorage.setItem(SEED_VERSION_KEY, CURRENT_SEED_VERSION);
  }, [setExperiments, setTasks]);

  return {
    tasks,
    setTasks,
    experiments,
    setExperiments,
  };
}
