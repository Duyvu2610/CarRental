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

        public async Task<InfoUser> InfoUser(int id)
        {
            return await _appDbContext.InfoUsers
                .FirstOrDefaultAsync(x => x.IdUser == id);
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

            await _appDbContext.SaveChangesAsync();
            return true;
        }

        public async Task<List<DonDatXe>> GetBookingHistory(string token)
        {
            List<DonDatXe> result = new List<DonDatXe>();
            int UserId = _jwtUtil.GetIdFromToken(token);
            result = await _appDbContext.DonDatXes
                .Where(x => x.IdCus == UserId)
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
            _appDbContext.DonDatXes.Remove(booking);
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
            booking.State = -1;
            await _appDbContext.SaveChangesAsync();
            return true;
        }

        internal async Task<List<DonDatXe>> GetBookingList(string token, int state)
        {
            int userId = _jwtUtil.GetIdFromToken(token);
            var result = await _appDbContext.DonDatXes
                .Where(x => x.IdOwner == userId && x.State == state)
                .ToListAsync();
            return result;
        }
    }
}
