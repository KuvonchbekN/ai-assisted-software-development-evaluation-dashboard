import type { DevelopmentMode, ExperimentRecord, MetricGroup, SummaryMetrics } from '../types/evaluation';

const emptyMetricGroup: MetricGroup = {
  completionTime: 0,
  qualityScore: 0,
  lintErrors: 0,
  testPassRate: 0,
  count: 0,
};

function roundMetric(value: number) {
  return Number.isFinite(value) ? Number(value.toFixed(1)) : 0;
}

function average(values: number[]) {
  if (values.length === 0) {
    return 0;
  }

  return roundMetric(values.reduce((total, value) => total + value, 0) / values.length);
}

export function getTestPassRate(record: ExperimentRecord) {
  if (record.totalTests <= 0) {
    return 0;
  }

  return (record.testsPassed / record.totalTests) * 100;
}

export function calculateMetricGroup(records: ExperimentRecord[], mode: DevelopmentMode): MetricGroup {
  const matchingRecords = records.filter((record) => record.developmentMode === mode);

  if (matchingRecords.length === 0) {
    return emptyMetricGroup;
  }

  return {
    completionTime: average(matchingRecords.map((record) => record.completionTimeMinutes)),
    qualityScore: average(matchingRecords.map((record) => record.qualityScore)),
    lintErrors: average(matchingRecords.map((record) => record.lintErrors)),
    testPassRate: average(matchingRecords.map(getTestPassRate)),
    count: matchingRecords.length,
  };
}

export function calculateSummaryMetrics(records: ExperimentRecord[]): SummaryMetrics {
  return {
    totalRecords: records.length,
    withAi: calculateMetricGroup(records, 'With AI'),
    withoutAi: calculateMetricGroup(records, 'Without AI'),
  };
}

export function buildChartData(records: ExperimentRecord[]) {
  const metrics = calculateSummaryMetrics(records);

  return [
    {
      metric: 'Completion time',
      unit: 'min',
      withAi: metrics.withAi.completionTime,
      withoutAi: metrics.withoutAi.completionTime,
    },
    {
      metric: 'Quality score',
      unit: '/10',
      withAi: metrics.withAi.qualityScore,
      withoutAi: metrics.withoutAi.qualityScore,
    },
    {
      metric: 'Lint errors',
      unit: 'errors',
      withAi: metrics.withAi.lintErrors,
      withoutAi: metrics.withoutAi.lintErrors,
    },
    {
      metric: 'Test pass rate',
      unit: '%',
      withAi: metrics.withAi.testPassRate,
      withoutAi: metrics.withoutAi.testPassRate,
    },
  ];
}
