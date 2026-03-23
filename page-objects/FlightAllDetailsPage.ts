import { Locator, Page } from "@playwright/test";
import { PaymentOption } from "../data-models/CustomUnionTypes";
import {GuestDetailsType,PassengerDetailsType} from "../data-models/CustomeDataTypes";


export default class FlightAllDetailsPage {

    page: Page;
    public guestDetailsContianerLocator: Locator;
    public passengerDetailsContainerLocator: Locator;
    public paymentMethodsContainerLocator: Locator;
    public bookingOptionsContainerLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.guestDetailsContianerLocator = this.page.locator(`xpath=//div[@x-data="bookingAuth()"]`);
        this.passengerDetailsContainerLocator = this.page.locator(`xpath=//h3[contains(text(),"Passengers Details")]//parent::div//parent::div//parent::div`);
        this.paymentMethodsContainerLocator = this.page.locator(`xpath=//h3[contains(text(),"Payment Methods")]//parent::div//parent::div//parent::div`);
        this.bookingOptionsContainerLocator = this.page.locator(`xpath=//h3[contains(text(),"Booking Options")]//parent::div//parent::div//parent::div`);
    }


     async processBookingConfirmation() {
        await this.page.waitForTimeout(400);
        await this.bookingOptionsContainerLocator.locator("#terms_accepted").check({ force: true });
        await this.bookingOptionsContainerLocator.getByRole('button', { name: 'Confirm Booking' }).click();
    }

     async selectPaymentOptionByName(optionName: PaymentOption) {
        await this.page.waitForTimeout(400);
        await this.paymentMethodsContainerLocator.getByText(optionName).nth(0).click();
    }

     async fillGuestDetailsSection( guestDetails : GuestDetailsType) {


        //Guest Details Section:
        //radio button to book guest user
        console.log("guestDetailsContianerLocator");
        console.log(await this.guestDetailsContianerLocator.evaluate(el => el.outerHTML.split('>')[0]));
        await this.guestDetailsContianerLocator.locator('input#booking_guest').check();
        console.log("Title Dropdown Element :");
        console.log(await this.guestDetailsContianerLocator.locator(`xpath=//select[contains(@x-model,"primary_guest.title")]`).evaluate(el => el.outerHTML.split('>')[0] + '>'));
        await this.page.waitForTimeout(1000);
        await this.guestDetailsContianerLocator.locator(`xpath=//select[contains(@x-model,"primary_guest.title")]`).selectOption(guestDetails.title, { force: true });
        await this.page.waitForTimeout(400);
        await this.guestDetailsContianerLocator.getByRole('textbox', { name: 'Enter First Name' }).fill(guestDetails.firstName);
        await this.guestDetailsContianerLocator.getByRole('textbox', { name: 'Enter Last Name' }).fill(guestDetails.lastName);
        await this.guestDetailsContianerLocator.getByRole('textbox', { name: 'Enter Email' }).fill(guestDetails.email);
        await this.page.waitForTimeout(400);
        await this.guestDetailsContianerLocator.locator(`xpath=//select[@x-model="primary_guest.country_code"]`).selectOption(guestDetails.nationalityCode); //primary_guest.country_code
        await this.guestDetailsContianerLocator.getByRole('textbox', { name: 'Enter Phone Number' }).fill(guestDetails.phoneNumber);
    }

     async fillPassengerDetailsSection(passengerDetails: PassengerDetailsType) {

        await this.passengerDetailsContainerLocator.locator(`xpath=//select[contains(@x-model,"nationality")]`).selectOption(passengerDetails.nationalityCode, { force: true });
        await this.page.waitForTimeout(400);
        await this.passengerDetailsContainerLocator.locator(`xpath=//select[contains(@x-model,"formData.passengers.adult_0.dob_day")]`).selectOption(passengerDetails.dateOfBirth.day);
        await this.passengerDetailsContainerLocator.locator(`xpath=//select[contains(@x-model,"formData.passengers.adult_0.dob_month")]`).selectOption(passengerDetails.dateOfBirth.month);
        await this.passengerDetailsContainerLocator.locator(`xpath=//select[contains(@x-model,"formData.passengers.adult_0.dob_year")]`).selectOption(passengerDetails.dateOfBirth.year);
        await this.page.waitForTimeout(400);
        await this.passengerDetailsContainerLocator.locator(`xpath=//input[@x-model="formData.passengers.adult_0.passport"]`).fill(passengerDetails.passportNumber);
    }

}
