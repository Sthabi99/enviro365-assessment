# Question 1 — Part A: POST /users test cases

Endpoint: `POST https://reqres.in/api/users`

## Preconditions and assumptions

- Send requests with `Content-Type: application/json` and an API key if required by the live service. Keep the key in an environment variable; do not commit it.
- The brief specifies `name` and `job` in the request but does not define validation rules or error messages. For the negative cases below, assume both fields are required. The expected 400 responses are proposed requirements, not verified ReqRes behaviour. Confirm the contract before treating these cases as executable acceptance tests.
- These are designed test cases. Execution status: **Not run**.

| Test Case ID | Description | Input / Request Body | Expected Response Code | Expected Response Body Assertions |
| --- | --- | --- | --- | --- |
| TC-API-001 | Create a user with the sample valid data. | `{"name":"John Doe","job":"QA Engineer"}` | **201 Created** | JSON body has `name` equal to `John Doe` and `job` equal to `QA Engineer`; `id` is a non-empty string; `createdAt` is a valid ISO 8601 timestamp. |
| TC-API-002 | Create a user whose name contains Unicode characters. No ASCII-only restriction is stated. | `{"name":"José Dlamini","job":"Test Automation Engineer"}` | **201 Created** | JSON body preserves `name` as `José Dlamini` and `job` as `Test Automation Engineer`; `id` is a non-empty string; `createdAt` is a valid ISO 8601 timestamp. |
| TC-API-003 | Attempt to create a user without the assumed required `name` field. | `{"job":"QA Engineer"}` | **400 Bad Request**, assuming required-field validation | JSON body contains a meaningful validation error identifying the missing `name` field; no successful creation metadata (`id` or `createdAt`) is returned. Exact error shape and wording must be confirmed from the API contract. |
| TC-API-004 | Attempt to create a user without the assumed required `job` field. | `{"name":"John Doe"}` | **400 Bad Request**, assuming required-field validation | JSON body contains a meaningful validation error identifying the missing `job` field; no successful creation metadata (`id` or `createdAt`) is returned. Exact error shape and wording must be confirmed from the API contract. |

## Execution note

Do not assume that a demonstration API enforces production validation rules. If ReqRes accepts an incomplete payload, record the actual result and clarify the intended validation contract. Do not report a failure against a required-field rule that has not been agreed.

Reference for current authentication setup: [ReqRes API documentation](https://reqres.in/docs).
