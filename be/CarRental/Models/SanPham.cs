using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CarRental.Models
{
    public class SanPham
    {

       public int Id { get; set; }
       //public string NameXe { get; set; }
        public int IdInfo { get; set; }
        public int IdChuXe { get; set; }
        public string? Loinhan { get; set; }
        public string Diachixe { get; set; }

        public int LimitXechay { get; set; }
        public double GiaVuot { get; set; }

        public int Truyendong { get; set; }

        [Required(ErrorMessage = "Please choose Front Images")]
        [Display(Name = "ImgUser")]
        [NotMapped]
        public IFormFile FrontImage { get; set; }
        public string Img { get; set; }
       
        public int GioiHankmgiaoxe { get; set; }
        public double Gia { get; set; }

        // 0: Dang cho xac nhan, 1: Dang duoc thue, 2: Con trong
        public int State { get; set; }

        [JsonIgnore]
        public virtual InfoXe InfoXe { get; set; }

        [JsonIgnore]
        public virtual InfoUser InfoUser { get; set; }

        [JsonIgnore]
        public virtual ICollection<DonDatXe> DonDatXes { get; set; }

        [JsonIgnore]
        public virtual ICollection<CTHD> CTHDs { get; set; }

        [JsonIgnore]
        public virtual ICollection<Feedback> Feedbacks { get; set; }

    }
}
