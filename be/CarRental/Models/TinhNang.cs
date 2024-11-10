namespace CarRental.Models
{
    public class TinhNang
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual List<XeTinhNang> XeTinhNang { get ; set; }
        
    }
}
