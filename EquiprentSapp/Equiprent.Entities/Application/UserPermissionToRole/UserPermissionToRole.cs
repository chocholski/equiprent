﻿namespace Equiprent.Entities.Application
{
    public class UserPermissionToRole
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("UserPermission")]
        public int UserPermissionId { get; set; }
        public virtual UserPermission UserPermission { get; set; } = null!;

        [ForeignKey("UserRole")]
        public int UserRoleId { get; set; }
        public virtual UserRole UserRole { get; set; } = null!;
    }
}