-- RentalCategories
INSERT INTO rentalcategories(Id, IsDeleted, DeletedOn) VALUES (1, 0, NULL);
INSERT INTO rentalcategories(Id, IsDeleted, DeletedOn) VALUES (2, 0, NULL);
INSERT INTO rentalcategories(Id, IsDeleted, DeletedOn) VALUES (3, 0, NULL);

-- RentalCategoryTolanguages
INSERT INTO rentalcategorytolanguages(Id, Name, RentalCategoryId, LanguageId) VALUES (1, 'Lease', 1, 1);
INSERT INTO rentalcategorytolanguages(Id, Name, RentalCategoryId, LanguageId) VALUES (2, 'Najem', 1, 2);
INSERT INTO rentalcategorytolanguages(Id, Name, RentalCategoryId, LanguageId) VALUES (3, 'Sublease', 2, 1);
INSERT INTO rentalcategorytolanguages(Id, Name, RentalCategoryId, LanguageId) VALUES (4, 'Podnajem', 2, 2);
INSERT INTO rentalcategorytolanguages(Id, Name, RentalCategoryId, LanguageId) VALUES (5, 'Rent-to-own', 3, 1);
INSERT INTO rentalcategorytolanguages(Id, Name, RentalCategoryId, LanguageId) VALUES (6, 'Najem z możliwością wykupienia', 3, 2);