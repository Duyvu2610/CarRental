using CarRental.Data;
using CarRental.Dto;
using CarRental.Models;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Services
{
    public class UserService
    {
        private readonly AppDbContext _appDbContext;

        public UserService(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<bool> DeleteUser(int id)
        {
            var user = await _appDbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            var profile = await _appDbContext.InfoUsers.FirstOrDefaultAsync(x => x.IdUser == id);
            if (user == null)
            {
                return false;
            }
            _appDbContext.Users.Remove(user);
            _appDbContext.InfoUsers.Remove(profile);
            await _appDbContext.SaveChangesAsync();
            return true;
        }

        internal async Task<List<BookingDto>> GetRentingCars(int state, int carId)
        {
            var bookingDto = await _appDbContext.DonDatXes
                .Include(x => x.SanPham)
                .ThenInclude(x => x.InfoXe)
                .ThenInclude(x => x.Hang)
                .Include(x => x.InfoUserCus)
                .Where(x => x.State == state && x.IdSp == carId)
                .Select(x => new BookingDto
                {
                    ID = x.ID,
                    IdCar = x.IdSp,
                    IdCustomer = x.IdCus,
                    IdOwner = x.IdOwner,
                    Location = x.Location,
                    BookingDate = x.ngayDat,
                    Checkin = x.checkin,
                    Checkout = x.checkout,
                    State = x.State,
                    ImageCar = x.SanPham.Img,
                    NameCar = x.SanPham.InfoXe.Hang.Name,
                    CustomerName = x.InfoUserCus.Name
                })
                .OrderByDescending(x => x.BookingDate)
                .ToListAsync();

            return bookingDto;
        }
    }
}
