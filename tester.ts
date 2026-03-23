import { base ,fakerEN_IN } from '@faker-js/faker';

// faker.setLocale('en_IN'); // Set locale to India
//880 6637533
// var numberString = "880" + faker.number.int({ min: 1000000, max: 9999999 });; // Generate a random 10-digit phone number
 
console.log(fakerEN_IN.phone.number({style:'human'})); // Generates a random phone number in hyphenated format (e.g., 123-456-7890)
