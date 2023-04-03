﻿namespace Equiprent.Logic.Queries.Users.Models
{
    public class ListModel
    {
        public int TotalRowsCount { get; set; }
        public List<ApplicationUserListItemViewModel> List { get; set; }

        public ListModel()
        {
            List = new List<ApplicationUserListItemViewModel>();
        }
    }

    public class ApplicationUserListItemViewModel
    {
        public int Id { get; set; }
        public string Login { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public int UserRoleId { get; set; }
        public string UserRoleName { get; set; } = null!;
        public bool IsActive { get; set; }
        //public bool IsEditableByCurrentUser { get; set; }
    }
}
