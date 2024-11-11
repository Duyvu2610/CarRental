using CarRental.Data;
using CarRental.Dto;
using CarRental.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Controllers
{
    [ApiController]
    [Route("api/feature")]
    public class FeatureController: ControllerBase
    {
        private readonly AppDbContext _context;
        public FeatureController(AppDbContext db) 
        {
            _context = db;
        }


        [HttpGet]
        public async Task<ActionResult<InfoDto>> GetProfile()
        {
            var tinhNangs = await _context.TinhNangs.ToListAsync();
            if (tinhNangs == null)
            {
                return NotFound();
            }
            return Ok(tinhNangs);
        }

    }
}
