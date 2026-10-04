# Question 1 - Part B

## (i) Assertions for GET /users/2

For the response provided in the question, I would check:

| Check | Expected result |
| --- | --- |
| HTTP status | `200 OK` |
| Content type | `application/json`, allowing an optional charset |
| User ID | `data.id` is the number `2` |
| Email | `data.email` is `janet.weaver@reqres.in` |
| First name | `data.first_name` is `Janet` |
| Last name | `data.last_name` is `Weaver` |
| Avatar | `data.avatar` is `https://reqres.in/img/faces/2-image.jpg` |
| Support details | `support.url` is `https://reqres.in/#support-heading`, and `support.text` matches the text in the sample response |

I would also check that the body is valid JSON before reading its fields. Checking the avatar URL alone does not prove that the image loads; that would need a separate request.

## (ii) GET /users/999

I would expect **404 Not Found**, because user `999` does not exist. The request is valid, but the API cannot find the requested user.

For the ReqRes example, I would expect an empty JSON object (`{}`) and no user details. The status code is the main check; an API with a different error format could return a message explaining that the user was not found.

## Live check

On 4 October 2026, GET `/users/2` returned `200 OK` with the same user ID, email, names and avatar as the sample. Its content type was `application/json; charset=utf-8`. GET `/users/999` returned `404 Not Found` with `{}`.

The live `support.url` and `support.text` differ from the assessment sample. The table above answers the question about that sample; for a live test I would check that the support URL is a valid HTTPS URL and the text is a non-empty string, unless the contract requires specific values. I would not treat changed promotional text as a user-data defect.

The responses are saved in [question-1-part-b.json](../evidence/question-1-part-b.json).
