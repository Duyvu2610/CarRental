

using CarRental.Models;
using CarRental.Services;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.Controllers
{
    [ApiController]
    [Route("api/brand")]
    public class BrandController : ControllerBase
    {
        private readonly BrandService _brandService;

        public BrandController(BrandService brandService)
        {
            _brandService = brandService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hang>>> GetAllCars()
        {
            var brands = await _brandService.SearchBrand();
            return Ok(brands);
        }
    }
}
