using CarRental.Data;
using CarRental.Dto;
using CarRental.Models;
using CarRental.Util;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Services
{
    public class FeedbackService
    {
        private readonly AppDbContext _context;
        private readonly JwtUtil _jwtUtil;

        public FeedbackService(AppDbContext context, JwtUtil jwt)
        {
            _context = context;
            _jwtUtil = jwt;
        }

        public async Task<bool> AddFeedbackAsync(string token, FeedbackRequestDto dto)
        {
            int UserId = _jwtUtil.GetIdFromToken(token);

            var feedback = new Feedback
            {
                IdCus = UserId,
                IdCar = dto.IdCar,
                Date = DateTime.Now,
                Noidung = dto.Content,
                Danhgia = dto.Rating
            };

            await _context.Feedbacks.AddAsync(feedback);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Feedback>> GetFeedbacksAsync(int id)
        {
            return await _context.Feedbacks
                .Where(x => x.IdCar == id)
                .ToListAsync();
        }
    }
}
