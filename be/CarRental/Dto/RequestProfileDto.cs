namespace CarRental.Dto
{
    public class RequestProfileDto
    {
        public string? Name { get; set; }

        public string? IdentityCard { get; set; }

        public string? DrivingLicense { get; set; }

        public DateTime? Dob { get; set; }

        public int Gender { get; set; }

        public string? Phone { get; set; }
    }
}
