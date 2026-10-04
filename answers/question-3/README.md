# Question 3

## (i) Equivalence partitions

| Partition | Valid / Invalid | Example value |
| --- | --- | --- |
| R0.00 to R99.99 | Valid | R50.00 |
| R100.00 to R499.99 | Valid | R250.00 |
| R500.00 to R999.99 | Valid | R750.00 |
| R1000.00 and above | Valid | R1500.00 |
| Negative amount | Invalid | -R1.00 |
| Non-numeric input | Invalid | `abc` |

## (ii) Boundary values

I would test one cent below, at and above each boundary.

| Value | Expected outcome |
| --- | --- |
| -R0.01 | Reject the order. |
| R0.00 | No discount or free shipping. |
| R0.01 | No discount or free shipping. |
| R99.99 | No discount or free shipping. |
| R100.00 | 5% discount, no free shipping. |
| R100.01 | 5% discount, no free shipping. |
| R499.99 | 5% discount, no free shipping. |
| R500.00 | 10% discount and free shipping. |
| R500.01 | 10% discount and free shipping. |
| R999.99 | 10% discount and free shipping. |
| R1000.00 | 15% discount and free shipping. |
| R1000.01 | 15% discount and free shipping. |
