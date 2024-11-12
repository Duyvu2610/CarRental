using CarRental.Data;
using CarRental.Models;
using CarRental.Util;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Services
{
    public class AuthService
    {
        private readonly AppDbContext _context;
        private readonly JwtUtil _jwtUtil;

        public AuthService(AppDbContext context, JwtUtil jwtUtil)
        {
            _context = context;
            _jwtUtil = jwtUtil;
        }

        public async Task<bool> RegisterAsync(string email, string password)
        {
            using (var transaction = _context.Database.BeginTransactionAsync())
            {
                try
                {
                    if (await _context.Users.AnyAsync(u => u.Email == email))
                    {
                        throw new Exception("Username already exists.");
                    }

                    var user = new User
                    {
                        Email = email,
                        UserName = email,
                        IdRole = 1,
                        Password = BCrypt.Net.BCrypt.HashPassword(password)
                    };

                    await _context.Users.AddAsync(user);
                    await _context.SaveChangesAsync();

                    InfoUser infoUser = new InfoUser
                    {
                        IdUser = user.Id,
                        CreatedDate = System.DateTime.Now,
                        Ngaysinh = System.DateTime.Now,
                    };

                    await _context.InfoUsers.AddAsync(infoUser);
                    await _context.SaveChangesAsync();

                    await transaction.Result.CommitAsync();
                    return true;
                }
                catch
                {
                    await transaction.Result.RollbackAsync();
                    throw;

                }
            }
        }

        public async Task<string> LoginAsync(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                throw new Exception("Invalid username or password.");
            }

            return _jwtUtil.GenerateToken(user.Id);
        }

        public async Task ChangePasswordAsync(string token, string oldPass, string newPass)
        {
            var id = _jwtUtil.GetIdFromToken(token);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user == null || !BCrypt.Net.BCrypt.Verify(oldPass, user.Password))
            {
                throw new Exception("Invalid username or password.");
            }

            user.Password = BCrypt.Net.BCrypt.HashPassword(newPass);
            await _context.SaveChangesAsync();
        }
    }
}
