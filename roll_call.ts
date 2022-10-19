import { Page, chromium } from "playwright";
import dotenv from "dotenv";

dotenv.config();

async function autoRollCall() {
  const browser = await chromium.launch({
    headless: false,
    channel: "msedge",
  });

  const page = await browser.newPage();
  await page.goto("https://student.tecky.io/");
  await page.waitForTimeout(1000);
  await page.click("button.p-3.btn.btn-primary");
  //   await page.type("input#username.form-control", "siukinpo@gmail.com");
  //   await page.type("input[name=username]", "siukinpo@gmail.com");
  page.on("popup", async (popup) => {
    await popup.waitForLoadState();
    await popup.title();
    await popup.type("input#username.form-control", `${process.env.USERNAME}`);
    await popup.type("input#password.form-control", `${process.env.PASSWORD}`);
    await popup.click("input#kc-login.btn.btn-primary.btn-block.btn-lg");
  });

  await page.click("button.p-3.d-flex.align-items-center.btn.btn-primary");

  // page.on("popup", async (popup) => {
  //   await popup.waitForLoadState();
  //   await popup.title();
  //   await popup.type(
  //     "input#login_field.form-control.input-block.js-login-field",
  //     "siukinpo@gmail.com"
  //   );
  //   await popup.type(
  //     "input#password.form-control.input-block.js-password-field",
  //     "357159Pet"
  //   );
  //   await popup.click("input.btn.btn-primary.btn-block.js-sign-in-button");
  // });
}

autoRollCall();
