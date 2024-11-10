using System.ComponentModel.DataAnnotations;

namespace CarRental.Models
{
    public class XeTinhNang
    {
        public int Idxe { get; set; }

        public int Idtinhnang { get; set; }

        public virtual InfoXe InfoXe { get; set; }

        public virtual TinhNang TinhNang { get; set; }
    }
}
