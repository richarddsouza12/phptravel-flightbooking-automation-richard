
import { Page , Locator } from "@playwright/test";

export default class FlightSearchListingPage {

    page: Page;
    public searchResultFlightCardsArrayLocator : Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchResultFlightCardsArrayLocator = this.page.locator(`xpath=//div[contains(@x-html,"renderFlightCard")]`);
    }

    async selectFirstFlightAndProceedToBook() {

        var searchResultFlightCardsArrayLocator = await this.searchResultFlightCardsArrayLocator.all();
        var firstFlightCardLocator = searchResultFlightCardsArrayLocator[0];
        console.log(typeof firstFlightCardLocator);
        console.log(await firstFlightCardLocator.getByRole("button", { name: "Book Now" }).evaluate(el => el.outerHTML.split('>')[0] + '>'));
        await firstFlightCardLocator.getByRole("button", { name: "Book Now" }).click();

    }


}