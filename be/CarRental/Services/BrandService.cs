using CarRental.Data;
using CarRental.Dto;
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

        public async Task<List<Loaixe>> SearchCarType(int id)
        {
            return await _appDbContext.Loaixes.Where(x => x.HangId == id).ToListAsync();
        }

        public async Task<bool> CreateBrand(FeatureDto brand)
        {
            var branda = await _appDbContext.Hangs.FirstOrDefaultAsync(b => b.Name == brand.Name);
            if (branda != null)
            {
                return false;
            }

            var brandb = new Hang
            {
                Name = brand.Name
            };

            _appDbContext.Hangs.Add(brandb);
            await _appDbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> CreateCarType(FeatureDto brand)
        {
            var branda = await _appDbContext.Hangs.FirstOrDefaultAsync(b => b.Id == brand.BrandId);
            if (branda == null)
            {
                return false;
            }

            var carType = await _appDbContext.Loaixes.FirstOrDefaultAsync(b => b.Name == brand.Name);

            if (carType != null)
            {
                return false;
            }

            var carTypeb = new Loaixe
            {
                Name = brand.CarType,
                HangId = brand.BrandId
            };

            _appDbContext.Loaixes.Add(carTypeb);
            await _appDbContext.SaveChangesAsync();

            return true;
        }
    }
}
