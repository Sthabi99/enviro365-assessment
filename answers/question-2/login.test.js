import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

const loginUrl = 'https://the-internet.herokuapp.com/login';
const waitTime = 10000;

async function openChrome() {
  const options = new chrome.Options();
  if (process.env.HEADLESS === 'true') {
    options.addArguments('--headless=new');
  }
  options.addArguments('--window-size=1280,900');
  return new Builder().forBrowser('chrome').setChromeOptions(options).build();
}

async function visibleElement(driver, locator) {
  const element = await driver.wait(until.elementLocated(locator), waitTime);
  await driver.wait(until.elementIsVisible(element), waitTime);
  return element;
}

async function logIn(driver, username, password) {
  await driver.get(loginUrl);
  const usernameField = await visibleElement(driver, By.id('username'));
  const passwordField = await visibleElement(driver, By.id('password'));
  await usernameField.sendKeys(username);
  await passwordField.sendKeys(password);
  await driver.findElement(By.css("button[type='submit']")).click();
}

test('valid details let the user log in', { timeout: 120000 }, async () => {
  const driver = await openChrome();
  try {
    // Enter the valid credentials provided in the assessment.
    await logIn(driver, 'tomsmith', 'SuperSecretPassword!');

    // Wait for the visible success message and check its text.
    const message = await visibleElement(driver, By.css('.flash.success'));
    assert.ok((await message.getText()).includes('You logged into a secure area!'));
    assert.equal(new URL(await driver.getCurrentUrl()).pathname, '/secure');

    // Save the screenshot only after the login checks pass.
    await mkdir('screenshots', { recursive: true });
    await writeFile('screenshots/login-success.png', await driver.takeScreenshot(), 'base64');
  } finally {
    // Close Chrome even if an assertion fails.
    await driver.quit();
  }
});

test('invalid details show a login error', { timeout: 120000 }, async () => {
  const driver = await openChrome();
  try {
    await logIn(driver, 'wronguser', 'WrongPassword!');
    const message = await visibleElement(driver, By.css('.flash.error'));
    assert.ok((await message.getText()).includes('Your username is invalid!'));
    assert.equal(new URL(await driver.getCurrentUrl()).pathname, '/login');
  } finally {
    await driver.quit();
  }
});
