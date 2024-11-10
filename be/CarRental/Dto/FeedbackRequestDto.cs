namespace CarRental.Dto
{
    public class FeedbackRequestDto
    {
        public int IdCustomer { get; set; }

        public int IdCar { get; set; }

        public string Content { get; set; }

        public int Rating { get; set; }
    }
}
