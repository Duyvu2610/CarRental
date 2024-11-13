

using CarRental.Dto;
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

        [HttpGet("loai/{id}")]
        public async Task<ActionResult<IEnumerable<Loaixe>>> GetAllCarTypes(int id)
        {
            var carTypes = await _brandService.SearchCarType(id);
            return Ok(carTypes);
        }

        [HttpPost]
        public async Task<ActionResult> CreateBrand([FromBody] FeatureDto brand)
        {
            var newBrand = await _brandService.CreateBrand(brand);
            if (!newBrand)
            {
                return BadRequest("Brand already exists");
            }
            return Ok();
        }

        [HttpPost("loaixe")]
        public async Task<ActionResult> CreateCarType([FromBody] FeatureDto brand)
        {
            var newBrand = await _brandService.CreateCarType(brand);
            if (!newBrand)
            {
                return BadRequest("Brand already exists");
            }
            return Ok();
        }
    }
}
