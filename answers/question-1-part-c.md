# Question 1 - Part C

## Edge cases and negative tests

I explored the following cases against ReqRes on 4 October 2026. The expected checks below reflect the observed endpoint behaviour where it is known; a validation rule should not be invented when the brief does not state it.

| Scenario | Example request | Expected check | Observed result |
| --- | --- | --- | --- |
| Missing fields | `POST /users` with `{}`, then only `name` or only `job` | Check whether the endpoint requires either field. Based on the field-check run, expect 201 and creation metadata even when fields are omitted. | All returned 201 with `id` and `createdAt`. Omitted fields stayed absent. |
| Empty or whitespace values | `POST /users` with `{"name":"   ","job":""}` | Check whether blanks are rejected or changed. Based on the observed behaviour, expect the values to be returned unchanged. | 201; whitespace and the empty string were preserved. |
| Wrong data types | `POST /users` with `{"name":123,"job":null}` | Check whether the API enforces strings. Based on this run, expect 201 and the original values. | 201; numeric name and null job were accepted and returned. |
| Invalid user IDs | `GET /users/0`, `/users/-1`, `/users/abc` | Expect 404 with no user details for these unmatched IDs. | All returned 404 with `{}`. |
| Page beyond the last page | `GET /users?page=999` | Expect 200 with an empty `data` array and consistent total counts. | 200, `data: []`, `page: 999`, `total: 12`, `total_pages: 2`. |
| Malformed JSON | `POST /users` with `{"name":"John Doe","job":}` | Expect 400 with a JSON parsing error and no successful creation response. | 400 with `error: "invalid_json"`. No creation metadata was returned. |
| Repeated create request | Send `{"name":"John Doe","job":"QA Engineer"}` twice | If duplicates are allowed, expect two 201 responses with different IDs. Do not assume names must be unique. | Both returned 201; the IDs were different. |

Missing, empty and null fields were also checked individually in [required-fields.json](../evidence/required-fields.json). The other responses are in [edge-cases.json](../evidence/edge-cases.json). Run `npm run check:edges` to repeat this exploration.

The scripts record responses for inspection; they do not assert every expected property automatically. These findings show that this endpoint accepts many inputs that a production API might reject. They do not establish validation rules for other endpoints.
