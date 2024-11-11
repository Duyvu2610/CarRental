using CarRental.Dto;
using CarRental.Models;
using CarRental.NewFolder;
using CarRental.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarRental.Controllers
{
    [Route("api/car")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly CarService _carService;

        public CarController(CarService carService)
        {
            _carService = carService;
        }

        // GET: api/Cars
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarDto>>> GetAllCars()
        {
            var cars = await _carService.SearchCar();
            return Ok(cars);
        }

        // GET: api/Cars/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CarDto>> GetCarById(int id)
        {
            InfoXe car = await _carService.GetCarById(id);
            if (car == null)
            {
                return NotFound();
            }
            CarDto carDto = new CarDto()
            {
                Name = car.Loaixe.Name,
                ImgUrl = car.SanPham.Img,
                Address = car.SanPham.Diachixe,
                DriveShaftKbn = car.Truyendong,
                NumOfSeat = car.Soghe,
                Fuel = car.LoaiNl,
                Description = car.Mota,
                ListFeature = car.ListTinhNang.Select(t => new TinhNangDto()
                {
                    Name = t.TinhNang.Name,
                    Icon = t.TinhNang.Icon
                }).ToList(),
                Price = car.SanPham.Gia,
                Id = car.Id,
                IdOwner = car.IdUser
            };
            return Ok(carDto);
        }

        // POST: api/Cars
        [HttpPost]
        public async Task<ActionResult> CreateCar([FromBody] CarRegisterDto dto)
        {
            try
            {
                string token = Request.Headers["Authorization"];
                var createdCar = await _carService.RegisterCar(dto, token.Replace("Bearer ", ""));
                return Created();
            }
            catch
            {
                return BadRequest();
            }
            
        }

        // PUT: api/Cars/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCar(int id, CarRegisterDto updatedCar)
        {
            var car = await _carService.UpdateCar(id, updatedCar);
            if (car == null)
            {
                return NotFound();
            }
            return NoContent();
        }

        // DELETE: api/Cars/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(int id)
        {
            var deleted = await _carService.DeleteCar(id);
            if (!deleted)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
