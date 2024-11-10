namespace CarRental.Models
{
    public class CTHD
    {
        public int ID { get; set; }
        public int IDHD { get; set; }
        public int IdSp { get; set; }
        public double Gia { get; set; }
        public DateTime Checkin { get; set; }
        public DateTime Checkout { get; set; }

        public virtual HoaDon HoaDoncs { get; set; }
        public virtual SanPham SanPham { get; set; }
        

    }
}
