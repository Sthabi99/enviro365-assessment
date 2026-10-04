# Enviro365 assessment

Junior Test Automation Engineer assessment.

## Answers

Each question has its own folder. Open the folder to read the answers and find the related scripts and evidence.

- [Question 1](answers/question-1/) - API test cases, response checks and edge cases
- [Question 2](answers/question-2/) - Selenium login tests, waits and locators
- [Question 3](answers/question-3/) - equivalence partitions and boundary values
- [Question 4](answers/question-4/) - registration tests, defect report and payment charter

The ReqRes field checks, GET requests and edge-case exploration were run on 4 October 2026. Both Selenium login tests passed in Chrome. Registration cases and the payment charter are written exercises; no application was provided to run them against.

## Setup

Open this folder in VS Code. Use Node.js 22 or later and install dependencies with `npm install`. Alternatively, use `pnpm install --frozen-lockfile` with the included lockfile.

Run the commands from this project's root folder:

| Command | What it runs |
| --- | --- |
| `npm run check:fields` | Question 1: missing, empty and null fields |
| `npm run check:edges` | Question 1: edge-case exploration |
| `npm run test:ui` | Question 2: successful and failed login |

For ReqRes, copy `.env.example` to `.env` and add your API key. Do not commit `.env`. New API results are saved to `reports/`; the recorded assessment results are inside Question 1's `evidence` folder.

Google Chrome must be installed for the UI tests. The successful login screenshot is saved to `screenshots/login-success.png`. The recorded screenshot is inside Question 2's `evidence` folder.

To run Chrome without opening a window in PowerShell:

```powershell
$env:HEADLESS = 'true'
npm run test:ui
```

## Submission details

GitHub: https://github.com/Sthabi99/enviro365-assessment

Branch: `main`
