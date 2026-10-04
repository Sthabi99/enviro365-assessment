import { mkdir, writeFile } from 'node:fs/promises';

const key = process.env.REQRES_API_KEY?.trim();
if (!key) {
  console.error('Set REQRES_API_KEY in .env first.');
  process.exit(1);
}
const base = (process.env.REQRES_BASE_URL || 'https://reqres.in/api').replace(/\/$/, '');
const validUser = JSON.stringify({ name: 'John Doe', job: 'QA Engineer' });
const cases = [
  { label: 'Whitespace and empty values', method: 'POST', path: '/users', body: JSON.stringify({ name: '   ', job: '' }) },
  { label: 'Wrong field types', method: 'POST', path: '/users', body: JSON.stringify({ name: 123, job: null }) },
  ...['0', '-1', 'abc'].map(id => ({ label: `User ID ${id}`, method: 'GET', path: `/users/${id}` })),
  ...['0', '-1', 'abc', '999'].map(page => ({ label: `Page ${page}`, method: 'GET', path: `/users?page=${page}` })),
  { label: 'Malformed JSON', method: 'POST', path: '/users', body: '{"name":"John Doe","job":}' },
  { label: 'Repeated create - first request', method: 'POST', path: '/users', body: validUser },
  { label: 'Repeated create - second request', method: 'POST', path: '/users', body: validUser },
];
const results = [];
let complete = true;
try {
  for (const scenario of cases) {
    const response = await fetch(`${base}${scenario.path}`, {
      method: scenario.method,
      headers: { 'Content-Type': 'application/json', 'x-api-key': key },
      ...(scenario.body !== undefined ? { body: scenario.body } : {}),
      signal: AbortSignal.timeout(30000),
    });
    const text = await response.text();
    let body;
    try { body = JSON.parse(text); } catch { body = text; }
    results.push({ ...scenario, status: response.status, response: body });
    console.log(`${scenario.label}: HTTP ${response.status}`);
    if ([401, 403, 429].includes(response.status) || response.status >= 500) {
      console.error('Stopped after an authentication, rate-limit or server error.');
      complete = false;
      break;
    }
  }
} catch (error) {
  console.error(`Request failed: ${error.name}. Remaining cases were not run.`);
  complete = false;
}
await mkdir('reports', { recursive: true });
await writeFile('reports/edge-cases.json', JSON.stringify({ runAt: new Date().toISOString(), baseUrl: base, complete, results }, null, 2));
console.log('Results saved to reports/edge-cases.json');
if (!complete) process.exitCode = 1;
