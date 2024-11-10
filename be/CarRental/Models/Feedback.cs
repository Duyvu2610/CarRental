using System.Text.Json.Serialization;

namespace CarRental.Models
{
    public class Feedback
    {
        public int Id { get; set; }
        public int IdCus { get; set; }
        public int IdCar { get; set; }
        public DateTime Date { get ; set; }
        public string Noidung { get; set; }
        public int Danhgia { get; set; }

        [JsonIgnore]
        public virtual InfoUser? InfoUserCus { get; set; }

        [JsonIgnore]
        public virtual SanPham? SanPham { get; set; }
    }
}
