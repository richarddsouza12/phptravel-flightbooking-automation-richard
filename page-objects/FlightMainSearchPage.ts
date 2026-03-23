import { Locator,Page } from '@playwright/test';
import { Utils } from '../helpers/Utils';

export default class FlightMainSearchPage {
    
    readonly page: Page;
    private departurecityInput : Locator;
    private arrivalCityInput   : Locator;
    private searchButton       : Locator;
    private departureDatepickerContainer : Locator;

    constructor(page : Page) {
        this.page = page;
        this.departurecityInput = this.page.getByRole('textbox', { name: 'Departure City or Airport' });
        this.arrivalCityInput   = this.page.getByRole('textbox', { name: 'Arrival City or Airport' });
        this.searchButton       = this.page.getByRole('button', { name: 'Search Flight' });
        this.departureDatepickerContainer = this.page.locator(`xpath=//div[contains(@class,'datepicker') and contains(@style,"z-index: 9999") and not(contains(@class,'hidden'))]`);

    }

    async populateFlightSearchDetailsAndSearch( fromCity: string, toCity: string, departureAddOnDays: number) {
        
        //departure city input
        await this.departurecityInput.pressSequentially(fromCity, { delay: 500 })
        await this.page.locator(`xpath=//div[contains(@x-show,"fromShouldShowDropdown")]//span[contains(text(),"Mopa Intl")]`).click();
        
        //arrival city input
        await this.arrivalCityInput.fill(toCity);
        await this.page.locator(`xpath=//div[contains(@x-show,"toShouldShowDropdown")]//span[contains(text(),"Lohegaon")]`).click();

        //departure date selection
        var desiredDepartureDate = Utils.getDateXnumberOfDaysFromToday(departureAddOnDays);
        var desiredDateVariable = desiredDepartureDate.getDate();
        console.log("Desired Date: " + desiredDateVariable);
        await this.departureDatepickerContainer.locator(`xpath=//div[ contains(text(),${desiredDateVariable}) and not(contains(@class,'disabled')) ]`).click();
        await this.searchButton.click();
    }

}
    