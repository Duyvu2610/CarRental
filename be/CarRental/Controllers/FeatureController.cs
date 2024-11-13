using CarRental.Data;
using CarRental.Dto;
using CarRental.Models;
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

        [HttpPost("{id}")]
        public async Task<ActionResult<InfoDto>> GetProfile(int id, [FromBody] List<int> payload)
        {
            for (int i = 0; i < payload.Count; i++)
            {
                var tinhNang = new XeTinhNang
                {
                    Idxe = id,
                    Idtinhnang = payload[i]
                };
                _context.XeTinhNangs.Add(tinhNang);
            }

            await _context.SaveChangesAsync();
            return Ok();
        }

    }
}
