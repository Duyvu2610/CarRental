using CarRental.Data;
using CarRental.Dto;
using CarRental.Models;
using CarRental.Util;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;

namespace CarRental.Services
{
    public class BookingService
    {
        private readonly AppDbContext _appDbContext;
        private readonly JwtUtil _jwtUtil;

        public BookingService(AppDbContext appDbContext, JwtUtil jwt)
        {
            _appDbContext = appDbContext;
            _jwtUtil = jwt;
        }

        public async Task CreateBookingAsync(string token, BookingRequestDto dto)
        {
            var principal = _jwtUtil.ValidateToken(token);
            if (principal == null)
            {
                throw new UnauthorizedAccessException("Invalid token.");
            }

            var userIdClaim = principal.FindFirst(JwtRegisteredClaimNames.Name);
            if (userIdClaim == null)
            {
                throw new UnauthorizedAccessException("User ID not found in token.");
            }

            // Kiểm tra nếu booking đã tồn tại
            var donDat = await _appDbContext.DonDatXes
                .FirstOrDefaultAsync(x => 
                x.IdSp == dto.CarId && 
                x.IdCus == int.Parse(userIdClaim.Value) && 
                x.IdOwner == dto.OwnerId && 
                (x.State == 0 || x.State == 1)
                );

            if (donDat != null)
            {
                throw new InvalidOperationException("Booking already exists.");
            }

            SanPham sp = await _appDbContext.SanPhams.FirstOrDefaultAsync(x => x.Id == dto.CarId);
            sp.State = 0;

            donDat = new DonDatXe
            {
                IdSp = dto.CarId,
                IdCus = int.Parse(userIdClaim.Value),
                IdOwner = dto.OwnerId,
                Location = dto.Location,
                ngayDat = DateTime.Now,
                checkin = dto.CheckIn,
                checkout = dto.CheckOut,
                State = dto.State
            };

            await _appDbContext.DonDatXes.AddAsync(donDat);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<int> GetBookingCountAsync(string token)
        {
            int IdUser = _jwtUtil.GetIdFromToken(token);
            return await _appDbContext.DonDatXes.CountAsync(x => x.IdCus == IdUser && x.State == 3);
        }
    }
}
