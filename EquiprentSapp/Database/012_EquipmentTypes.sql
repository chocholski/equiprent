-- EquipmentTypes
INSERT INTO equipmenttypes(Id, IsDeleted, DeletedOn) VALUES (1, 0, NULL);
INSERT INTO equipmenttypes(Id, IsDeleted, DeletedOn) VALUES (2, 0, NULL);
INSERT INTO equipmenttypes(Id, IsDeleted, DeletedOn) VALUES (3, 0, NULL);
INSERT INTO equipmenttypes(Id, IsDeleted, DeletedOn) VALUES (4, 0, NULL);
INSERT INTO equipmenttypes(Id, IsDeleted, DeletedOn) VALUES (5, 0, NULL);
INSERT INTO equipmenttypes(Id, IsDeleted, DeletedOn) VALUES (6, 0, NULL);
INSERT INTO equipmenttypes(Id, IsDeleted, DeletedOn) VALUES (7, 0, NULL);
INSERT INTO equipmenttypes(Id, IsDeleted, DeletedOn) VALUES (8, 0, NULL);
INSERT INTO equipmenttypes(Id, IsDeleted, DeletedOn) VALUES (9, 0, NULL);

-- EquipmentTypeToLanguages
INSERT INTO equipmenttypetolanguages(Id, Name, EquipmentTypeId, LanguageId) VALUES (1, 'Cardiovascular', 1, 1);
INSERT INTO equipmenttypetolanguages(Id, Name, EquipmentTypeId, LanguageId) VALUES (2, 'Do treningu kardio', 1, 2);
INSERT INTO equipmenttypetolanguages(Id, Name, EquipmentTypeId, LanguageId) VALUES (3, 'Strength training', 2, 1);
INSERT INTO equipmenttypetolanguages(Id, Name, EquipmentTypeId, LanguageId) VALUES (4, 'Do treningu siłowego', 2, 2);
INSERT INTO equipmenttypetolanguages(Id, Name, EquipmentTypeId, LanguageId) VALUES (5, 'Machines', 3, 1);
INSERT INTO equipmenttypetolanguages(Id, Name, EquipmentTypeId, LanguageId) VALUES (6, 'Maszyny', 3, 2);
INSERT INTO equipmenttypetolanguages(Id, Name, EquipmentTypeId, LanguageId) VALUES (7, 'Functional gym training', 4, 1);
INSERT INTO equipmenttypetolanguages(Id, Name, EquipmentTypeId, LanguageId) VALUES (8, 'Do treningu funkcjonalny', 4, 2);
INSERT INTO equipmenttypetolanguages(Id, Name, EquipmentTypeId, LanguageId) VALUES (9, 'Bodyweight training', 5, 1);
INSERT INTO equipmenttypetolanguages(Id, Name, EquipmentTypeId, LanguageId) VALUES (10, 'Do treningu z użyciem masy ciała', 5, 2);
INSERT INTO equipmenttypetolanguages(Id, Name, EquipmentTypeId, LanguageId) VALUES (11, 'Accessories', 6, 1);
INSERT INTO equipmenttypetolanguages(Id, Name, EquipmentTypeId, LanguageId) VALUES (12, 'Akcesoria', 6, 2);
INSERT INTO equipmenttypetolanguages(Id, Name, EquipmentTypeId, LanguageId) VALUES (13, 'Functional', 7, 1);
INSERT INTO equipmenttypetolanguages(Id, Name, EquipmentTypeId, LanguageId) VALUES (14, 'Do treningu funkcjonalnego gimnastycznego', 7, 2);
INSERT INTO equipmenttypetolanguages(Id, Name, EquipmentTypeId, LanguageId) VALUES (15, 'Recovery and therapy', 8, 1);
INSERT INTO equipmenttypetolanguages(Id, Name, EquipmentTypeId, LanguageId) VALUES (16, 'Do rehabilitacji i terapii', 8, 2);
INSERT INTO equipmenttypetolanguages(Id, Name, EquipmentTypeId, LanguageId) VALUES (17, 'Miscellaneous', 9, 1);
INSERT INTO equipmenttypetolanguages(Id, Name, EquipmentTypeId, LanguageId) VALUES (18, 'Inne', 9, 2);