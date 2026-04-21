import { expect } from '@playwright/test';
import { test, RandomUser } from '../custom_fixtures/randomUserFixture';
import { request } from 'node:http';


test.skip("Test1", async ({ page, randomUser, loginData }, testInfo) => {
  
  console.log("RandomUser:", randomUser);
  console.log("LoginData:", loginData);

});


test.skip("Test2", async ({ page, randomUser, loginData }, testInfo) => {

  console.log("RandomUser:", randomUser);
  console.log("LoginData:", loginData);
  
});


test.skip("Test3", async ({ page , request , browser , context }) => {

    await page.goto('https://www.google.com/');
    console.log(await browser.version());  // 145.0.7632.6

});

