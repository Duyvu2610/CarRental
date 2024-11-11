using CarRental.Data;
using CarRental.Dto;
using CarRental.Models;
using CarRental.NewFolder;
using CarRental.Util;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;

namespace CarRental.Services
{
    public class CarService
    {
        private readonly AppDbContext _appDbContext;
        private readonly JwtUtil _jwt;

        public CarService(AppDbContext appDbContext, JwtUtil jwt)
        {
            _appDbContext = appDbContext;
            _jwt = jwt;
        }

        public async Task<List<CarDto>> SearchCar()
        {
            List<CarDto> carDtos = new List<CarDto>();

            carDtos = await _appDbContext.InfoXes
                .Include(SanPham => SanPham.SanPham)
                .Include(ListTinhNang => ListTinhNang.ListTinhNang).
                Include(XeTinhNang => XeTinhNang.ListTinhNang)
                .Where(SanPham => SanPham.SanPham.State != 1)
                .Select(x => new CarDto
                {
                    Id = x.Id,
                    Name = x.Loaixe.Name,
                    ImgUrl = x.SanPham.Img,
                    Address = x.SanPham.Diachixe,
                    DriveShaftKbn = x.Truyendong,
                    NumOfSeat = x.Soghe,
                    Fuel = x.LoaiNl,
                    Description = x.Mota,
                    ListFeature = x.ListTinhNang.Select(t => new TinhNangDto()
                    {
                        Name = t.TinhNang.Name,
                        Icon = t.TinhNang.Icon
                    }).ToList(),
                    Price = x.SanPham.Gia
                })
                .ToListAsync();

            return carDtos;

        }

        public async Task<bool> RegisterCar(CarRegisterDto carRegisterDto, string token)
        {
            int idUser = _jwt.GetIdFromToken(token);
            using (var transaction = await _appDbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    InfoXe car = new InfoXe
                    {
                        IdHang = carRegisterDto.BrandKbn,
                        IdLoaiXe = carRegisterDto.CarTypeKbn,
                        IdUser = idUser,
                        Bienso = carRegisterDto.LicensePlate,
                        Soghe = carRegisterDto.NumOfSeat,
                        Truyendong = carRegisterDto.DriveShaftKbn,
                        LoaiNl = carRegisterDto.Fuel,
                        Mota = carRegisterDto.Description,
                    };

                    _appDbContext.InfoXes.Add(car);
                    await _appDbContext.SaveChangesAsync();

                    int carId = car.Id;

                    SanPham carDetail = new SanPham
                    {
                        IdInfo = carId,
                        IdChuXe = idUser,
                        Loinhan = carRegisterDto.Note,
                        Diachixe = carRegisterDto.Address,
                        LimitXechay = carRegisterDto.LimitKm,
                        GiaVuot = carRegisterDto.PriceLimitKm,
                        Img = carRegisterDto.ImgUrl,
                        GioiHankmgiaoxe = carRegisterDto.LimitDeliveryKm,
                        Gia = carRegisterDto.Price,
                        State = 2
                    };

                    _appDbContext.SanPhams.Add(carDetail);
                    await _appDbContext.SaveChangesAsync();

                    if (carRegisterDto.FeatureList != null)
                    {
                        foreach (int featureId in carRegisterDto.FeatureList)
                        {
                            XeTinhNang carFeature = new XeTinhNang
                            {
                                Idxe = carId,
                                Idtinhnang = featureId
                            };

                            _appDbContext.XeTinhNangs.Add(carFeature);
                            await _appDbContext.SaveChangesAsync();
                        }
                    }

                    await transaction.CommitAsync();

                    return true;
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();

                    return false;
                }
            }
        }

        public async Task<InfoXe> GetCarById(int id)
        {
            return await _appDbContext.InfoXes
                .AsNoTracking()
                .Include(SanPham => SanPham.SanPham)
                .Include(Loaixe => Loaixe.Loaixe)
                .Include(ListTinhNang => ListTinhNang.ListTinhNang).ThenInclude(TinhNang => TinhNang.TinhNang)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        //public async Task<InfoXe> UpdateCar(int id, InfoXe updatedCar)
        //{
        //    var existingCar = await _appDbContext.InfoXes.FindAsync(id);
        //    if (existingCar == null) return null;

        //    existingCar.TenXe = updatedCar.TenXe;
        //    existingCar.LoaiXe = updatedCar.LoaiXe;
        //    existingCar.BienSoXe = updatedCar.BienSoXe;

        //    await _appDbContext.SaveChangesAsync();
        //    return existingCar;
        //}

        public async Task<bool> DeleteCar(int id)
        {
            var car = await _appDbContext.InfoXes.FindAsync(id);
            if (car == null) return false;

            _appDbContext.InfoXes.Remove(car);
            await _appDbContext.SaveChangesAsync();
            return true;
        }

        internal async Task<bool> UpdateCar(int id, CarRegisterDto updatedCar)
        {
            var car = await _appDbContext.InfoXes.FindAsync(id);
            if (car == null) return false;

            car.IdHang = updatedCar.BrandKbn;
            car.IdLoaiXe = updatedCar.CarTypeKbn;
            car.Bienso = updatedCar.LicensePlate;
            car.Soghe = updatedCar.NumOfSeat;
            car.Truyendong = updatedCar.DriveShaftKbn;
            car.LoaiNl = updatedCar.Fuel;
            car.Mota = updatedCar.Description;

            var carDetail = await _appDbContext.SanPhams.FirstOrDefaultAsync(x => x.IdInfo == id);
            if (carDetail == null) return false;

            carDetail.Loinhan = updatedCar.Note;
            carDetail.Diachixe = updatedCar.Address;
            carDetail.LimitXechay = updatedCar.LimitKm;
            carDetail.GiaVuot = updatedCar.PriceLimitKm;
            carDetail.Img = updatedCar.ImgUrl;
            carDetail.GioiHankmgiaoxe = updatedCar.LimitDeliveryKm;
            carDetail.Gia = updatedCar.Price;

            await _appDbContext.SaveChangesAsync();
            return true;

        }
    }
}
