-- UserRoles
INSERT INTO userroles(Id, CreatedOn, CreatedById, IsDeleted, DeletedOn) VALUES (1, '2023-04-07 00:00:00', NULL, 0, NULL);

-- UserRolesTolanguages
INSERT INTO userrolestolanguages(Id, Name, UserRoleId, LanguageId) VALUES (1, 'Administrator', 1, 1);
INSERT INTO userrolestolanguages(Id, Name, UserRoleId, LanguageId) VALUES (2, 'Administrator', 1, 2);