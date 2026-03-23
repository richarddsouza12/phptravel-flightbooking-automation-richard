
type GuestDetailsType = {

    title: string,
    firstName: string,
    lastName: string,
    email: string,
    nationalityCode: string,
    phoneNumber: string

} 


type PassengerDetailsType = {

       title : string,
       firstName : string,
       lastName : string,
       email : string,
       nationalityCode : string,
       dateOfBirth : { day : string, month : string, year : string},
       passportNumber : string

} 

/*
"title" : "Mr",
       "firstName" : "Richard",
       "lastName" : "Dsouza",
       "email" : "richardtest@gmail.com",
       "nationalityCode" : "IN",
       "dateOfBirth" : { "day" : "01","month" : "02", "year" : "1989"},
       "passportNumber" : "BTBPD8053P"


*/


export { GuestDetailsType, PassengerDetailsType };