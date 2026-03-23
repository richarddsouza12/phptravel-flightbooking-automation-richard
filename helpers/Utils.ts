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


  static capitalizeFirstLetter(inputString: string): string {
    if (!inputString) {
      return inputString; // Handles empty or null strings
    }
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

  public static captureScreenshotAttachToReport = async (page: Page, testInfo: TestInfo, screenshotName: string) => {

    var screenshotPath = "screenshots/" + screenshotName + ".png";
    const screenshot = await page.screenshot({ path: screenshotPath, fullPage: true });
    await testInfo.attach(screenshotName, {
      body: screenshot,
      contentType: 'image/png',
    });
  }


  /**
   * 
   * @param env_var_name_without_prefix - pass the name of env var without prefix eg 
   *  for Stage_TrainingURL pass TrainingURL and method will return value of Stage_TrainingURL 
   * @returns 
   */
  static getEnvVarriable(env_var_name_without_prefix: string): string {

    const evnPrefix = String(process.env.ENV).toUpperCase();
    const env_var_name_string = `${evnPrefix}_${env_var_name_without_prefix}`;
    const env_var_value = process.env[env_var_name_string];
    if (!env_var_value) {
      throw new Error(`Environment variable ${env_var_name_string} is not defined`);
    }
    return env_var_value;
  }




}

