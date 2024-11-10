using CarRental.Models;

namespace CarRental.Dto
{
    public class TopOwnerInfo
    {
        public InfoUser Owner { get; set; }
        public int RentalCount { get; set; }
    }
}
