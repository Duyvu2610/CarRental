using CarRental.Dto;

namespace CarRental.NewFolder
{
    public class CarDto
    {
        public string? Name { get; set; }

        public int Id { get; set; }

        public int IdOwner { get; set; }

        public string? ImgUrl { get; set; }

        public string? Address { get; set; }

        public int DriveShaftKbn { get; set; }

        public int NumOfSeat { get; set; }

        public int Fuel { get; set; }

        public string? Description { get; set; }

        public List<TinhNangDto>? ListFeature { get; set; }

        public double Price { get; set; }



    }
}
