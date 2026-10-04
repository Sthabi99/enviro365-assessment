# Question 1 - Part A

**Request:** `POST https://reqres.in/api/users`

**Headers:** `Content-Type: application/json` and `x-api-key` from the local environment.

I checked the endpoint before deciding whether `name` and `job` were required. ReqRes returned `201 Created` when either field was missing and when both were missing. These cases check the observed behaviour rather than assuming required-field validation.

| Test case ID | Description | Request body | Expected status | Response body checks |
| --- | --- | --- | --- | --- |
| TC-API-001 | Create a user with valid details. | `{"name":"John Doe","job":"QA Engineer"}` | 201 Created | `name` is `John Doe`, `job` is `QA Engineer`, `id` is a non-empty string, and `createdAt` is a valid ISO 8601 timestamp. |
| TC-API-002 | Submit an empty object. | `{}` | 201 Created | `id` and a valid `createdAt` are returned. `name` and `job` are absent. |
| TC-API-003 | Leave out the name. | `{"job":"QA Engineer"}` | 201 Created | `job` is `QA Engineer`; `name` is absent. `id` and a valid `createdAt` are returned. |
| TC-API-004 | Leave out the job. | `{"name":"John Doe"}` | 201 Created | `name` is `John Doe`; `job` is absent. `id` and a valid `createdAt` are returned. |

## Field checks

On 4 October 2026, all eight requests returned `201`: both fields supplied, each omitted, both omitted, each empty and each null. This endpoint did not enforce required-field validation in that run. These findings do not establish validation rules for other endpoints.

Recorded responses are in [required-fields.json](../evidence/required-fields.json). Run `npm run check:fields` to repeat the requests. The script records responses for inspection; it is an exploratory check, not an automated assertion of every property in this table.
