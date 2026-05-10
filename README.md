# AI-Assisted Software Development Evaluation Dashboard

This React + Vite application is the practical engineering component for the master thesis:

**AI-Assisted Software Development: Evaluating the Impact on Developer Productivity and Code Quality**

The dashboard records programming tasks and experiment results completed with AI assistance and without AI assistance. It is intentionally simple, local, and screenshot-friendly for thesis documentation.

## Purpose

The application supports a controlled comparison of software development work under two conditions:

- **With AI assistance** using tools such as Codex, ChatGPT, GitHub Copilot, or Cursor.
- **Without AI assistance** using a manual development process.

The goal is to make productivity and quality differences visible through consistent task records, manual experiment entry, summary metrics, and comparison charts.

## Metrics Collected

Each experiment record stores:

- Task name
- Development mode: With AI or Without AI
- AI tool used
- Completion time in minutes
- Tests passed
- Total tests
- Lint errors
- Code quality score from 1 to 10
- Notes

The dashboard calculates:

- Total experiment records
- Number of tasks completed with AI
- Number of tasks completed without AI
- Average completion time for both modes
- Average quality score for both modes
- Average lint errors for both modes
- Average test pass rate for both modes

## Thesis Support

The app helps structure the empirical part of the thesis by making each task measurable and comparable. AI-assisted and non-AI-assisted development are compared using the same metrics, which supports discussion of:

- Developer productivity through completion time
- Code quality through a manual quality score
- Correctness through test pass rate
- Maintainability signals through lint error counts
- Qualitative observations through experiment notes

## Example Tasks

The app includes project-specific starter tasks based on this dashboard implementation:

- Initialize React Vite TypeScript project
- Build dashboard metric cards
- Implement task management CRUD
- Implement experiment results CRUD
- Add Recharts comparison charts
- Add localStorage persistence and README

## Data Storage

All data is stored in the browser using `localStorage`. There is no backend. Sample data is loaded automatically the first time the app is opened so the dashboard is not empty.

## Sample Data Calibration

The initial experiment records are illustrative seed data, not primary thesis results and not a claim that this exact project was implemented twice. They use tasks from this dashboard project and are calibrated from published research so the first dashboard view uses plausible ratios:

- A controlled GitHub Copilot experiment reported that developers with Copilot completed a JavaScript task **55.8% faster** than the control group.
- McKinsey reported strong time savings for common software development work, including writing new code in nearly half the time and refactoring in roughly two-thirds the time, while code quality was only marginally better when developers reviewed and iterated on AI output.
- The 2024 DORA report found AI adoption was associated with individual improvements such as code quality and documentation quality, but also warned about delivery stability and throughput tradeoffs.
- METR's 2025 randomized controlled trial found experienced open-source developers working on familiar repositories took **19% longer** with AI tools, so the seed data includes one complex task where AI is slower.

Sources:

- [Microsoft Research: The Impact of AI on Developer Productivity](https://www.microsoft.com/en-us/research/publication/the-impact-of-ai-on-developer-productivity-evidence-from-github-copilot/)
- [McKinsey: Unleashing developer productivity with generative AI](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/unleashing-developer-productivity-with-generative-ai)
- [DORA: 2024 Accelerate State of DevOps Report](https://dora.dev/research/2024/dora-report/)
- [METR: Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)

## Install Dependencies

```bash
npm install
```

## Run the Project

```bash
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Build for Production

```bash
npm run build
```

## Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- Recharts
- localStorage
