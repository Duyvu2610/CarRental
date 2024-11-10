namespace CarRental.Dto
{
    public class CarRegisterDto
    {
        public int BrandKbn { get; set; }

        public int CarTypeKbn { get; set; }

        public string LicensePlate { get; set; }

        public int NumOfSeat { get; set; }

        public int DriveShaftKbn { get; set; }

        public string Fuel { get; set; }

        public string Description { get; set; }

        public string Note { get; set; }

        public string Address { get; set; }

        public List<int>? FeatureList { get; set; }

        public int LimitKm { get; set; }

        public double PriceLimitKm { get; set; }

        public string ImgUrl { get; set; }

        public int LimitDeliveryKm { get; set; }

        public double Price { get; set; }

        public double State { get; set; }
    }
}
