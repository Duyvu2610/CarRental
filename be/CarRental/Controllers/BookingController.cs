using CarRental.Dto;
using CarRental.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Controllers
{
    [ApiController]
    [Route("api/booking")]
    public class BookingController : ControllerBase
    {
        private readonly BookingService _bookingService;

        public BookingController(BookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] BookingRequestDto dto)
        {
            try
            {
                var authHeader = Request.Headers["Authorization"].ToString();
                if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
                {
                    return Unauthorized(new { Message = "Token is missing or invalid." });
                }
                await _bookingService.CreateBookingAsync(authHeader.Replace("Bearer ", ""), dto);
                return Created();
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { Message = ex.Message });
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, new { Message = "Database update error occurred." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred.", Details = ex.Message });
            }
        }

        [HttpGet("count")]
        public async Task<IActionResult> GetBookingCount()
        {
            try
            {
                var authHeader = Request.Headers["Authorization"].ToString();
                if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
                {
                    return Unauthorized(new { Message = "Token is missing or invalid." });
                }
                var count = await _bookingService.GetBookingCountAsync(authHeader.Replace("Bearer ", ""));
                return Ok(new { Count = count });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred.", Details = ex.Message });
            }
        }

        //[HttpDelete]
        //public async Task<IActionResult> CancelBooking([FromBody] CancelBookingRequestDto dto)
        //{
        //    try
        //    {
        //        var authHeader = Request.Headers["Authorization"].ToString();
        //        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
        //        {
        //            return Unauthorized(new { Message = "Token is missing or invalid." });
        //        }
        //        await _bookingService.CancelBookingAsync(authHeader.Replace("Bearer ", ""), dto);
        //        return Ok();
        //    }
        //    catch (InvalidOperationException ex)
        //    {
        //        return Conflict(new { Message = ex.Message });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new { Message = "An error occurred.", Details = ex.Message });
        //    }
        //}

    }
}
