import { Page, TestInfo } from "@playwright/test";

export class Utils {

  constructor() {
  }

 
  public static getDateXnumberOfDaysFromToday(daysAhead: number): Date {
    const today = new Date();
    today.setDate(today.getDate() + daysAhead);
    return today;
  }

  public static getDateToday(): Date {
    return new Date();
  }

  public static captureScreenshotAttachToReport = async ( page: Page, testInfo : TestInfo, screenshotName: string) => {
      
      var screenshotPath = "screenshots/" + screenshotName + ".png";
      const screenshot = await page.screenshot({ path: screenshotPath, fullPage: true });
        await testInfo.attach( screenshotName, {
            body: screenshot,
            contentType: 'image/png',
        });
  }

}

