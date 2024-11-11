namespace CarRental.Models
{
    public class HoaDon
    {
        public int ID { get; set; }
        public int IdCus { get; set; }
        public int IdOwner { get; set; }

        public int IdBooking { get; set; }

        public DateTime Paymentdate { get; set; }
        public double Total { get; set; }

        public virtual InfoUser infoUser { get; set; }

        public virtual DonDatXe DonDatXe { get; set; }

        public virtual ICollection<CTHD> cTHDs { get; set; }
    }
}
