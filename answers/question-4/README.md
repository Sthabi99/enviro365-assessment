# Question 4

## Part A - Registration test cases

For each test, the registration form is open and the test email is not already registered. Use these valid details unless the case says otherwise:

| Field | Test data |
| --- | --- |
| Full name | Thabo Dlamini |
| Email | thabo.qa@example.com |
| Mobile number | 0821234567 |
| Password | Secure1! |
| Confirm password | Secure1! |
| Date of birth | 4 October 2000 |

Age examples use **4 October 2026** as the test date. Adjust the dates if testing on another day. For cases with several inputs, run each variation separately with the other fields valid. Use a fresh email for any variation that creates an account.

| TC # | Test case title | Preconditions | Test steps | Expected result | Pass / Fail |
| --- | --- | --- | --- | --- | --- |
| TC-REG-001 | Register with valid details | Form is open; email is unused. | 1. Enter the valid details above. 2. Click Register. | Registration succeeds. No field validation errors appear. | Not run |
| TC-REG-002 | Check required fields | Form is open. | 1. Submit the form with all fields blank. 2. Repeat with each required field blank individually and the other fields valid. Include blank confirm password with a valid password. | Registration is blocked. An inline error appears below each failing field. A blank confirmation does not match the entered password. | Not run |
| TC-REG-003 | Check name length and allowed characters | Other fields contain valid details. | 1. Try a name containing exactly 60 letters and spaces. 2. Repeat with 61 characters. 3. Repeat with `Thabo123`. 4. Repeat with `Thabo@Dlamini`. Click Register after each input. | The 60-character name is accepted. The 61-character name, digits and special character are rejected with an inline name error. | Not run |
| TC-REG-004 | Check email and mobile formats | Other fields contain valid details. | 1. Try emails `thabo.example.com` and `thabo@` separately. 2. Restore the valid email. 3. Try mobile numbers `082123456` (9 digits), `08212345678` (11 digits), `1821234567` (wrong first digit), and `08212A4567` (contains a letter), separately. Click Register after each input. | Each invalid email produces an inline email error. Each invalid mobile number produces an inline mobile error. Registration is blocked in every variation. The valid 10-digit example is covered by TC-REG-001. | Not run |
| TC-REG-005 | Check password rules and confirmation | Other fields contain valid details. | 1. Try `Secur1!` (7 characters), `secure1!` (no uppercase), `SecureA!` (no number), and `Secure12` (no special character), separately. Match confirmation to the password each time. 2. Use valid password `Secure1!` with confirmation `Secure2!`. 3. Repeat with matching confirmation `Secure1!`. | Invalid passwords produce an inline password error and block registration. The mismatch produces an inline confirmation error. Matching valid values allow registration. The valid 8-character boundary is also covered by TC-REG-001. | Not run |
| TC-REG-006 | Check the minimum registration age | Other fields contain valid details; test date is 4 October 2026. | 1. Try DOB 5 October 2008 (one day before turning 18). 2. Try 4 October 2008 (exactly 18). 3. Try 3 October 2008 (18 years and one day). 4. Try 4 October 2009 (exactly 17). Click Register after each input. | Users below 18 are blocked with an inline DOB error. Users exactly 18 and older can register. Use a fresh email for each accepted variation. | Not run |

The brief does not specify the exact error wording or success screen, so these checks focus on the stated validation behaviour. The mobile examples check the given length and leading-zero rules; any additional rules for valid SA prefixes need to be confirmed.

## Part B - Defect report

| Field | Details |
| --- | --- |
| Defect ID | BUG-REG-001 |
| Title / Summary | Registration allows a user who is exactly 17 years old |
| Severity & Priority | High severity, high priority: the minimum-age rule is bypassed and an ineligible user can register. Fix before release. |
| Environment (OS, Browser, App Version) | Not supplied in the scenario. Record the actual OS, browser version and app build when reproducing the bug. |
| Steps to Reproduce | 1. Open the registration form. 2. Enter a valid name, unused email, valid mobile number and valid matching passwords. 3. Enter a DOB exactly 17 years before the test date: for 4 October 2026, use 4 October 2009. 4. Click Register. |
| Actual Result | According to the scenario, no age error appears and registration proceeds. |
| Expected Result | Registration is blocked. An inline error below Date of Birth explains that the user must be at least 18. No account is created. |
| Attachments / Notes | No attachments were provided. When reproducing, capture the entered DOB, test date and successful registration result using test data. Retest the fix at exactly 17, one day before 18, exactly 18 and one day after 18. |

This report describes the bug supplied in the assessment; it is not a claim that I reproduced it in an application.

## Part C - Payment testing charter

## Exploratory testing charter: Payment Details (Step 4)

### Mission

Explore the payment step to find problems with input validation, payment failures and checkout recovery. Check that a customer can pay successfully, understands any errors and is not charged twice.

### What I will test

- Required payment fields and their validation, including card number, cardholder name, expiry date and security code if card payment is supported.
- The amount and currency shown before payment, including discounts, shipping and taxes.
- Successful, declined, cancelled and interrupted payments.
- Back navigation, refresh and retry behaviour.
- Error messages, keyboard access and handling of payment data.

### How I will test

Use a test checkout and the payment provider's sandbox with its approved test cards. Use a normal browser, developer tools and the network panel to observe requests and responses. Use network throttling to explore delays and disconnections.

Apply boundary values to expiry dates and field lengths, equivalence partitioning to valid and invalid inputs, and state transitions to payment retries and navigation. Change one input at a time when checking validation, then try combinations to see how multiple errors are handled. Keep notes of the data, steps, actual result and evidence for each finding.

I would confirm the supported payment methods and provider rules before the session. Use test payment data only, and keep full card details and security codes out of screenshots and reports.

### Time budget: 45 minutes

| Time | Activity |
| --- | --- |
| 0-5 minutes | Prepare a test cart, confirm the expected total and review the available payment methods. |
| 5-15 minutes | Explore required fields, invalid inputs and boundary values. |
| 15-25 minutes | Try successful payments, declines and authentication or cancellation flows where supported. |
| 25-35 minutes | Explore delays, retries, refresh and back navigation. |
| 35-40 minutes | Check error clarity, keyboard access and exposed payment data. |
| 40-45 minutes | Summarise findings, collect evidence and list areas needing more testing. |

### Exploration notes and test ideas

| Test idea | What I would look for |
| --- | --- |
| Submit with all payment fields empty, then omit each field separately. | Payment is blocked and each required field has a clear error. Entered non-sensitive details are kept so the customer can correct the form. |
| Try valid and invalid card numbers, including too few digits, too many digits and letters. | Validation follows the supported card types and provider rules. A plausible format alone does not cause the system to treat the payment as approved. |
| Try an expiry date in the previous month, current month and next month. | Expired cards are rejected. Current-month expiry follows the provider's rule. Invalid months such as `00` and `13` are rejected. |
| Try blank, short, long and non-numeric security codes. | Invalid codes are rejected according to the supported card type. The application does not retain the security code after payment. |
| Use sandbox cards for approval and decline. | Approved payment leads to one confirmed order. A decline shows a useful message, leaves the order unpaid and allows correction or another supported method. |
| Double-click Pay and retry after a delayed response. | The same checkout attempt does not create duplicate charges or orders. A pending payment is not presented as a definite failure, and retry handling checks the existing payment state. |
| Disconnect before sending payment, then interrupt the connection after submission. | The UI gives a clear recovery path. If the outcome is uncertain, the system checks payment status before another attempt instead of charging again blindly. |
| Go back to change the cart, shipping or discount, then return to payment. | The displayed total updates and matches the amount sent to the provider. Any earlier payment state is handled consistently with the changed order. |
| Complete or cancel payment authentication, if supported. | Only confirmed success produces a paid order. Cancellation or failed authentication returns the customer to a recoverable checkout state. |
| Use the form with only the keyboard and correct invalid fields. | Focus order is sensible, field labels and errors are understandable, and payment controls can be used without a mouse. |
| Check the page URL, browser storage and available application logs in the test environment. | Full card numbers and security codes are not unnecessarily exposed or stored. Provider tokenisation and masking follow the agreed design. |

### Session output

Record defects with reproduction steps and evidence, note which payment states were explored, and list unanswered questions or areas that need another session. This charter is a plan; the payment session has not been run because no checkout application or sandbox access was provided.
