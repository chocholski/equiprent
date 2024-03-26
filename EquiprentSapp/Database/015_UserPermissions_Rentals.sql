-- UserPermissions Equipments
INSERT INTO userpermissions(Id, SystemName, Name, IsDeleted, DeletedOn) VALUES (13, 'Rentals_CanList', 'Permissions.Rental.CanList', 0, NULL);
INSERT INTO userpermissions(Id, SystemName, Name, IsDeleted, DeletedOn) VALUES (14, 'Rentals_CanModify', 'Permissions.Rental.CanModify', 0, NULL);

-- UserPermissionToUserPermissions
INSERT INTO userpermissiontouserpermissions(UserPermissionId, LinkedUserPermissionId) VALUES (14, 13);