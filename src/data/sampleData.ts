import type { ExperimentRecord, ProgrammingTask } from '../types/evaluation';

export const sampleTasks: ProgrammingTask[] = [
  {
    id: 'task-real-sample-vs-real-data',
    title: 'Add sample vs real data distinction',
    description:
      'Add data labels so real thesis experiment records are clearly separated from sample/demo records.',
    dataType: 'Real',
    difficulty: 'Medium',
    category: 'Validation',
  },
  {
    id: 'task-real-methodology-page',
    title: 'Add Methodology page in app',
    description:
      'Add an in-app methodology page explaining the experiment structure and how AI/non-AI results are compared.',
    dataType: 'Real',
    difficulty: 'Medium',
    category: 'Feature',
  },
  {
    id: 'task-real-csv-export',
    title: 'Add CSV export for experiment records',
    description:
      'Export experiment records in a spreadsheet-friendly CSV format with fields ordered for thesis analysis.',
    dataType: 'Real',
    difficulty: 'Medium',
    category: 'Feature',
  },
  {
    id: 'task-real-readme-methodology',
    title: 'Improve README methodology section',
    description:
      'Clarify how AI-assisted and non-AI-assisted work are compared without overstating the evidence.',
    dataType: 'Real',
    difficulty: 'Easy',
    category: 'Refactoring',
  },
  {
    id: 'task-real-form-validation',
    title: 'Fix/extend experiment form validation',
    description:
      'Improve validation behavior for experiment result entry so invalid values are constrained consistently.',
    dataType: 'Real',
    difficulty: 'Medium',
    category: 'Validation',
  },
  {
    id: 'task-real-metric-refactor',
    title: 'Refactor metric calculation helpers',
    description:
      'Move repeated dashboard calculations into clearer helper functions while preserving current behavior.',
    dataType: 'Real',
    difficulty: 'Medium',
    category: 'Refactoring',
  },
  {
    id: 'task-real-dashboard-warning-text',
    title: 'Improve dashboard warning text',
    description:
      'Update dashboard wording so approximate or sample records are not mistaken for final measured results.',
    dataType: 'Real',
    difficulty: 'Easy',
    category: 'Validation',
  },
  {
    id: 'task-real-manual-qa',
    title: 'Manually verify charts and data display',
    description:
      'Check dashboard, charts, record list, and add/edit/delete behavior in the running application.',
    dataType: 'Real',
    difficulty: 'Easy',
    category: 'Testing',
  },
];

const realExperimentRecords: ExperimentRecord[] = [
  {
    id: 'real-sample-vs-real-data',
    taskName: 'Add sample vs real data distinction',
    category: 'Validation / Methodology',
    developmentMode: 'With AI',
    aiTool: 'Codex',
    dataType: 'Real',
    buildStatus: 'Passed',
    completionTimeMinutes: 24,
    testsPassed: 2,
    totalTests: 2,
    lintErrors: 0,
    qualityScore: 8,
    notes:
      'Codex helped add the distinction between sample/demo records and real experiment records quickly. I manually checked that the label was clear in the dashboard and did not confuse the existing data view.',
  },
  {
    id: 'real-methodology-page',
    taskName: 'Add Methodology page in app',
    category: 'Feature / Documentation',
    developmentMode: 'With AI',
    aiTool: 'Codex',
    dataType: 'Real',
    buildStatus: 'Passed',
    completionTimeMinutes: 31,
    testsPassed: 3,
    totalTests: 3,
    lintErrors: 0,
    qualityScore: 8,
    notes:
      'Codex generated most of the page structure and routing changes. I reviewed the wording manually to make sure it matched the thesis experiment method.',
  },
  {
    id: 'real-csv-export',
    taskName: 'Add CSV export for experiment records',
    category: 'Feature',
    developmentMode: 'With AI',
    aiTool: 'Codex',
    dataType: 'Real',
    buildStatus: 'Passed',
    completionTimeMinutes: 34,
    testsPassed: 4,
    totalTests: 4,
    lintErrors: 0,
    qualityScore: 8,
    notes:
      'Codex generated the export logic quickly. I manually checked the downloaded CSV and adjusted the column order to match the experiment fields.',
  },
  {
    id: 'real-readme-methodology',
    taskName: 'Improve README methodology section',
    category: 'Documentation',
    developmentMode: 'With AI',
    aiTool: 'ChatGPT',
    dataType: 'Real',
    buildStatus: 'Passed',
    completionTimeMinutes: 18,
    testsPassed: 4,
    totalTests: 4,
    lintErrors: 0,
    qualityScore: 7,
    notes:
      'ChatGPT helped write a clearer explanation of how AI and non-AI tasks are compared. I edited the final wording to avoid making unsupported claims.',
  },
  {
    id: 'real-form-validation',
    taskName: 'Fix/extend experiment form validation',
    category: 'Validation',
    developmentMode: 'Without AI',
    aiTool: 'None',
    dataType: 'Real',
    buildStatus: 'Passed',
    completionTimeMinutes: 43,
    testsPassed: 5,
    totalTests: 5,
    lintErrors: 0,
    qualityScore: 8,
    notes:
      'Implemented manually by inspecting the existing form state and validation logic. It took longer than the AI-assisted tasks, but the behavior was easier to control directly.',
  },
  {
    id: 'real-metric-refactor',
    taskName: 'Refactor metric calculation helpers',
    category: 'Refactoring',
    developmentMode: 'Without AI',
    aiTool: 'None',
    dataType: 'Real',
    buildStatus: 'Passed',
    completionTimeMinutes: 39,
    testsPassed: 6,
    totalTests: 6,
    lintErrors: 0,
    qualityScore: 8,
    notes:
      'Refactored repeated metric calculations into helper functions manually. The change improved readability and reduced duplication without changing dashboard behavior.',
  },
  {
    id: 'real-dashboard-warning-text',
    taskName: 'Improve dashboard warning text',
    category: 'UX / Content',
    developmentMode: 'Without AI',
    aiTool: 'None',
    dataType: 'Real',
    buildStatus: 'Passed',
    completionTimeMinutes: 22,
    testsPassed: 6,
    totalTests: 6,
    lintErrors: 0,
    qualityScore: 7,
    notes:
      'Updated warning text manually to explain that approximate or sample records should not be treated as final measured results. The UI change was small but improves research transparency.',
  },
  {
    id: 'real-manual-qa',
    taskName: 'Manually verify charts and data display',
    category: 'Manual QA',
    developmentMode: 'Without AI',
    aiTool: 'None',
    dataType: 'Real',
    buildStatus: 'Passed',
    completionTimeMinutes: 29,
    testsPassed: 6,
    totalTests: 6,
    lintErrors: 0,
    qualityScore: 8,
    notes:
      'Opened the app locally and checked the dashboard, charts, record list, and add/edit/delete flow. No critical issues were found.',
  },
];

export const realExperiments = realExperimentRecords;
export const sampleExperiments: ExperimentRecord[] = realExperimentRecords;
