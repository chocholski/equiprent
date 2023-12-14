-- UserPermissions ClientRepresentatives
INSERT INTO userpermissions(Id, SystemName, Name, IsDeleted, DeletedOn) VALUES (7, 'ClientRepresentatives_CanList', 'Permissions.ClientRepresentative.CanList', 0, NULL);
INSERT INTO userpermissions(Id, SystemName, Name, IsDeleted, DeletedOn) VALUES (8, 'ClientRepresentatives_CanModify', 'Permissions.ClientRepresentative.CanModify', 0, NULL);

-- UserPermissionToUserPermissions
INSERT INTO userpermissiontouserpermissions(UserPermissionId, LinkedUserPermissionId) VALUES (8, 7);