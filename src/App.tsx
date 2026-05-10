import { FormEvent, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  BarChart3,
  ClipboardList,
  Gauge,
  LayoutDashboard,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react';
import { buildChartData, calculateSummaryMetrics, getTestPassRate } from './data/metrics';
import { useEvaluationData } from './data/storage';
import type {
  AiTool,
  DevelopmentMode,
  Difficulty,
  ExperimentRecord,
  ProgrammingTask,
  TaskCategory,
} from './types/evaluation';

type Page = 'dashboard' | 'tasks' | 'experiments' | 'charts';

const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];
const categories: TaskCategory[] = [
  'Bug Fix',
  'Feature',
  'Refactoring',
  'Testing',
  'Validation',
  'Error Handling',
];
const modes: DevelopmentMode[] = ['With AI', 'Without AI'];
const aiTools: AiTool[] = ['Codex', 'ChatGPT', 'GitHub Copilot', 'Cursor', 'None', 'Other'];

const emptyTask: Omit<ProgrammingTask, 'id'> = {
  title: '',
  description: '',
  difficulty: 'Easy',
  category: 'Feature',
};

const emptyExperiment: Omit<ExperimentRecord, 'id'> = {
  taskName: '',
  developmentMode: 'With AI',
  aiTool: 'Codex',
  completionTimeMinutes: 30,
  testsPassed: 0,
  totalTests: 0,
  lintErrors: 0,
  qualityScore: 7,
  notes: '',
};

function createId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}`;
}

function formatNumber(value: number, suffix = '') {
  return value === 0 ? `0${suffix}` : `${value.toFixed(value % 1 === 0 ? 0 : 1)}${suffix}`;
}

function App() {
  const { tasks, setTasks, experiments, setExperiments } = useEvaluationData();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const metrics = useMemo(() => calculateSummaryMetrics(experiments), [experiments]);
  const chartData = useMemo(() => buildChartData(experiments), [experiments]);

  const pages = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks' as const, label: 'Tasks', icon: ClipboardList },
    { id: 'experiments' as const, label: 'Experiments', icon: Gauge },
    { id: 'charts' as const, label: 'Charts', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-line bg-white px-5 py-6 lg:block">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ai">Master thesis</p>
          <h1 className="mt-2 text-xl font-bold leading-tight">
            AI-Assisted Software Development Evaluation Dashboard
          </h1>
        </div>

        <nav className="space-y-2">
          {pages.map((page) => {
            const Icon = page.icon;
            const isActive = currentPage === page.id;

            return (
              <button
                key={page.id}
                type="button"
                onClick={() => setCurrentPage(page.id)}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-semibold transition ${
                  isActive ? 'bg-ai text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon size={18} aria-hidden="true" />
                {page.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="lg:pl-72">
        <header className="border-b border-line bg-white px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-ai">Productivity and code quality study</p>
              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                {pages.find((page) => page.id === currentPage)?.label}
              </h2>
            </div>

            <nav className="grid grid-cols-2 gap-2 sm:flex lg:hidden">
              {pages.map((page) => {
                const Icon = page.icon;
                const isActive = currentPage === page.id;

                return (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => setCurrentPage(page.id)}
                    className={`inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition ${
                      isActive ? 'bg-ai text-white' : 'border border-line bg-white text-slate-700'
                    }`}
                  >
                    <Icon size={16} aria-hidden="true" />
                    {page.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </header>

        <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {currentPage === 'dashboard' && <DashboardPage metrics={metrics} />}
          {currentPage === 'tasks' && <TasksPage tasks={tasks} setTasks={setTasks} />}
          {currentPage === 'experiments' && (
            <ExperimentsPage
              experiments={experiments}
              setExperiments={setExperiments}
              tasks={tasks}
            />
          )}
          {currentPage === 'charts' && <ChartsPage chartData={chartData} />}
        </section>
      </main>
    </div>
  );
}

function DashboardPage({ metrics }: { metrics: ReturnType<typeof calculateSummaryMetrics> }) {
  const stats = [
    { label: 'Total experiment records', value: metrics.totalRecords.toString(), tone: 'border-slate-300' },
    { label: 'Tasks completed with AI', value: metrics.withAi.count.toString(), tone: 'border-blue-300' },
    {
      label: 'Tasks completed without AI',
      value: metrics.withoutAi.count.toString(),
      tone: 'border-teal-300',
    },
    {
      label: 'Average completion time with AI',
      value: formatNumber(metrics.withAi.completionTime, ' min'),
      tone: 'border-blue-300',
    },
    {
      label: 'Average completion time without AI',
      value: formatNumber(metrics.withoutAi.completionTime, ' min'),
      tone: 'border-teal-300',
    },
    {
      label: 'Average quality score with AI',
      value: formatNumber(metrics.withAi.qualityScore, '/10'),
      tone: 'border-blue-300',
    },
    {
      label: 'Average quality score without AI',
      value: formatNumber(metrics.withoutAi.qualityScore, '/10'),
      tone: 'border-teal-300',
    },
    {
      label: 'Average lint errors with AI',
      value: formatNumber(metrics.withAi.lintErrors),
      tone: 'border-blue-300',
    },
    {
      label: 'Average lint errors without AI',
      value: formatNumber(metrics.withoutAi.lintErrors),
      tone: 'border-teal-300',
    },
    {
      label: 'Average test pass rate with AI',
      value: formatNumber(metrics.withAi.testPassRate, '%'),
      tone: 'border-blue-300',
    },
    {
      label: 'Average test pass rate without AI',
      value: formatNumber(metrics.withoutAi.testPassRate, '%'),
      tone: 'border-teal-300',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className={`rounded-lg border-l-4 ${stat.tone} border-y border-r border-line bg-white p-5 shadow-soft`}
          >
            <p className="text-sm font-medium text-slate-600">{stat.label}</p>
            <p className="mt-3 text-3xl font-bold">{stat.value}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ComparisonCard
          title="Productivity"
          leftLabel="With AI"
          leftValue={formatNumber(metrics.withAi.completionTime, ' min')}
          rightLabel="Without AI"
          rightValue={formatNumber(metrics.withoutAi.completionTime, ' min')}
        />
        <ComparisonCard
          title="Quality"
          leftLabel="With AI"
          leftValue={formatNumber(metrics.withAi.qualityScore, '/10')}
          rightLabel="Without AI"
          rightValue={formatNumber(metrics.withoutAi.qualityScore, '/10')}
        />
      </div>
    </div>
  );
}

function ComparisonCard({
  title,
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
}: {
  title: string;
  leftLabel: string;
  leftValue: string;
  rightLabel: string;
  rightValue: string;
}) {
  return (
    <article className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <h3 className="text-base font-bold">{title}</h3>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-md border border-blue-100 bg-blue-50 p-4">
          <p className="text-sm font-semibold text-blue-800">{leftLabel}</p>
          <p className="mt-2 text-2xl font-bold text-blue-950">{leftValue}</p>
        </div>
        <div className="rounded-md border border-teal-100 bg-teal-50 p-4">
          <p className="text-sm font-semibold text-teal-800">{rightLabel}</p>
          <p className="mt-2 text-2xl font-bold text-teal-950">{rightValue}</p>
        </div>
      </div>
    </article>
  );
}

function TasksPage({
  tasks,
  setTasks,
}: {
  tasks: ProgrammingTask[];
  setTasks: React.Dispatch<React.SetStateAction<ProgrammingTask[]>>;
}) {
  const [form, setForm] = useState(emptyTask);
  const [editingId, setEditingId] = useState<string | null>(null);

  function resetForm() {
    setForm(emptyTask);
    setEditingId(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      return;
    }

    if (editingId) {
      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === editingId ? { ...task, ...form } : task)),
      );
    } else {
      setTasks((currentTasks) => [{ id: createId('task'), ...form }, ...currentTasks]);
    }

    resetForm();
  }

  function editTask(task: ProgrammingTask) {
    setForm({
      title: task.title,
      description: task.description,
      difficulty: task.difficulty,
      category: task.category,
    });
    setEditingId(task.id);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <form onSubmit={handleSubmit} className="rounded-lg border border-line bg-white p-5 shadow-soft">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h3 className="text-lg font-bold">{editingId ? 'Edit task' : 'Add task'}</h3>
          {editingId && (
            <button type="button" className="btn-secondary" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>

        <div className="space-y-4">
          <label>
            <span className="field-label">Task title</span>
            <input
              className="form-field"
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              required
            />
          </label>

          <label>
            <span className="field-label">Task description</span>
            <textarea
              className="form-field min-h-28 resize-y"
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              required
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className="field-label">Difficulty</span>
              <select
                className="form-field"
                value={form.difficulty}
                onChange={(event) => setForm({ ...form, difficulty: event.target.value as Difficulty })}
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty}>{difficulty}</option>
                ))}
              </select>
            </label>

            <label>
              <span className="field-label">Category</span>
              <select
                className="form-field"
                value={form.category}
                onChange={(event) => setForm({ ...form, category: event.target.value as TaskCategory })}
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </label>
          </div>

          <button type="submit" className="btn-primary w-full">
            <Plus size={16} aria-hidden="true" />
            {editingId ? 'Save task' : 'Add task'}
          </button>
        </div>
      </form>

      <div className="overflow-hidden rounded-lg border border-line bg-white shadow-soft">
        <div className="border-b border-line px-5 py-4">
          <h3 className="text-lg font-bold">Programming tasks</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-line text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-5 py-3">Task</th>
                <th className="px-5 py-3">Difficulty</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {tasks.map((task) => (
                <tr key={task.id} className="align-top">
                  <td className="px-5 py-4">
                    <p className="font-semibold">{task.title}</p>
                    <p className="mt-1 max-w-xl text-slate-600">{task.description}</p>
                  </td>
                  <td className="px-5 py-4">{task.difficulty}</td>
                  <td className="px-5 py-4">{task.category}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button type="button" className="btn-secondary" onClick={() => editTask(task)}>
                        <Pencil size={15} aria-hidden="true" />
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn-danger"
                        onClick={() => setTasks((currentTasks) => currentTasks.filter((item) => item.id !== task.id))}
                      >
                        <Trash2 size={15} aria-hidden="true" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ExperimentsPage({
  experiments,
  setExperiments,
  tasks,
}: {
  experiments: ExperimentRecord[];
  setExperiments: React.Dispatch<React.SetStateAction<ExperimentRecord[]>>;
  tasks: ProgrammingTask[];
}) {
  const [form, setForm] = useState<Omit<ExperimentRecord, 'id'>>({
    ...emptyExperiment,
    taskName: tasks[0]?.title ?? '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  function resetForm() {
    setForm({ ...emptyExperiment, taskName: tasks[0]?.title ?? '' });
    setEditingId(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedRecord = {
      ...form,
      completionTimeMinutes: Math.max(0, form.completionTimeMinutes),
      testsPassed: Math.min(Math.max(0, form.testsPassed), Math.max(0, form.totalTests)),
      totalTests: Math.max(0, form.totalTests),
      lintErrors: Math.max(0, form.lintErrors),
      qualityScore: Math.min(10, Math.max(1, form.qualityScore)),
      aiTool: form.developmentMode === 'Without AI' ? 'None' : form.aiTool,
    };

    if (editingId) {
      setExperiments((currentExperiments) =>
        currentExperiments.map((record) =>
          record.id === editingId ? { ...record, ...normalizedRecord } : record,
        ),
      );
    } else {
      setExperiments((currentExperiments) => [
        { id: createId('experiment'), ...normalizedRecord },
        ...currentExperiments,
      ]);
    }

    resetForm();
  }

  function editExperiment(record: ExperimentRecord) {
    setForm({
      taskName: record.taskName,
      developmentMode: record.developmentMode,
      aiTool: record.aiTool,
      completionTimeMinutes: record.completionTimeMinutes,
      testsPassed: record.testsPassed,
      totalTests: record.totalTests,
      lintErrors: record.lintErrors,
      qualityScore: record.qualityScore,
      notes: record.notes,
    });
    setEditingId(record.id);
  }

  return (
    <div className="grid gap-6 2xl:grid-cols-[460px_1fr]">
      <form onSubmit={handleSubmit} className="rounded-lg border border-line bg-white p-5 shadow-soft">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h3 className="text-lg font-bold">{editingId ? 'Edit experiment record' : 'Add experiment record'}</h3>
          {editingId && (
            <button type="button" className="btn-secondary" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>

        <div className="space-y-4">
          <label>
            <span className="field-label">Task name</span>
            <input
              className="form-field"
              list="task-options"
              value={form.taskName}
              onChange={(event) => setForm({ ...form, taskName: event.target.value })}
              required
            />
            <datalist id="task-options">
              {tasks.map((task) => (
                <option key={task.id} value={task.title} />
              ))}
            </datalist>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className="field-label">Development mode</span>
              <select
                className="form-field"
                value={form.developmentMode}
                onChange={(event) => {
                  const developmentMode = event.target.value as DevelopmentMode;
                  setForm({
                    ...form,
                    developmentMode,
                    aiTool: developmentMode === 'Without AI' ? 'None' : form.aiTool,
                  });
                }}
              >
                {modes.map((mode) => (
                  <option key={mode}>{mode}</option>
                ))}
              </select>
            </label>

            <label>
              <span className="field-label">AI tool used</span>
              <select
                className="form-field"
                value={form.aiTool}
                onChange={(event) => setForm({ ...form, aiTool: event.target.value as AiTool })}
                disabled={form.developmentMode === 'Without AI'}
              >
                {aiTools.map((tool) => (
                  <option key={tool}>{tool}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField
              label="Completion time in minutes"
              value={form.completionTimeMinutes}
              min={0}
              onChange={(completionTimeMinutes) => setForm({ ...form, completionTimeMinutes })}
            />
            <NumberField
              label="Lint errors"
              value={form.lintErrors}
              min={0}
              onChange={(lintErrors) => setForm({ ...form, lintErrors })}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <NumberField
              label="Tests passed"
              value={form.testsPassed}
              min={0}
              onChange={(testsPassed) => setForm({ ...form, testsPassed })}
            />
            <NumberField
              label="Total tests"
              value={form.totalTests}
              min={0}
              onChange={(totalTests) => setForm({ ...form, totalTests })}
            />
            <NumberField
              label="Quality score"
              value={form.qualityScore}
              min={1}
              max={10}
              step={0.1}
              onChange={(qualityScore) => setForm({ ...form, qualityScore })}
            />
          </div>

          <label>
            <span className="field-label">Notes</span>
            <textarea
              className="form-field min-h-24 resize-y"
              value={form.notes}
              onChange={(event) => setForm({ ...form, notes: event.target.value })}
            />
          </label>

          <button type="submit" className="btn-primary w-full">
            <Plus size={16} aria-hidden="true" />
            {editingId ? 'Save record' : 'Add record'}
          </button>
        </div>
      </form>

      <div className="overflow-hidden rounded-lg border border-line bg-white shadow-soft">
        <div className="border-b border-line px-5 py-4">
          <h3 className="text-lg font-bold">Experiment records</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[980px] divide-y divide-line text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-5 py-3">Task</th>
                <th className="px-5 py-3">Mode</th>
                <th className="px-5 py-3">Tool</th>
                <th className="px-5 py-3">Time</th>
                <th className="px-5 py-3">Tests</th>
                <th className="px-5 py-3">Lint</th>
                <th className="px-5 py-3">Quality</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {experiments.map((record) => (
                <tr key={record.id} className="align-top">
                  <td className="px-5 py-4">
                    <p className="font-semibold">{record.taskName}</p>
                    <p className="mt-1 max-w-md text-slate-600">{record.notes}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        record.developmentMode === 'With AI'
                          ? 'bg-blue-50 text-blue-800'
                          : 'bg-teal-50 text-teal-800'
                      }`}
                    >
                      {record.developmentMode}
                    </span>
                  </td>
                  <td className="px-5 py-4">{record.aiTool}</td>
                  <td className="px-5 py-4">{record.completionTimeMinutes} min</td>
                  <td className="px-5 py-4">
                    {record.testsPassed}/{record.totalTests}
                    <span className="ml-1 text-slate-500">
                      ({formatNumber(getTestPassRate(record), '%')})
                    </span>
                  </td>
                  <td className="px-5 py-4">{record.lintErrors}</td>
                  <td className="px-5 py-4">{record.qualityScore}/10</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button type="button" className="btn-secondary" onClick={() => editExperiment(record)}>
                        <Pencil size={15} aria-hidden="true" />
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn-danger"
                        onClick={() =>
                          setExperiments((currentExperiments) =>
                            currentExperiments.filter((item) => item.id !== record.id),
                          )
                        }
                      >
                        <Trash2 size={15} aria-hidden="true" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label>
      <span className="field-label">{label}</span>
      <input
        className="form-field"
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        required
      />
    </label>
  );
}

function ChartsPage({ chartData }: { chartData: ReturnType<typeof buildChartData> }) {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      {chartData.map((item) => (
        <article key={item.metric} className="rounded-lg border border-line bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold">{item.metric}</h3>
            <span className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-slate-600">
              {item.unit}
            </span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  {
                    comparison: item.metric,
                    'With AI': item.withAi,
                    'Without AI': item.withoutAi,
                  },
                ]}
                margin={{ top: 12, right: 12, left: 0, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#d9dee8" />
                <XAxis dataKey="comparison" tick={{ fill: '#475569', fontSize: 12 }} />
                <YAxis tick={{ fill: '#475569', fontSize: 12 }} width={44} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    borderColor: '#d9dee8',
                    boxShadow: '0 10px 30px rgba(24, 32, 43, 0.08)',
                  }}
                />
                <Legend />
                <Bar dataKey="With AI" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Without AI" fill="#0f766e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
      ))}
    </div>
  );
}

export default App;
