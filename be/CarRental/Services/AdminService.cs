using CarRental.Data;
using CarRental.Dto;
using CarRental.Models;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Services
{
    public class AdminService
    {
        private readonly AppDbContext _appDbContext;

        public AdminService(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<List<TopOwnerInfo>> GetTopOwner()
        {
            var topOwners = await _appDbContext.DonDatXes
                .GroupBy(x => x.IdOwner)
                .Select(g => new
                {
                    IdOwner = g.Key,
                    RentalCount = g.Count()
                })
                .OrderByDescending(x => x.RentalCount)
                .ToListAsync();

            var ownerIds = topOwners.Select(x => x.IdOwner).ToList();

            var owners = await _appDbContext.InfoUsers
                .Where(user => ownerIds.Contains(user.IdUser))
                .ToListAsync();

            var result = topOwners
                .Join(
                    owners,
                    topOwner => topOwner.IdOwner,
                    owner => owner.IdUser,
                    (topOwner, owner) => new TopOwnerInfo
                    {
                        Name = owner.Name,
                        Rentals = topOwner.RentalCount
                    })
                .OrderByDescending(x => x.Rentals)
                .ToList();

            return result;
        }

        public async Task<List<TopOwnerInfo>> GetTopCustomersByRentalCount()
        {
            var topCustomers = await _appDbContext.DonDatXes
                .GroupBy(x => x.IdCus)
                .Select(g => new
                {
                    IdCus = g.Key,
                    RentalCount = g.Count()
                })
                .OrderByDescending(x => x.RentalCount)
                .ToListAsync();

            var customerIds = topCustomers.Select(x => x.IdCus).ToList();

            var customers = await _appDbContext.InfoUsers
                .Where(user => customerIds.Contains(user.IdUser))
                .ToListAsync();

            var result = topCustomers
                .Join(
                    customers,
                    topCustomer => topCustomer.IdCus,
                    customer => customer.IdUser,
                    (topCustomer, customer) => new TopOwnerInfo
                    {
                        Name = customer.Name,
                        Rentals = topCustomer.RentalCount
                    })
                .OrderByDescending(x => x.Rentals)
                .ToList();

            return result;
        }

        public async Task<Object> GetRentalStatisticsLists()
        {
            // Get unique customer IDs who have rented cars
            var renterIds = await _appDbContext.DonDatXes
                .Select(x => x.IdCus)
                .Distinct()
                .ToListAsync();

            // Get unique owner IDs who have registered cars for rent
            var ownerIds = await _appDbContext.DonDatXes
                .Select(x => x.IdOwner)
                .Distinct()
                .ToListAsync();

            // Retrieve InfoUser details for renters
            var renters = await _appDbContext.InfoUsers
                .Where(user => renterIds.Contains(user.IdUser))
                .ToListAsync();

            // Retrieve InfoUser details for owners
            var owners = await _appDbContext.InfoUsers
                .Where(user => ownerIds.Contains(user.IdUser))
                .ToListAsync();

            // Return the lists in a dictionary
            var result = new Dictionary<string, int>
            {
                { "rentersCount", renters.Count },
                { "ownersCount", owners.Count }
            };

            return result;
        }
    }
}
