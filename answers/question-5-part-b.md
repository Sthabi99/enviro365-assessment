# Question 5 - Part B

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
