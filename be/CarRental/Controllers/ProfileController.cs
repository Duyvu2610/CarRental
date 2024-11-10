using CarRental.Dto;
using CarRental.Models;
using CarRental.Services;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.Controllers
{
    [ApiController]
    [Route("api/profile")]
    public class ProfileController : ControllerBase
    {
        private readonly ProfileService _profileService;

        public ProfileController(ProfileService profileService)
        {
            _profileService = profileService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<InfoUser>> GetProfile(int id)
        {
            var profile = await _profileService.InfoUser(id);
            if (profile == null)
            {
                return NotFound();
            }
            return Ok(profile);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateProfile([FromBody] RequestProfileDto dto)
        {
            string token = Request.Headers["Authorization"];
            var result = await _profileService.UpdateProfile(token.Replace("Bearer ", ""), dto);
            if (!result)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpGet("history/booking")]
        public async Task<ActionResult> GetBookingHistory()
        {
            string token = Request.Headers["Authorization"];
            var result = await _profileService.GetBookingHistory(token.Replace("Bearer ", ""));
            return Ok(result);
        }

        [HttpDelete("booking/{id}")]
        public async Task<ActionResult> CancelBooking(int id)
        {
            string token = Request.Headers["Authorization"];
            var result = await _profileService.CancelBooking(token.Replace("Bearer ", ""), id);
            if (!result)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpGet("booking/accept/{id}")]
        public async Task<ActionResult> AcceptBooking(int id)
        {
            string token = Request.Headers["Authorization"];
            var result = await _profileService.AcceptBooking(token.Replace("Bearer ", ""), id);
            if (!result)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpGet("booking/reject/{id}")]
        public async Task<ActionResult> RejectBooking(int id)
        {
            string token = Request.Headers["Authorization"];
            var result = await _profileService.RejectBooking(token.Replace("Bearer ", ""), id);
            if (!result)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpGet("booking/list")]
        public async Task<ActionResult> GetBookingList([FromQuery] int state)
        {
            string token = Request.Headers["Authorization"];
            var result = await _profileService.GetBookingList(token.Replace("Bearer ", ""), state);
            return Ok(result);
        }
    }
        
}
