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

export interface ClientAddress extends Address {
  NationalId: string
}