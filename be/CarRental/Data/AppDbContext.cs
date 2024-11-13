using CarRental.Models;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<HoaDon> HoaDons { get; set; }
        public DbSet<CTHD> CTHDs { get; set; }
        public DbSet<DonDatXe> DonDatXes { get; set; }

        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Hang> Hangs { get; set; }
        public DbSet<InfoUser> InfoUsers { get; set; }
        public DbSet<InfoXe> InfoXes { get; set; }
        public DbSet<Loaixe> Loaixes { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<SanPham> SanPhams { get; set; }
        public DbSet<TinhNang> TinhNangs { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<XeTinhNang> XeTinhNangs { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<XeTinhNang>(entity =>
            {
                entity.HasKey(c => new { c.Idtinhnang, c.Idxe });

                entity.HasOne(t => t.TinhNang)
                .WithMany(x => x.XeTinhNang)
                .HasForeignKey(xet => xet.Idtinhnang);

                entity.HasOne(t => t.InfoXe)
               .WithMany(x => x.ListTinhNang)
               .HasForeignKey(xet => xet.Idxe);

            });
            modelBuilder.Entity<TinhNang>(entity =>
            {
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100)
                .IsUnicode(true);
            });

            modelBuilder.Entity<Hang>(entity =>
            {
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100).IsUnicode(true);
            });

            modelBuilder.Entity<Loaixe>(entity =>
            {
                entity.Property(e => e.Name).IsRequired().HasMaxLength(50);

                entity.HasOne(h => h.Hang)
                .WithMany(m => m.Loaixe)
                .HasForeignKey(h => h.HangId)
                .OnDelete(DeleteBehavior.Cascade);

            });

            modelBuilder.Entity<InfoXe>(entity =>
            {
                entity.Property(e => e.Bienso).HasMaxLength(10).IsRequired();

                entity.Property(e => e.Soghe).IsRequired();

                entity.Property(e => e.Truyendong).HasMaxLength(20).IsRequired();

                entity.Property(e => e.LoaiNl).HasMaxLength(30).IsRequired();

                entity.Property(e => e.Mota).HasMaxLength(500);

                entity.HasOne(h => h.Hang)
                .WithMany(x => x.InfoXe)
                .HasForeignKey(h => h.IdHang)
                .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(l => l.Loaixe)
                .WithMany(x => x.InfoXe)
                .HasForeignKey(l => l.IdLoaiXe)
                .OnDelete(DeleteBehavior.NoAction);

                entity.HasOne(u => u.User)
                .WithMany(x => x.InfoXe)
                .HasForeignKey(u => u.IdUser)
                .OnDelete(DeleteBehavior.Cascade);

            });

            modelBuilder.Entity<SanPham>(entity =>
            {
                entity.Property(e => e.Loinhan).HasMaxLength(500).IsUnicode(true);

                entity.Property(e => e.Diachixe).IsRequired().HasMaxLength(100).IsUnicode(true);

                entity.Property(e => e.LimitXechay).IsRequired();

                entity.Property(e => e.GiaVuot).IsRequired();

                entity.Property(e => e.Img).IsRequired().HasMaxLength(200);
                entity.Property(e => e.GioiHankmgiaoxe).IsRequired();
                entity.Property(e => e.Gia).IsRequired();

                entity.HasOne(u => u.InfoXe)
                    .WithOne(x => x.SanPham)
                    .HasForeignKey<SanPham>(x => x.IdInfo)
                .OnDelete(DeleteBehavior.NoAction);

                entity.HasOne(u => u.InfoUser)
                .WithMany(s => s.sanPhams)
                .HasForeignKey(s => s.IdChuXe)
                .OnDelete(DeleteBehavior.Cascade);

            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.UserName).HasMaxLength(50).IsRequired().IsUnicode(true);

                entity.Property(e => e.Password).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(50);

                entity.HasOne(r => r.role)
                .WithMany(u => u.Users)
                .HasForeignKey(u => u.IdRole)
                .OnDelete(DeleteBehavior.NoAction);

                entity.HasOne(i => i.InfoUser)
                .WithOne(u => u.User)
                .HasForeignKey<InfoUser>(i => i.IdUser)
                .OnDelete(DeleteBehavior.Cascade);

            });

            modelBuilder.Entity<Feedback>(entity =>
            {
                entity.Property(e => e.Noidung).HasMaxLength(200).IsRequired().IsUnicode(true);
                entity.Property(e => e.Danhgia).IsRequired();
                entity.Property(e => e.Date)
                .IsRequired();

                entity.HasOne(u => u.InfoUserCus)
                .WithMany(f => f.FeedbacksCus)
                .HasForeignKey(f => f.IdCus)
                .OnDelete(DeleteBehavior.NoAction);

                entity.HasOne(u => u.SanPham)
                .WithMany(f => f.Feedbacks)
                .HasForeignKey(f => f.IdCar)
                .OnDelete(DeleteBehavior.Cascade);

            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.NameRole).HasMaxLength(50).IsRequired().IsUnicode(true);
            });

            modelBuilder.Entity<HoaDon>(entity =>
            {
                entity.Property(e => e.Paymentdate)
                .IsRequired();

                entity.Property(e => e.Total).IsRequired();

                entity.HasOne(u => u.infoUser)
               .WithMany(f => f.HoaDoncs)
               .HasForeignKey(f => f.IdCus)
               .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(u => u.infoUser)
               .WithMany(f => f.HoaDoncs)
               .HasForeignKey(f => f.IdOwner)
               .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(u => u.DonDatXe)
                .WithOne(f => f.HoaDon)
                .HasForeignKey<HoaDon>(f => f.IdBooking)
                .OnDelete(DeleteBehavior.NoAction);
            });

            modelBuilder.Entity<CTHD>(entity =>
            {
                entity.Property(e => e.Gia).IsRequired();

                entity.Property(e => e.Checkin)
               .HasColumnType("date")
               .IsRequired();

                entity.Property(e => e.Checkout)
               .HasColumnType("date")
               .IsRequired();

                entity.HasOne(h => h.HoaDoncs)
                .WithMany(c => c.cTHDs)
                .HasForeignKey(c => c.IDHD)
                .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(h => h.SanPham)
                .WithMany(c => c.CTHDs)
                .HasForeignKey(c => c.IdSp)
                .OnDelete(DeleteBehavior.NoAction);

                entity.Property(e => e.IdSp).IsRequired();

            });

            modelBuilder.Entity<DonDatXe>(entity =>
            {
                entity.Property(e => e.State).IsRequired();

                entity.Property(e => e.ngayDat).IsRequired();



                entity.Property(e => e.checkin)
              .HasColumnType("date")
              .IsRequired();

                entity.Property(e => e.checkout)
               .HasColumnType("date")
               .IsRequired();

                entity.HasOne(i => i.infoUserOwner)
                .WithMany(d => d.DonDatXesOwner)
                .HasForeignKey(d => d.IdOwner)
                .OnDelete(DeleteBehavior.NoAction);

            });

            modelBuilder.Entity<InfoUser>(entity =>
            {
                entity.HasKey(e => e.IdUser);
            });
        }
    }
}
