-- ClientTypes
INSERT INTO clienttypes(Id, IsDeleted, DeletedOn) VALUES (1, 0, NULL);
INSERT INTO clienttypes(Id, IsDeleted, DeletedOn) VALUES (2, 0, NULL);

-- ClientTypeTolanguages
INSERT INTO clienttypetolanguages(Id, Name, ClientTypeId, LanguageId) VALUES (1, 'Private', 1, 1);
INSERT INTO clienttypetolanguages(Id, Name, ClientTypeId, LanguageId) VALUES (2, 'Prywatny', 1, 2);
INSERT INTO clienttypetolanguages(Id, Name, ClientTypeId, LanguageId) VALUES (3, 'Company', 2, 1);
INSERT INTO clienttypetolanguages(Id, Name, ClientTypeId, LanguageId) VALUES (4, 'Firma', 2, 2);