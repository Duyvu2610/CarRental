
namespace CarRental.Dto
{
    public class InfoDto
    {
        public int IdUser { get; set; }
        public string? Name { get; set; }
        public string? CCCD { get; set; }
        public string? GPLX { get; set; }

        public string? ImgGplx { get; set; }
        public string? Img { get; set; }

        public DateTime? Ngaysinh { get; set; }
        public int? GioiTinh { get; set; }

        public DateTime CreatedDate { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

    }
}
