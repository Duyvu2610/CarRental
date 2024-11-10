using System.Text.Json.Serialization;

namespace CarRental.Models
{
    public class InfoXe
    {
        public int Id { get;set; }

        public int IdHang { get;set; }

        public int IdLoaiXe { get;set; }

        public int IdUser { get;set; }
        
        public string Bienso { get; set; }

        public int Soghe { get; set; }

        public int Truyendong { get; set; }

        public string LoaiNl { get; set; }

        public string? Mota { get; set; }

        [JsonIgnore]
        public virtual SanPham SanPham { get; set; }

        [JsonIgnore]
        public virtual Hang? Hang { get; set; }

        [JsonIgnore]
        public virtual Loaixe Loaixe { get; set; }

        [JsonIgnore]
        public virtual User? User { get; set; }

        [JsonIgnore]
        public virtual ICollection<XeTinhNang>? ListTinhNang { get; set; }

    }
}
