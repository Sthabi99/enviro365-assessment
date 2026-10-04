# Question 4

## Part A - Registration test cases

| TC # | Test case title | Preconditions | Test steps | Expected result | Pass / Fail |
| --- | --- | --- | --- | --- | --- |
| TC-REG-001 | Register with valid details | Registration form is open and email is unused. | Enter the valid details above and click Register. | Registration succeeds with no validation errors. | Not run |
| TC-REG-002 | Leave required fields blank | Registration form is open. | Leave all fields blank and click Register. Then repeat with one required field blank at a time. | Registration is blocked. An inline error appears below each failing field. | Not run |
| TC-REG-003 | Check the full name | Other fields are valid; use a fresh email for accepted inputs. | Try a name of 60 letters, then 61 letters. Also try `Thabo123` and `Thabo@Dlamini`. Click Register each time. | The 60-character name is accepted. The other names are rejected with an inline name error. | Not run |
| TC-REG-004 | Check email and mobile number | Other fields are valid. | Try email `thabo.example.com`. Restore the valid email, then try mobile numbers `082123456`, `08212345678`, `1821234567` and `08212A4567` separately. Click Register each time. | Invalid email shows an email error. Numbers with the wrong length, starting digit or a letter show a mobile error. Registration is blocked. | Not run |
| TC-REG-005 | Check password rules and matching | Other fields are valid. | Try `Secur1!` (too short), `secure1!` (no uppercase), `SecureA!` (no number) and `Secure12` (no special character), matching the confirmation each time. Then use `Secure1!` with confirmation `Secure2!`. Click Register for each variation. | Invalid passwords show a password error. Different passwords show a confirmation error. Registration is blocked. | Not run |
| TC-REG-006 | Check the minimum age | Other fields are valid; use a fresh email for accepted inputs. | Try DOB 4 October 2009 (17), 5 October 2008 (under 18), and 4 October 2008 (exactly 18). Click Register each time. | Users under 18 are blocked with an inline DOB error. A user exactly 18 can register. | Not run |

## Part B - Defect report

| Field | Details |
| --- | --- |
| Defect ID | BUG-REG-001 |
| Title / Summary | A 17-year-old user can register |
| Severity & Priority | High severity and high priority because the form allows users below the minimum age. |
| Environment (OS, Browser, App Version) | Not provided in the question. |
| Steps to Reproduce | 1. Open the registration form. 2. Enter valid details in all other fields. 3. Enter DOB 4 October 2009, using 4 October 2026 as the test date. 4. Click Register. |
| Actual Result | Registration proceeds and no age error appears, as described in the question. |
| Expected Result | Registration is blocked and an inline DOB error says the user must be at least 18. |
| Attachments / Notes | No attachments provided. Retest users just below 18 and exactly 18 after the fix. |

## Part C - Payment Details testing charter (Step 4)

### Mission / Goal

Check that customers can enter payment details and complete payment, and that failures are handled without duplicate charges.

### What I will test

Payment fields, the checkout total, successful and declined payments, error messages and retries.

### How I will test

Use the payment sandbox and test cards in a browser. Try valid and invalid inputs, check expiry-date boundaries, and use browser developer tools to simulate a slow or lost connection. Note any unexpected results and how to reproduce them.

### Time budget

45 minutes: 5 for setup, 15 for field validation, 15 for payment outcomes and retries, and 10 to review findings.

### Test ideas

1. Submit empty fields and invalid card details. Check that errors are clear and payment is blocked.
2. Try an expired card and a card expiring this month. Check the expiry validation.
3. Use approved and declined test cards. Check that only an approved payment confirms the order and that a decline shows a useful error.
4. Double-click Pay and retry after a slow response. Check that the customer is not charged twice.
5. Disconnect during payment, then reconnect. Check that the customer can recover and see the payment status before trying again.
