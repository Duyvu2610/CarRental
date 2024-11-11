using CarRental.Models;
using System.Text.Json.Serialization;

namespace CarRental.Dto
{
    public class BookingDto
    {
        public int ID { get; set; }
        public int IdCar { get; set; }
        public int IdCustomer { get; set; }
        public int IdOwner { get; set; }
        public string? Location { get; set; }
        public DateTime BookingDate { get; set; }
        public DateTime Checkin { get; set; }
        public DateTime Checkout { get; set; }
        public int State { get; set; }

        public string? ImageCar { get; set; }

        public string? NameCar { get; set; }
        public string CustomerName { get; set; }

    }
}
