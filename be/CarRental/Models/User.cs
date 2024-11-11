using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Text.Json.Serialization;

namespace CarRental.Models
{

    public class User
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "User Name is Required")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "User Password is Required")]
        public string Password { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is Required")]

        public string Email { get; set; }

        public int IdRole { get; set; }

        [JsonIgnore]
        public virtual Role? role { get; set; }

        [JsonIgnore]
        public virtual ICollection<InfoXe>? InfoXe { get; set; }

        public virtual InfoUser? InfoUser { get; set; }
    }
}
