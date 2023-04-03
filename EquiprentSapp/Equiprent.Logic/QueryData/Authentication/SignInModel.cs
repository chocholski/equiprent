using System.ComponentModel.DataAnnotations;

namespace Equiprent.Logic.QueryData.Authentication
{
    public class SignInModel
    {
        [Required]
        public string Login { get; set; } = null!;

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; } = null!;
    }
}
