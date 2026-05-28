# AI-Assisted Software Development Evaluation Dashboard

This React + Vite application is the practical engineering component for the master thesis:

**AI-Assisted Software Development: Evaluating the Impact on Developer Productivity and Code Quality**

The dashboard records programming tasks and experiment results completed with AI assistance and without AI assistance. It is intentionally simple, local, and screenshot-friendly for thesis documentation.

The current dataset includes **8 real thesis experiment records**. The data model still supports records marked `Sample`, but no demo/sample records are seeded by default.

## Purpose

The application supports a controlled comparison of software development work under two conditions:

- **With AI assistance** using tools such as Codex, ChatGPT, GitHub Copilot, or Cursor.
- **Without AI assistance** using a manual development process.

The goal is to make productivity and quality differences visible through consistent task records, manual experiment entry, summary metrics, and comparison charts.

## Metrics Collected

Each experiment record stores:

- Task name
- Category
- Development mode: With AI or Without AI
- AI tool used
- Data type: Real or Sample
- Build status
- Completion time in minutes
- Verification checks passed
- Total verification checks
- Lint errors
- Code quality score from 1 to 10
- Notes

The dashboard calculates:

- Real or sample experiment records currently analyzed
- Number of tasks completed with AI
- Number of tasks completed without AI
- Total completion time for both modes
- Average completion time for both modes
- Average quality score for both modes
- Average lint errors for both modes
- Verification check pass rate for both modes
- Build pass counts for both modes

## Thesis Support

The app helps structure the empirical part of the thesis by making each task measurable and comparable. AI-assisted and non-AI-assisted development are compared using the same metrics, which supports discussion of:

- Developer productivity through completion time
- Code quality through a manual quality score
- Correctness through verification check pass rate
- Maintainability signals through lint error counts
- Qualitative observations through experiment notes

The real dataset is a small-scale practical self-study. It is useful for structured thesis analysis and screenshots, but it should not be presented as a large statistical study.

## Task Records

The Tasks section contains 8 real thesis task definitions that correspond to the 8 real experiment records.

Real thesis tasks:

- Add sample vs real data distinction
- Add Methodology page in app
- Add CSV export for experiment records
- Improve README methodology section
- Fix/extend experiment form validation
- Refactor metric calculation helpers
- Improve dashboard warning text
- Manually verify charts and data display

## Data Storage

All data is stored in the browser using `localStorage`. There is no backend. Real thesis records are loaded automatically the first time the app is opened. The application can still store records marked `Sample` if they are entered manually, but final analysis should be based on records marked `Real`.

## Real Experiment Results

The real thesis records currently produce these calculated results:

- With AI tasks: 4
- Without AI tasks: 4
- Total AI-assisted time: 107 minutes
- Total non-AI time: 133 minutes
- Average AI-assisted time: 26.75 minutes
- Average non-AI time: 33.25 minutes
- Average AI-assisted quality score: 7.75 / 10
- Average non-AI quality score: 7.75 / 10
- AI-assisted verification checks passed: 13 / 13
- Non-AI verification checks passed: 23 / 23
- Verification check pass rate: 100% for both groups
- Build status: passed for all real records
- Lint errors: 0 for all real records

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
