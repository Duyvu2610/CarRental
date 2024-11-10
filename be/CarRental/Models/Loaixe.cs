namespace CarRental.Models
{
    public class Loaixe
    {
        public int Id { get; set; }
        public int  HangId { get; set; }

        public string Name { get; set; }

        public virtual ICollection<InfoXe> InfoXe { get; set; }
        public virtual Hang Hang { get; set; }
    }
          
}
