-- UserRoles
INSERT INTO userroles(Id, CreatedOn, CreatedById, IsDeleted, DeletedOn) VALUES (1, '2023-03-01 00:00:00', NULL, 0, NULL);

-- UserRolesTolanguages
INSERT INTO userrolestolanguages VALUES (1, 1, 'Administrator', 1);
INSERT INTO userrolestolanguages VALUES (2, 2, 'Administrator', 1);