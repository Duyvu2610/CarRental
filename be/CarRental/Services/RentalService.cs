using CarRental.Data;

namespace CarRental.Services
{
    public class RentalService
    {
        private readonly AppDbContext _appDbContext;

        public RentalService(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

    }
}
