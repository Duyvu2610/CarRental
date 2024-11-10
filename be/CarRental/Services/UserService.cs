using CarRental.Data;
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
            if (user == null)
            {
                return false;
            }
            _appDbContext.Users.Remove(user);
            await _appDbContext.SaveChangesAsync();
            return true;
        }
    }
}
