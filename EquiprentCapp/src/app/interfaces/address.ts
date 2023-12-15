export interface Address {
  ApartmentNumber?: string,
  City: string,
  CountryId: string,
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