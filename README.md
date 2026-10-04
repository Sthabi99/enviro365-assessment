# Enviro365 assessment

Junior Test Automation Engineer assessment.

## Answers

- [Question 1, Part A](answers/question-1-part-a.md) - POST /users test cases
- [Question 1, Part B](answers/question-1-part-b.md) - response checks and missing users
- [Question 1, Part C](answers/question-1-part-c.md) - edge cases and negative tests
- [Question 2](answers/question-2.md) - Selenium login tests, waits and locators
- [Question 3](answers/question-3.md) - equivalence partitions and boundary values
- [Question 4](answers/question-4.md) - registration test cases and defect report

The remaining answers and automation scripts will be added as each question is completed. Question 1 contains written test designs. Both Question 2 login tests passed in Chrome on 4 October 2026.

## Setup

Open this folder in VS Code. Use Node.js 22 or later.

Install dependencies with `npm install`. Google Chrome must be installed for the UI tests. Run `npm run test:ui` to test both login scenarios. The successful login screenshot is saved to `screenshots/login-success.png`.

Alternatively, use `pnpm install --frozen-lockfile` and `pnpm test:ui` with the included pnpm lockfile.

To run without opening a Chrome window in PowerShell:

```powershell
$env:HEADLESS = 'true'
npm run test:ui
```

For API tests, copy `.env.example` to `.env` and add your ReqRes API key. Do not commit `.env`.

## Submission details

GitHub: https://github.com/Sthabi99/enviro365-assessment

Branch: `main`
