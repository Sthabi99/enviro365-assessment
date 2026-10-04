# Question 3

## (i) Equivalence partitioning

Each partition groups order totals that should receive the same result. I would choose one value from each group to check the rule.

| Partition | Example input | Expected discount | Free shipping | Expected result |
| --- | --- | --- | --- | --- |
| R0.00 to R99.99 | R50.00 | 0% | No | Accept the total without a discount. |
| R100.00 to R499.99 | R250.00 | 5% | No | Apply the 5% discount. |
| R500.00 to R999.99 | R750.00 | 10% | Yes | Apply the 10% discount and free shipping. |
| R1000.00 and above | R1500.00 | 15% | Yes | Apply the 15% discount and free shipping. |
| Negative numbers | -R1.00 | N/A | N/A | Reject the order. |
| Non-numeric input | `abc` | N/A | N/A | Reject the order and show a validation error. |

The brief only rejects negative or non-numeric input, so I have included zero in the first valid partition. I have assumed amounts use two decimal places and that shipping eligibility is based on the order total before the discount. No maximum order total is given.

## (ii) Boundary value analysis

I would test one cent below, exactly at, and one cent above each point where the rule changes. I would also test the minimum valid amount, zero.

| Order total | Expected discount | Free shipping | Expected result |
| --- | --- | --- | --- |
| -R0.01 | N/A | N/A | Reject the order because the total is negative. |
| R0.00 | 0% | No | Valid under the stated rules; no discount. |
| R0.01 | 0% | No | Accept without a discount. |
| R99.99 | 0% | No | Accept without a discount. |
| R100.00 | 5% | No | Start applying the 5% discount. |
| R100.01 | 5% | No | Apply the 5% discount. |
| R499.99 | 5% | No | Apply the 5% discount; no free shipping. |
| R500.00 | 10% | Yes | Start applying the 10% discount and free shipping. |
| R500.01 | 10% | Yes | Apply the 10% discount and free shipping. |
| R999.99 | 10% | Yes | Apply the 10% discount and free shipping. |
| R1000.00 | 15% | Yes | Start applying the 15% discount. |
| R1000.01 | 15% | Yes | Apply the 15% discount and free shipping. |

These cases check the specified discount rates and shipping rules. The brief does not give a rounding rule for the discounted amount, so I would confirm that before checking the final amount to pay.
