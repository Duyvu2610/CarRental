using Microsoft.AspNetCore.Mvc;
using CarRental.Services;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.Data;
using CarRental.Dto;
using CarRental.Data;
using CarRental.Util;

namespace CarRental.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly AppDbContext _context;
        private readonly JwtUtil _jwtUtil;

        public AuthController(AuthService authService, AppDbContext appDbContext, JwtUtil jwtUtil)
        {
            _authService = authService;
            _context = appDbContext;
            _jwtUtil = jwtUtil;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            try
            {
                var result = await _authService.RegisterAsync(request.Email, request.Password);
                return Created();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                var token = await _authService.LoginAsync(request.Email, request.Password);
                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            try
            {
                var authHeader = Request.Headers["Authorization"].ToString();
                await _authService.ChangePasswordAsync(authHeader.Replace("Bearer ", ""), request.OldPassword, request.NewPassword);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("uploadImage")]
        public async Task<IActionResult> UploadImage([FromQuery] string url)
        {
            try
            {
                var authHeader = Request.Headers["Authorization"].ToString();
                int id = _jwtUtil.GetIdFromToken(authHeader.Replace("Bearer ", ""));
                var user = await _context.InfoUsers.FindAsync(id);
                user.Img = url;
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
