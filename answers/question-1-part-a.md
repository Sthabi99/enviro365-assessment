# Question 1 - Part A

**Request:** `POST https://reqres.in/api/users`

**Headers:** `Content-Type: application/json`.

 I have assumed that `name` and `job` are required.

| Test case ID | Description | Request body | Expected status | Response body checks |
| --- | --- | --- | --- | --- |
| TC-API-001 | Create a user with valid details. | `{"name":"John Doe","job":"QA Engineer"}` | 201 Created | `name` is `John Doe`, `job` is `QA Engineer`, `id` is a non-empty string, and `createdAt` is a valid ISO 8601 timestamp. |
| TC-API-002 | Create a user with an accented character in their name. | `{"name":"José Dlamini","job":"Test Automation Engineer"}` | 201 Created | The name is returned as `José Dlamini` without changing the accented character. The job matches the request, and `id` and `createdAt` are present and valid. |
| TC-API-003 | Leave out the name. | `{"job":"QA Engineer"}` | 400 Bad Request, assuming name is required | An error identifies the missing name. No `id` or `createdAt` is returned. |
| TC-API-004 | Leave out the job. | `{"name":"John Doe"}` | 400 Bad Request, assuming job is required | An error identifies the missing job. No `id` or `createdAt` is returned. |

These are expected results, not recorded test results. ReqRes may accept missing fields; if it does, I would check the agreed validation rules before logging a defect.
