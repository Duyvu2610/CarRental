using CarRental.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Controllers
{
    [ApiController]
    [Route("api/admin")]
    public class AdminController : ControllerBase
    {
        private readonly AdminService _adminService;

        public AdminController(AdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("top-owner")]
        public async Task<IActionResult> GetTopOwner()
        {
            try
            {
                var topOwner = await _adminService.GetTopOwner();
                return Ok(topOwner);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { Message = ex.Message });
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, new { Message = "Database update error occurred." });
            }
        }

        [HttpGet("top-user")]
        public async Task<IActionResult> GetTopUser()
        {
            try
            {
                var topUser = await _adminService.GetTopCustomersByRentalCount();
                return Ok(topUser);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { Message = ex.Message });
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, new { Message = "Database update error occurred." });
            }
        }

        [HttpGet("statistics")]
        public async Task<IActionResult> GetStatistics()
        {
            try
            {
                var statistics = await _adminService.GetRentalStatisticsLists();
                return Ok(statistics);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { Message = ex.Message });
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, new { Message = "Database update error occurred." });
            }
        }

    }
}
