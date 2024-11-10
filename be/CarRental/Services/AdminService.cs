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
                        Owner = owner,
                        RentalCount = topOwner.RentalCount
                    })
                .OrderByDescending(x => x.RentalCount)
                .ToList();

            return result;
        }

        public async Task<Dictionary<string, List<TopCustomerInfo>>> GetTopCustomersByRentalCount()
        {
            var rentalCounts = await _appDbContext.DonDatXes
                .GroupBy(x => x.IdCus)
                .Select(g => new
                {
                    IdCus = g.Key,
                    RentalCount = g.Count()
                })
                .ToListAsync();

            var customerIds = rentalCounts.Select(x => x.IdCus).ToList();

            var customers = await _appDbContext.InfoUsers
                .Where(user => customerIds.Contains(user.IdUser))
                .ToListAsync();

            var result = new Dictionary<string, List<TopCustomerInfo>>
            {
                { ">5 Rentals", new List<TopCustomerInfo>() },
                { ">10 Rentals", new List<TopCustomerInfo>() },
                { ">20 Rentals", new List<TopCustomerInfo>() },
                { "another", new List<TopCustomerInfo>() }
            };

            foreach (var rental in rentalCounts)
            {
                var customer = customers.FirstOrDefault(c => c.IdUser == rental.IdCus);
                if (customer != null)
                {
                    var customerInfo = new TopCustomerInfo
                    {
                        Customer = customer,
                        RentalCount = rental.RentalCount
                    };

                    if (rental.RentalCount > 5)
                    {
                        result[">5 Rentals"].Add(customerInfo);
                    }
                    if (rental.RentalCount > 10)
                    {
                        result[">10 Rentals"].Add(customerInfo);
                    }
                    if (rental.RentalCount > 20)
                    {
                        result[">20 Rentals"].Add(customerInfo);
                    }
                    else
                    {
                        result["another"].Add(customerInfo);
                    }
                }
            }

            foreach (var key in result.Keys)
            {
                result[key] = result[key].OrderByDescending(x => x.RentalCount).ToList();
            }

            return result;
        }

        public async Task<Dictionary<string, List<InfoUser>>> GetRentalStatisticsLists()
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
            var result = new Dictionary<string, List<InfoUser>>
            {
                { "Renters", renters },
                { "Owners", owners }
            };

            return result;
        }
    }
}
