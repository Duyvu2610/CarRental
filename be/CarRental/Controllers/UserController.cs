using CarRental.Data;
using CarRental.Dto;
using CarRental.Models;
using CarRental.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Controllers
{

    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly UserService _userService;
        private readonly ProfileService _profileService;

        public UserController(AppDbContext context, UserService userService, ProfileService profileService)
        {
            _context = context;
            _userService = userService;
            _profileService = profileService;
        }

        [HttpGet]
        public async Task<ActionResult<List<InfoDto>>> GetUsers()
        {
            return await _context.InfoUsers
                .Include(x => x.User)
                .Select(x => new InfoDto
                {
                    IdUser = x.IdUser,
                    Name = x.Name,
                    CCCD = x.CCCD,
                    GPLX = x.GPLX,
                    ImgGplx = x.ImgGplx,
                    Img = x.Img,
                    Ngaysinh = x.Ngaysinh,
                    GioiTinh = x.GioiTinh,
                    CreatedDate = x.CreatedDate,
                    Phone = x.Phone,
                    Email = x.User.Email
                }).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<InfoDto>> GetUser(int id)
        {
            var profile = await _profileService.InfoUser(id);
            if (profile == null)
            {
                return NotFound();
            }
            return Ok(profile);
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateProduct(User product)
        {
            _context.Users.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = product.Id }, product);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _userService.DeleteUser(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpGet("renting-cars/list")]
        public async Task<IActionResult> GetRentingCars([FromQuery] int state, [FromQuery] int carId)
        {
            var cars = await _userService.GetRentingCars(state, carId);
            return Ok(cars);
        }


    }
}
