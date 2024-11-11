using CarRental.Dto;
using CarRental.Models;
using CarRental.Services;
using CarRental.Util;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.Controllers
{
    [ApiController]
    [Route("api/profile")]
    public class ProfileController : ControllerBase
    {
        private readonly ProfileService _profileService;
        private readonly UserService _userService;
        private readonly JwtUtil _jwtUtil;

        public ProfileController(ProfileService profileService, UserService userService, JwtUtil jwtUtil)
        {
            _profileService = profileService;
            _userService = userService;
            _jwtUtil = jwtUtil;
        }

        [HttpGet]
        public async Task<ActionResult<InfoDto>> GetProfile()
        {
            string token = Request.Headers["Authorization"];
            var profile = await _profileService.InfoUser(token.Replace("Bearer ", ""));
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
        public async Task<ActionResult> GetBookingHistory([FromQuery] int status)
        {
            string token = Request.Headers["Authorization"];
            var result = await _profileService.GetBookingHistory(token.Replace("Bearer ", ""), status);
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

        [HttpGet("my-car")]
        public async Task<ActionResult> GetBookingList()
        {
            string token = Request.Headers["Authorization"];
            var result = await _profileService.GetBookingList(token.Replace("Bearer ", ""));
            return Ok(result);
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteUser()
        {
            string token = Request.Headers["Authorization"];
            int id = _jwtUtil.GetIdFromToken(token.Replace("Bearer ", ""));
            bool isSucess = await _userService.DeleteUser(id);
            if (!isSucess)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}
