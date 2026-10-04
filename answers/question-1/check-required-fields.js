import { mkdir, writeFile } from 'node:fs/promises';

// Read the key from .env rather than putting it in the source code.
const apiKey = process.env.REQRES_API_KEY?.trim();
if (!apiKey) {
  console.error('Set REQRES_API_KEY in .env before running this check.');
  process.exit(1);
}

const baseUrl = process.env.REQRES_BASE_URL || 'https://reqres.in/api';
// Start with valid data, then change one field at a time.
// An omitted field, an empty string and null are different inputs.
const cases = [
  { label: 'Both fields supplied', body: { name: 'John Doe', job: 'QA Engineer' } },
  { label: 'Name omitted', body: { job: 'QA Engineer' } },
  { label: 'Job omitted', body: { name: 'John Doe' } },
  { label: 'Both fields omitted', body: {} },
  { label: 'Empty name', body: { name: '', job: 'QA Engineer' } },
  { label: 'Empty job', body: { name: 'John Doe', job: '' } },
  { label: 'Null name', body: { name: null, job: 'QA Engineer' } },
  { label: 'Null job', body: { name: 'John Doe', job: null } },
];

const results = [];
let blocked = false;
try {
  for (const [index, scenario] of cases.entries()) {
    // Send the requests one at a time so each result has a clear label.
    const response = await fetch(`${baseUrl.replace(/\/$/, '')}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
      body: JSON.stringify(scenario.body),
      // Stop waiting after 30 seconds if the service does not respond.
      signal: AbortSignal.timeout(30000),
    });
    // A service error might not contain JSON. Keep the check from crashing on it.
    const text = await response.text();
    let body;
    try { body = JSON.parse(text); } catch { body = '[Non-JSON response]'; }
    // Auth and service errors cannot establish whether a field is required.
    const outcome = response.ok ? 'Accepted'
      : [400, 422].includes(response.status) ? 'Rejected: inspect validation error'
      : 'Inconclusive';
    results.push({ scenario: scenario.label, request: scenario.body, status: response.status, outcome, response: body });
    console.log(`${scenario.label}: HTTP ${response.status} - ${outcome}`);

    // Establish a working baseline before testing missing fields.
    if ((index === 0 && response.status !== 201) || outcome === 'Inconclusive') {
      console.error('Stopped: resolve the baseline, authentication or service error before drawing conclusions.');
      blocked = true;
      break;
    }
  }
} catch (error) {
  console.error(`Request failed: ${error.name}. The remaining cases were not run.`);
  blocked = true;
}

// Save the responses so we can inspect the fields as well as the status codes.
// Reports contain the request bodies, but never the authentication headers.
await mkdir('reports', { recursive: true });
await writeFile('reports/required-fields.json', JSON.stringify({
  runAt: new Date().toISOString(),
  endpoint: `${baseUrl.replace(/\/$/, '')}/users`,
  complete: !blocked && results.length === cases.length,
  results,
}, null, 2));
console.log('Results saved to reports/required-fields.json');
if (blocked) process.exitCode = 1;
