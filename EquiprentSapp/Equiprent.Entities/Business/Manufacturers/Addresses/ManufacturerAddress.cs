﻿using Equiprent.Entities.Application.Addresses;
using System.Diagnostics.CodeAnalysis;

namespace Equiprent.Entities.Business.Manufacturers.Addresses
{
    [Table("ManufacturerAddresses")]
    public class ManufacturerAddress : Address
    {
        public ManufacturerAddress() { }

        [SetsRequiredMembers]
        public ManufacturerAddress(Address address, string nationalId)
        {
            ApartmentNumber = address.ApartmentNumber;
            City = address.City;
            CountryId = address.CountryId;
            Email = address.Email;
            NationalCompanyId = nationalId;
            PhoneNumber = address.PhoneNumber;
            PostalCode = address.PostalCode;
            StreetName = address.StreetName;
            StreetNumber = address.StreetNumber;
        }

        public required string NationalCompanyId { get; set; } = null!;
    }
}
