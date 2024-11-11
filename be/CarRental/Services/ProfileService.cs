using CarRental.Data;
using CarRental.Dto;
using CarRental.Models;
using CarRental.Util;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Services
{
    public class ProfileService
    {
        private readonly AppDbContext _appDbContext;
        private readonly JwtUtil _jwtUtil;

        public ProfileService(AppDbContext appDbContext, JwtUtil jwt)
        {
            _appDbContext = appDbContext;
            _jwtUtil = jwt;
        }

        public async Task<InfoDto> InfoUser(string token)
        {
            int id = _jwtUtil.GetIdFromToken(token);
            return await _appDbContext.InfoUsers
                .Include(x => x.User)
                .Select(x => new InfoDto
                {
                    IdUser = x.IdUser,
                    Name = x.Name,
                    CCCD = x.CCCD,
                    GPLX = x.GPLX,
                    ImgGplx = x.ImgGplx,
                    Img = x.Img,
                    Ngaysinh = x.Ngaysinh,
                    GioiTinh = x.GioiTinh,
                    CreatedDate = x.CreatedDate,
                    Phone = x.Phone,
                    Email = x.User.Email
                })
                .Where(x => x.IdUser == id)
                .FirstOrDefaultAsync();
        }

        public async Task<InfoDto> InfoUser(int id)
        {
            return await _appDbContext.InfoUsers
                .Include(x => x.User)
                .Select(x => new InfoDto
                {
                    IdUser = x.IdUser,
                    Name = x.Name,
                    CCCD = x.CCCD,
                    GPLX = x.GPLX,
                    ImgGplx = x.ImgGplx,
                    Img = x.Img,
                    Ngaysinh = x.Ngaysinh,
                    GioiTinh = x.GioiTinh,
                    CreatedDate = x.CreatedDate,
                    Phone = x.Phone,
                    Email = x.User.Email
                })
                .Where(x => x.IdUser == id)
                .FirstOrDefaultAsync();
        }

        public async Task<bool> UpdateProfile(string token, RequestProfileDto Dto)
        {
            int UserId = _jwtUtil.GetIdFromToken(token);
            var user = await _appDbContext.InfoUsers
                .FirstOrDefaultAsync(x => x.IdUser == UserId);

            if (user == null)
            {
                return false;
            }

            user.Name = Dto.Name;
            user.CCCD = Dto.IdentityCard;
            user.GPLX = Dto.DrivingLicense;
            user.Ngaysinh = Dto.Dob;
            user.GioiTinh = Dto.Gender;
            user.Phone = Dto.Phone;

            await _appDbContext.SaveChangesAsync();
            return true;
        }

        public async Task<List<BookingDto>> GetBookingHistory(string token, int status)
        {
            int UserId = _jwtUtil.GetIdFromToken(token);
            var result = await _appDbContext.DonDatXes
                .Include(x => x.SanPham)
                .ThenInclude(x => x.InfoXe)
                .ThenInclude(x => x.Hang)
                .Where(x => x.IdCus == UserId && x.State == status)
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
                    Price = x.SanPham.Gia
                })
                .OrderByDescending(x => x.BookingDate)
                .ToListAsync();
            return result;
        }

        internal async Task<bool> CancelBooking(string token, int id)
        {
            int userId = _jwtUtil.GetIdFromToken(token);
            var booking = await _appDbContext.DonDatXes
                .FirstOrDefaultAsync(x => x.ID == id && x.IdCus == userId && x.State == 0);
            if (booking == null)
            {
                return false;
            }
            booking.State = 2;
            await _appDbContext.SaveChangesAsync();
            return true;
        }

        internal async Task<bool> AcceptBooking(string token, int id)
        {
            int userId = _jwtUtil.GetIdFromToken(token);
            var booking = await _appDbContext.DonDatXes
                .FirstOrDefaultAsync(x => x.ID == id && x.IdOwner == userId && x.State == 0);
            if (booking == null)
            {
                return false;
            }
            var sanPham = _appDbContext.SanPhams.FirstOrDefault(x => x.Id == booking.IdSp);
            sanPham.State = 1;
            booking.State = 1;
            await _appDbContext.SaveChangesAsync();
            return true;
        }

        internal async Task<bool> RejectBooking(string token, int id)
        {
            int userId = _jwtUtil.GetIdFromToken(token);

            var booking = await _appDbContext.DonDatXes
                .FirstOrDefaultAsync(x => x.ID == id && x.IdOwner == userId && x.State == 0);
            if (booking == null)
            {
                return false;
            }
            booking.State = 2;
            await _appDbContext.SaveChangesAsync();

            var booking2 = await _appDbContext.DonDatXes
                .FirstOrDefaultAsync(x => x.IdSp == booking.IdSp && x.State == 0);
            

            if (booking2 == null)
            {
                var sanPham = _appDbContext.SanPhams.FirstOrDefault(x => x.Id == booking.IdSp);
                sanPham.State = 2;
            }


            await _appDbContext.SaveChangesAsync();
            return true;
        }

        internal async Task<List<MyCarDto>> GetBookingList(string token)
        {
            int userId = _jwtUtil.GetIdFromToken(token);
            var result = await _appDbContext.InfoXes
                .Include(x => x.Hang)
                .Include(x => x.Loaixe)
                .Include(x => x.SanPham)
                .Where(x => x.IdUser == userId)
                .Select(x => new MyCarDto
                {
                    Id = x.Id,
                    Name = x.Loaixe.Name,
                    Brand = x.Hang.Name,
                    Image = x.SanPham.Img,
                    Description = x.Mota,
                    State = x.SanPham.State
                })
                .ToListAsync();
            
            return result;
        }
    }
}
