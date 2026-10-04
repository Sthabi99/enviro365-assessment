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


I would also check that the body is valid JSON before reading its fields. Checking the avatar URL alone does not prove that the image loads; that would need a separate request.

## (ii) GET /users/999

I would expect **404 Not Found**, because user `999` does not exist. The request is valid, but the API cannot find the requested user.

For the ReqRes example, I would expect an empty JSON object (`{}`) and no user details. The status code is the main check; an API with a different error format could return a message explaining that the user was not found.

These answers use the sample response and the non-existent user described in the question. They are not live test results.
