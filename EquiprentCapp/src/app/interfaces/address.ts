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

export interface ClientAddress extends Address {
  NationalId: string
}

export interface Country {
  Id: string,
  Code?: string
}

export interface ManufacturerAddress extends Address {
  NationalId: string;
}