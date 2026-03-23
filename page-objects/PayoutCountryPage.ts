import { Locator, Page } from "@playwright/test";
import { text } from "node:stream/consumers";

export class PayoutCountryPage {
   
    readonly page : Page ;
    public countryLableLocator ?: Locator;
    public continueButton : Locator;

    constructor( page : Page ) {
    
        this.page = page;
        this.continueButton = this.page.getByRole('button', { name: 'Continue' })
    }

    async selectPayoutCountry( countryCode: string) {
        
         this.countryLableLocator = this.page.locator(`div[class="payout-locators"] span[aria-label="${countryCode}"]`)
         await this.countryLableLocator.click();

    }
    
    async clickContinue() {
        await this.continueButton.click()
    }

}