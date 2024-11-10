namespace CarRental.Dto
{
    public class BookingRequestDto
    {
        public int CarId { get; set; }

        public int OwnerId { get; set; }

        public string Location { get; set; }

        public DateTime CheckIn { get; set; }

        public DateTime CheckOut { get; set; }

        public int State { get; set; }
    }
}
