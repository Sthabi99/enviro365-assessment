# Question 1 - Part C

## Edge cases and negative tests

I would explore these cases using the user endpoints from the question. Requests would include valid authentication unless authentication itself is being tested.

| Scenario | Example request | Expected result |
| --- | --- | --- |
| Missing fields | `POST /users` with `{}`, then with only `name` or only `job` | If both fields are required, return `400 Bad Request` with an error for each missing field. The brief does not confirm this rule, so I would check it before reporting a defect. |
| Empty or whitespace-only values | `POST /users` with `{"name":"   ","job":""}` | If blank values are not allowed, reject the request with a validation error. Check whether whitespace is trimmed before validation. |
| Wrong data types | `POST /users` with `{"name":123,"job":null}` | If the fields must be strings, return `400 Bad Request` and identify the invalid fields. The API should not crash or return an internal error. |
| Field length boundaries | For each field, send a string of length `L-1`, `L`, and `L+1`, where `L` is the documented maximum | Accept lengths up to `L` and reject `L+1` with a clear error. The brief gives no maximum, so I would confirm it rather than invent one. Keep the other field valid in each test. |
| Invalid user IDs | `GET /users/0`, `GET /users/-1`, and `GET /users/abc` | A rejected ID could return `400`; a valid route with no matching user could return `404`, depending on the contract. No request should return unrelated user data or a `500` error. |
| Pagination boundaries | `GET /users?page=0`, `GET /users?page=-1`, `GET /users?page=abc`, and a page beyond the last page | Invalid page values should be rejected or handled using a documented default. A valid page beyond the last page should return `200 OK` with an empty `data` array. Check that pagination metadata stays consistent. |
| Malformed JSON | `POST /users` with `{"name":"John Doe","job":}` | Return `400 Bad Request` for invalid JSON. No user should be created and no internal stack trace should be exposed. |
| Repeated create request | Send `{"name":"John Doe","job":"QA Engineer"}` twice to `POST /users` | If duplicate names and jobs are allowed, both requests should return `201` with different IDs. If there is a uniqueness rule, the second request should be rejected with the documented error. I would not assume that names must be unique. |

These are exploration ideas. A live check on 4 October 2026 found that POST `/users` accepts omitted, empty and null `name` and `job` values with `201 Created`. The conditional validation expectations above describe rules to confirm, not failures observed in ReqRes. The remaining scenarios have not been run. See [the recorded field checks](../evidence/required-fields.json).
