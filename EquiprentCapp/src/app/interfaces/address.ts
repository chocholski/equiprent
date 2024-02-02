export interface Address {
  ApartmentNumber?: string,
  City: string,
  Country: Country,
  Email?: string,
  Id: number,
  PhoneNumber?: string,
  PostalCode: string,
  StreetName: string,
  StreetNumber: string
}

export const addressFormFields = {
  ApartmentNumber: 'ApartmentNumber',
  City: 'City',
  Country: 'CountryId',
  Email: 'Email',
  PhoneNumber: 'PhoneNumber',
  PostalCode: 'PostalCode',
  StreetName: 'StreetName',
  StreetNumber: 'StreetNumber'
}

export interface ClientAddress extends Address {
  NationalId: string
}

export interface Country {
  Id: string,
  Code: string
}