# Question 2

## Part A - Successful login

The script is in [login.test.js](login.test.js). The first test opens Chrome, enters `tomsmith` and `SuperSecretPassword!`, and clicks Login. It checks that the success message is visible and contains `You logged into a secure area!`, then saves `screenshots/login-success.png` and closes Chrome.

## Part B (i) - Failed login

The second test uses `wronguser` and `WrongPassword!`. It checks that a visible error contains `Your username is invalid!` and that the browser remains on the login page. Each test uses a new browser session, and `finally` closes it even if the test fails.

## Part B (ii) - Waits and locators

### Implicit and explicit waits

An implicit wait applies to element searches across the browser session. If an element is not found immediately, Selenium keeps looking until the timeout. It does not check whether the element is visible or ready to use.

For example, I could use a short implicit wait on a simple page where fields take a moment to appear:

```javascript
await driver.manage().setTimeouts({ implicit: 3000 });
const username = await driver.findElement(By.id('username'));
```

An explicit wait is for a specific condition, such as a message becoming visible after login. It continues as soon as the condition is met, or fails when the timeout expires.

```javascript
const message = await driver.wait(
  until.elementLocated(By.css('.flash.success')),
  10000
);
await driver.wait(until.elementIsVisible(message), 10000);
```

I used explicit waits in the login tests because I need to check visibility before interacting with the fields or reading the result. I would not mix implicit and explicit waits, since that can make timeout behaviour unpredictable.

### Preferred locator

I would use a unique, stable ID first. The username and password fields already have IDs, so `By.id('username')` and `By.id('password')` are easy to read and do not depend on the page layout.

For elements without an ID, I would use a short CSS selector, such as `button[type='submit']` or `.flash.error`. I would avoid a long XPath tied to the page structure because a small layout change could break it.

Reference: [Selenium waiting strategies](https://www.selenium.dev/documentation/webdriver/waits/).

## Test run

Both tests passed on 4 October 2026 using headless Chrome and selenium-webdriver 4.50.0. There were 2 passes and no failures or skipped tests.

![Successful login](evidence/login-success.png)
