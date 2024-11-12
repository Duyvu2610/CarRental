using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CarRental.Models
{
    public class XeTinhNang
    {
        public int Idxe { get; set; }

        public int Idtinhnang { get; set; }

        [JsonIgnore]
        public virtual InfoXe InfoXe { get; set; }

        [JsonIgnore]
        public virtual TinhNang TinhNang { get; set; }
    }
}
