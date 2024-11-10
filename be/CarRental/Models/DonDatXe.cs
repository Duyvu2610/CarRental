using System.Text.Json.Serialization;

namespace CarRental.Models
{
    public class DonDatXe
    {
        public int ID { get; set; }
        public int IdSp { get; set; }
        public int IdCus { get; set; }
        public int IdOwner { get; set; }
        public string? Location { get; set; }
        public DateTime ngayDat { get; set; }
        public DateTime checkin { get; set; }
        public DateTime checkout { get; set; }
        public int State { get; set; }

        [JsonIgnore]
        public virtual SanPham? SanPham { get; set; }

        [JsonIgnore]
        public virtual InfoUser? infoUserOwner { get; set; }

        [JsonIgnore]
        public virtual InfoUser? InfoUserCus { get; set; }   


    }
}
