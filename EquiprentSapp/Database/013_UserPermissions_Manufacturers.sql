-- UserPermissions Manufacturers
INSERT INTO userpermissions(Id, SystemName, Name, IsDeleted, DeletedOn) VALUES (11, 'Manufacturers_CanList', 'Permissions.Manufacturer.CanList', 0, NULL);
INSERT INTO userpermissions(Id, SystemName, Name, IsDeleted, DeletedOn) VALUES (12, 'Manufacturers_CanModify', 'Permissions.Manufacturer.CanModify', 0, NULL);

-- UserPermissionToUserPermissions
INSERT INTO userpermissiontouserpermissions(UserPermissionId, LinkedUserPermissionId) VALUES (12, 11);