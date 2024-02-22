-- UserPermissions Equipments
INSERT INTO userpermissions(Id, SystemName, Name, IsDeleted, DeletedOn) VALUES (9, 'Equipments_CanList', 'Permissions.Equipment.CanList', 0, NULL);
INSERT INTO userpermissions(Id, SystemName, Name, IsDeleted, DeletedOn) VALUES (10, 'Equipments_CanModify', 'Permissions.Equipment.CanModify', 0, NULL);

-- UserPermissionToUserPermissions
INSERT INTO userpermissiontouserpermissions(UserPermissionId, LinkedUserPermissionId) VALUES (10, 9);