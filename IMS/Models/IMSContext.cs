using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace IMS.Models
{
    public partial class IMSContext : DbContext
    {
        public IMSContext()
        {
        }

        public IMSContext(DbContextOptions<IMSContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AuthorDetail> AuthorDetails { get; set; }
        public virtual DbSet<BookDetail> BookDetails { get; set; }
        public virtual DbSet<ItemMaster> ItemMasters { get; set; }
        public virtual DbSet<SupplierMaster> SupplierMasters { get; set; }
        public virtual DbSet<UserGroup> UserGroups { get; set; }
        public virtual DbSet<UserGroupPermission> UserGroupPermissions { get; set; }
        public virtual DbSet<UserLoginDetail> UserLoginDetails { get; set; }
        public virtual DbSet<UserMaster> UserMasters { get; set; }
        public virtual DbSet<UserPermissionMaster> UserPermissionMasters { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-0GPJTTN\\THUSHI;Initial Catalog=IMS;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AuthorDetail>(entity =>
            {
                entity.HasKey(e => e.AuthorSerial);

                entity.Property(e => e.Cdate)
                    .HasColumnName("CDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.LastName).IsRequired();

                entity.Property(e => e.Status).HasMaxLength(50);

                entity.Property(e => e.Title).HasMaxLength(50);
            });

            modelBuilder.Entity<BookDetail>(entity =>
            {
                entity.HasKey(e => e.BookSerial);

                entity.Property(e => e.Cdate)
                    .HasColumnName("CDate")
                    .HasColumnType("datetime");
            });

            modelBuilder.Entity<ItemMaster>(entity =>
            {
                entity.HasKey(e => e.ItemSerial);

                entity.ToTable("ItemMaster");

                entity.Property(e => e.BatchNo)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Cby).HasColumnName("CBy");

                entity.Property(e => e.Cdate)
                    .HasColumnName("CDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.ExpDate).HasColumnType("date");

                entity.Property(e => e.ItemId).HasMaxLength(50);

                entity.HasOne(d => d.SupplierSerialNavigation)
                    .WithMany(p => p.ItemMasters)
                    .HasForeignKey(d => d.SupplierSerial)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ItemMaster_SupplierMaster");
            });

            modelBuilder.Entity<SupplierMaster>(entity =>
            {
                entity.HasKey(e => e.SupplierSerial);

                entity.ToTable("SupplierMaster");

                entity.Property(e => e.Cby).HasColumnName("CBy");

                entity.Property(e => e.Cdate)
                    .HasColumnName("CDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.Email).HasMaxLength(200);

                entity.Property(e => e.SupplierId)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.SupplierName).HasMaxLength(100);
            });

            modelBuilder.Entity<UserGroup>(entity =>
            {
                entity.ToTable("UserGroup");

                entity.Property(e => e.UserGroupId).HasColumnName("UserGroupID");

                entity.Property(e => e.Cby).HasColumnName("CBy");

                entity.Property(e => e.Cdate)
                    .HasColumnName("CDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.UserGroupName).HasMaxLength(500);
            });

            modelBuilder.Entity<UserGroupPermission>(entity =>
            {
                entity.HasKey(e => e.GroupPermissionSerial);

                entity.ToTable("UserGroupPermission");

                entity.Property(e => e.ReadAndWrite).HasMaxLength(50);

                entity.Property(e => e.ReadOnly).HasMaxLength(50);
            });

            modelBuilder.Entity<UserLoginDetail>(entity =>
            {
                entity.HasKey(e => e.LoginId);

                entity.Property(e => e.LoginId).HasColumnName("LoginID");

                entity.Property(e => e.LoginDataTime).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("UserID");
            });

            modelBuilder.Entity<UserMaster>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.ToTable("UserMaster");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.Cby).HasColumnName("CBy");

                entity.Property(e => e.Cdate)
                    .HasColumnName("CDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.EmployeeName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Mby).HasColumnName("MBy");

                entity.Property(e => e.Mdate)
                    .HasColumnName("MDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.Password).IsRequired();

                entity.Property(e => e.Status).HasMaxLength(50);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<UserPermissionMaster>(entity =>
            {
                entity.HasKey(e => e.PermissionSerial);

                entity.ToTable("UserPermissionMaster");

                entity.Property(e => e.PermissionName)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.PermissionValue)
                    .IsRequired()
                    .HasMaxLength(500);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
