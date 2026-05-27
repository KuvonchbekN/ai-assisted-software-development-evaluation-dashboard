import type { DataType, DevelopmentMode, ExperimentRecord, MetricGroup, SummaryMetrics } from '../types/evaluation';

const emptyMetricGroup: MetricGroup = {
  completionTime: 0,
  totalCompletionTime: 0,
  qualityScore: 0,
  lintErrors: 0,
  testPassRate: 0,
  testsPassed: 0,
  totalTests: 0,
  buildPassed: 0,
  count: 0,
};

function roundMetric(value: number, decimals = 2) {
  return Number.isFinite(value) ? Number(value.toFixed(decimals)) : 0;
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

export function getAnalysisRecords(records: ExperimentRecord[]) {
  const realRecords = records.filter((record) => record.dataType === 'Real');
  return realRecords.length > 0 ? realRecords : records.filter((record) => record.dataType === 'Sample');
}

export function getActiveDataType(records: ExperimentRecord[]): DataType {
  return records.some((record) => record.dataType === 'Real') ? 'Real' : 'Sample';
}

export function calculateMetricGroup(records: ExperimentRecord[], mode: DevelopmentMode): MetricGroup {
  const matchingRecords = records.filter((record) => record.developmentMode === mode);

  if (matchingRecords.length === 0) {
    return emptyMetricGroup;
  }

  const totalCompletionTime = matchingRecords.reduce(
    (total, record) => total + record.completionTimeMinutes,
    0,
  );
  const testsPassed = matchingRecords.reduce((total, record) => total + record.testsPassed, 0);
  const totalTests = matchingRecords.reduce((total, record) => total + record.totalTests, 0);
  const buildPassed = matchingRecords.filter((record) => record.buildStatus === 'Passed').length;

  return {
    completionTime: average(matchingRecords.map((record) => record.completionTimeMinutes)),
    totalCompletionTime,
    qualityScore: average(matchingRecords.map((record) => record.qualityScore)),
    lintErrors: average(matchingRecords.map((record) => record.lintErrors)),
    testPassRate: totalTests > 0 ? roundMetric((testsPassed / totalTests) * 100) : 0,
    testsPassed,
    totalTests,
    buildPassed,
    count: matchingRecords.length,
  };
}

export function calculateSummaryMetrics(records: ExperimentRecord[]): SummaryMetrics {
  const analysisRecords = getAnalysisRecords(records);

  return {
    totalRecords: analysisRecords.length,
    sampleRecords: records.filter((record) => record.dataType === 'Sample').length,
    realRecords: records.filter((record) => record.dataType === 'Real').length,
    activeDataType: getActiveDataType(records),
    withAi: calculateMetricGroup(analysisRecords, 'With AI'),
    withoutAi: calculateMetricGroup(analysisRecords, 'Without AI'),
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
      metric: 'Tests/checks pass rate',
      unit: '%',
      withAi: metrics.withAi.testPassRate,
      withoutAi: metrics.withoutAi.testPassRate,
    },
  ];
}
