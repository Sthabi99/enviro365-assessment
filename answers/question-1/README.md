# Question 1 - API testing

## Part A

**Request:** `POST https://reqres.in/api/users`

**Headers:** `Content-Type: application/json` and `x-api-key` from the local environment.

I checked which variables are required , found that  `name` and `job` are not required, ReqRes returned `201 Created` when either field was missing and when both were missing.

| Test case ID | Description | Request body | Expected status | Response body checks |
| --- | --- | --- | --- | --- |
| TC-API-001 | Create a user with valid details. | `{"name":"John Doe","job":"QA Engineer"}` | 201 Created | `name` is `John Doe`, `job` is `QA Engineer`, `id` is a non-empty string, and `createdAt` is returned |
| TC-API-002 | Submit an empty object. | `{}` | 201 Created | `id` and a valid `createdAt` are returned. `name` and `job` are absent. |
| TC-API-003 | Leave out the name. | `{"job":"QA Engineer"}` | 201 Created | `job` is `QA Engineer`; `name` is absent. `id` and a valid `createdAt` are returned. |
| TC-API-004 | Leave out the job. | `{"name":"John Doe"}` | 201 Created | `name` is `John Doe`; `job` is absent. `id` and a valid `createdAt` are returned. |

### Field checks

all eight requests returned `201`: both fields supplied, each omitted, both omitted, each empty and each null. This endpoint did not enforce required-field validation in that run.

## Part B

### (i) Assertions for GET /users/2


| Check | Expected result |
| --- | --- |
| HTTP status | `200 OK` |
| Content type | `application/json`, allowing an optional charset |
| User ID | `data.id` is the number `2` |
| Email | `data.email` is `janet.weaver@reqres.in` |
| First name | `data.first_name` is `Janet` |
| Last name | `data.last_name` is `Weaver` |
| Avatar | `data.avatar` is `https://reqres.in/img/faces/2-image.jpg` |


I would also check that the body is valid JSON before reading its fields.

### (ii) GET /users/999

I would expect **404 Not Found**, because user `999` does not exist. The request is valid, but the API cannot find the requested user.

For the ReqRes example, I would expect an empty JSON object (`{}`) and no user details. The status code is the main check; an API with a different error format could return a message explaining that the user was not found.

## Part C

The expected checks below reflect the observed endpoint behaviour where it is known.

| Scenario | Example request | Expected check | Observed result |
| --- | --- | --- | --- |
| Missing fields | `POST /users` with `{}`, then only `name` or only `job` | Check whether the endpoint requires either field. Based on the field-check run, expect 201 and creation metadata even when fields are omitted. | All returned 201 with `id` and `createdAt`. Omitted fields stayed absent. |
| Empty or whitespace values | `POST /users` with `{"name":"   ","job":""}` | Check whether blanks are rejected or changed. Based on the observed behaviour, expect the values to be returned unchanged. | 201; whitespace and the empty string were preserved. |
| Wrong data types | `POST /users` with `{"name":123,"job":null}` | Check whether the API enforces strings. Based on this run, expect 201 and the original values. | 201; numeric name and null job were accepted and returned. |
| Invalid user IDs | `GET /users/0`, `/users/-1`, `/users/abc` | Expect 404 with no user details for these unmatched IDs. | All returned 404 with `{}`. |
| Page beyond the last page | `GET /users?page=999` | Expect 200 with an empty `data` array and consistent total counts. | 200, `data: []`, `page: 999`, `total: 12`, `total_pages: 2`. |
| Malformed JSON | `POST /users` with `{"name":"John Doe","job":}` | Expect 400 with a JSON parsing error and no successful creation response. | 400 with `error: "invalid_json"`. No creation metadata was returned. |
| Repeated create request | Send `{"name":"John Doe","job":"QA Engineer"}` twice | If duplicates are allowed, expect two 201 responses with different IDs. Do not assume names must be unique. | Both returned 201; the IDs were different. |
