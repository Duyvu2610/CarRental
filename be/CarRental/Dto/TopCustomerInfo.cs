using CarRental.Models;

namespace CarRental.Dto
{
    public class TopCustomerInfo
    {
        public InfoUser Customer { get; set; }
        public int RentalCount { get; set; }
    }
}
