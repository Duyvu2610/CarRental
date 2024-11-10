using CarRental.Data;
using CarRental.Models;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Services
{
    public class BrandService
    {
        private readonly AppDbContext _appDbContext;

        public BrandService(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<List<Hang>> SearchBrand()
        {
            return await _appDbContext.Hangs.ToListAsync();
        }
    }
}
