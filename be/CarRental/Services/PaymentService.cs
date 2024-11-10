using CarRental.Data;
using CarRental.Dto;
using CarRental.Models;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Services
{
    public class PaymentService
    {
        private readonly AppDbContext _appDbContext;

        public PaymentService(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<bool> Pay (PayRequestDto request)
        {
            var booking = await _appDbContext.DonDatXes
                .FirstOrDefaultAsync(x => x.ID == request.IdBooking);

            if (booking == null)
            {
                return false;
            }

            booking.State = 2;
            await _appDbContext.SaveChangesAsync();
            var payment = new HoaDon
            {
                IdCus = request.IdCustomer,
                IdOwner = request.IdOwner,
                Paymentdate = request.PaymentDate,
                Total = request.Total
            };
            _appDbContext.HoaDons.Add(payment);
            await _appDbContext.SaveChangesAsync();

            var paymentDetail = new CTHD
            {
                IDHD = payment.ID,
                IdSp = request.IdBooking,
                Gia = request.Price,
                Checkin = request.CheckIn,
                Checkout = request.CheckOut
            };
            _appDbContext.CTHDs.Add(paymentDetail);
            await _appDbContext.SaveChangesAsync();
            return true;
        }
    }
}
