import { GuestDetailsType, PassengerDetailsType } from "../data-models/CustomeDataTypes";
import { faker, fakerEN_IN } from '@faker-js/faker';
export class DataCreationHelper {

    static createGuestDetails(useFromTestDataJson: boolean, detailsPrefrences: { gender: "male" | "female" }): GuestDetailsType {

        if (useFromTestDataJson) {
            var guestDetails: GuestDetailsType = require('../test-data/guest-details.json');
            return guestDetails;
        }
        else {

            var guestDetails: GuestDetailsType =
            {
                title: (detailsPrefrences.gender == "male" ? "Mr" : "Mrs"),
                firstName: fakerEN_IN.person.firstName(detailsPrefrences.gender),
                lastName: fakerEN_IN.person.lastName(),
                email: fakerEN_IN.internet.email(),
                phoneNumber: "880" + faker.number.int({ min: 1000000, max: 9999999 }).toString(),
                nationalityCode: "IN"
            }
            return guestDetails;
        }

    }

    static createPassengerDetails(useFromTestDataJson: boolean, detailsPrefrences: { gender: "male" | "female" }): PassengerDetailsType {


        if (useFromTestDataJson) {
            var passengerDetails: PassengerDetailsType = require('../test-data/passenger-details.json');
            return passengerDetails;
        }

        var passengerDetails: PassengerDetailsType = 
        {
            title: (detailsPrefrences.gender == "male" ? "Mr" : "Mrs"),
            firstName: fakerEN_IN.person.firstName(detailsPrefrences.gender),
            lastName: fakerEN_IN.person.lastName(),
            email: fakerEN_IN.internet.email(),
            nationalityCode: "IN",
            dateOfBirth: { day: "01", month: "02", year: "1989" },
            passportNumber: faker.string.alpha({ length: 1, casing: 'upper' }) + faker.string.numeric(7)
        }

        return passengerDetails;
    }




}

export default DataCreationHelper;