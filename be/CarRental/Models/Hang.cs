using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace CarRental.Models
{
    public class Hang
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập nội dung")]
        public string Name { get; set; }

        [JsonIgnore]
        public virtual ICollection<InfoXe>? InfoXe { get; set; }

        [JsonIgnore]
        public virtual ICollection<Loaixe>? Loaixe { get; set;}
    }
}
