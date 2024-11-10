

namespace CarRental.Models
{
    public partial class Role
    {
        public int Id { get; set; } 

        public string NameRole { get; set; }

        public virtual ICollection<User> Users { get; set; }

    }
}
