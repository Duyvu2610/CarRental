using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CarRental.Models
{
    public class InfoUser
    {
        public int IdUser { get; set; }
        public string? Name { get; set; }
        public string? CCCD { get; set; }
        public string? GPLX { get; set; }

        [Display(Name = "ImgGplx")]
        [NotMapped]
        [JsonIgnore]
        public IFormFile? FrontImage2 { get; set; }

        public string? ImgGplx { get; set; }

        [Display(Name = "ImgUser")]
        [NotMapped]
        [JsonIgnore]
        public IFormFile? FrontImage { get; set; }
        public string? Img { get; set; }

        public DateTime? Ngaysinh { get; set; }
        public int? GioiTinh { get; set; }

        public DateTime CreatedDate { get; set; }

        public string? Phone { get; set; }

        [JsonIgnore]
        public virtual ICollection<HoaDon>? HoaDoncs { get; set;}

        [JsonIgnore]
        public virtual ICollection<SanPham>? sanPhams { get; set; }

        [JsonIgnore]
        public virtual ICollection<Feedback>? FeedbacksCus { get; set; }

        [JsonIgnore]
        public virtual ICollection<Feedback>? FeedbacksOwner { get; set; }

        [JsonIgnore]
        public virtual ICollection<DonDatXe>? DonDatXesCus { get; set; }
        
        [JsonIgnore]
        public virtual ICollection<DonDatXe>? DonDatXesOwner { get; set; }

        [JsonIgnore]
        public virtual User? User { get; set; }
    }
}
