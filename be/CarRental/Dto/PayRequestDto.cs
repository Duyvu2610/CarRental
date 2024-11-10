namespace CarRental.Dto
{
    public class PayRequestDto
    {
        public int IdCustomer { get; set; }

        public int IdOwner { get; set; }

        public DateTime PaymentDate { get; set; }

        public double Total { get; set; }

        public int IdBooking { get; set; }

        public double Price { get; set; }

        public DateTime CheckIn { get; set; }

        public DateTime CheckOut { get; set; }
    }
}
