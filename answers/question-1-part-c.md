# Question 1 - Part C

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
