import { test, expect } from '@playwright/test';
import FlightMainSearchPage from '../page-objects/FlightMainSearchPage';
import FlightSearchListingPage from '../page-objects/FlightSearchListingPage';
import FlightAllDetailsPage from '../page-objects/FlightAllDetailsPage';
import FlightRecieptPage from '../page-objects/FlightRecieptPage';
import { GuestDetailsType, PassengerDetailsType } from '../data-models/CustomeDataTypes';
import { DataCreationHelper } from '../helpers/DataCreationHelper';
import { Utils } from '../helpers/Utils';

test.describe("End to End Flight Booking Test", () => {

    test.beforeEach(async ({ page }) => {

        console.log("Running test with env : ", process.env.ENV);

    });

    test("E2E : Goa to Pune : Single Passenger : First Listed Flight : Pay Later", async ({ page }, testInfo) => {

        return;
        //Test Data Creation
        var guestDetails: GuestDetailsType         = DataCreationHelper.createGuestDetails(true, {gender: "male"});
        var passengerDetails: PassengerDetailsType = DataCreationHelper.createPassengerDetails(true, { gender: "male" });
        console.log("Guest Details : ", guestDetails);
        console.log("Passenger Details : ", passengerDetails);
        //End - Test Data Creation

        await page.goto("/flights");
        await page.waitForLoadState("networkidle");
   
        //Search Flight Search Page 
        const flightMainSearchPage = new FlightMainSearchPage(page);
        await flightMainSearchPage.populateFlightSearchDetailsAndSearch("Goa", "Pune", 2);
        await Utils.captureScreenshotAttachToReport(page, testInfo, "flight-search-page");
    

        //Search Flight Results Page 
        await page.waitForLoadState("networkidle");
        const flightSearchListingPage = new FlightSearchListingPage(page);
        await flightSearchListingPage.selectFirstFlightAndProceedToBook();
        await Utils.captureScreenshotAttachToReport(page, testInfo, "flight-search-listing-page");

        //Booking Details Page
        await page.waitForLoadState("networkidle");
        const flightAllDetailsPage = new FlightAllDetailsPage(page);
        await flightAllDetailsPage.fillGuestDetailsSection(guestDetails);
        await flightAllDetailsPage.fillPassengerDetailsSection(passengerDetails);
        await flightAllDetailsPage.selectPaymentOptionByName("Pay Later");
        await flightAllDetailsPage.processBookingConfirmation();
        await Utils.captureScreenshotAttachToReport(page, testInfo, "flight-all-details-page");

        //Reciept page
        await page.waitForLoadState("networkidle");
        const flightRecieptPage = new FlightRecieptPage(page);
        await flightRecieptPage.processRecieptPage();
        await Utils.captureScreenshotAttachToReport(page, testInfo, "flight-reciept-page");

    })

});


