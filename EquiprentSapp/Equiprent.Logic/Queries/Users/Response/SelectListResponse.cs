﻿namespace Equiprent.Logic.Queries.Users.Models
{
    public class SelectListResponse
    {
        public int TotalRowsCount { get; set; }
        public List<ApplicationUserSelectListItemViewModel> List { get; set; }

        public SelectListResponse()
        {
            List = new List<ApplicationUserSelectListItemViewModel>();
        }
    }

    public class ApplicationUserSelectListItemViewModel
    {
        public Guid Id { get; set; }
        public string Login { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public int UserRoleId { get; set; }
        public string UserRoleName { get; set; } = null!;
    }
}