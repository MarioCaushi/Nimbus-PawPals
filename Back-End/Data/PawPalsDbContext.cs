using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;
using Back_End.Models;

namespace Back_End.Data;

public partial class PawPalsDbContext : DbContext
{
    public PawPalsDbContext()
    {
    }

    public PawPalsDbContext(DbContextOptions<PawPalsDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Bill> Bills { get; set; }

    public virtual DbSet<Client> Clients { get; set; }

    public virtual DbSet<Doctor> Doctors { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<Groomer> Groomers { get; set; }

    public virtual DbSet<IsIncludedIn> IsIncludedIns { get; set; }

    public virtual DbSet<Manager> Managers { get; set; }

    public virtual DbSet<MedicalChart> MedicalCharts { get; set; }

    public virtual DbSet<Pet> Pets { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Receptionist> Receptionists { get; set; }

    public virtual DbSet<Salary> Salaries { get; set; }

    public virtual DbSet<Service> Services { get; set; }

    public virtual DbSet<Timetable> Timetables { get; set; }

    public virtual DbSet<UserAuth> UserAuths { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;database=PawPalsDB;user=root;password=mariomario204", Microsoft.EntityFrameworkCore.ServerVersion.Parse("9.1.0-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Bill>(entity =>
        {
            entity.HasKey(e => e.BillId).HasName("PRIMARY");

            entity.ToTable("Bill");

            entity.HasIndex(e => e.ClientId, "ClientID");

            entity.HasIndex(e => e.Date, "Date").IsUnique();

            entity.Property(e => e.BillId).HasColumnName("BillID");
            entity.Property(e => e.ClientId).HasColumnName("ClientID");
            entity.Property(e => e.Date).HasColumnType("datetime");
            entity.Property(e => e.PaymentMethod).HasMaxLength(50);
            entity.Property(e => e.TotalAmount).HasPrecision(10, 2);

            entity.HasOne(d => d.Client).WithMany(p => p.Bills)
                .HasForeignKey(d => d.ClientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("bill_ibfk_1");
        });

        modelBuilder.Entity<Client>(entity =>
        {
            entity.HasKey(e => e.ClientId).HasName("PRIMARY");

            entity.ToTable("Client");

            entity.HasIndex(e => e.ContactNumber, "ContactNumber").IsUnique();

            entity.HasIndex(e => e.Email, "Email").IsUnique();

            entity.HasIndex(e => e.RegisterDate, "RegisterDate").IsUnique();

            entity.Property(e => e.ClientId).HasColumnName("ClientID");
            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.ContactNumber).HasMaxLength(50);
            entity.Property(e => e.Email).HasMaxLength(200);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.PreferredContact).HasMaxLength(50);
            entity.Property(e => e.RegisterDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<Doctor>(entity =>
        {
            entity.HasKey(e => e.DoctorId).HasName("PRIMARY");

            entity.ToTable("Doctor");

            entity.HasIndex(e => e.ContactNumber, "ContactNumber").IsUnique();

            entity.HasIndex(e => e.Email, "Email").IsUnique();

            entity.HasIndex(e => e.HireDate, "HireDate").IsUnique();

            entity.HasIndex(e => e.PersonalId, "PersonalID").IsUnique();

            entity.HasIndex(e => e.SalaryId, "SalaryID");

            entity.Property(e => e.DoctorId).HasColumnName("DoctorID");
            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.ContactNumber).HasMaxLength(50);
            entity.Property(e => e.Email).HasMaxLength(200);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.HireDate).HasColumnType("datetime");
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.PersonalId).HasColumnName("PersonalID");
            entity.Property(e => e.Qualifications).HasColumnType("text");
            entity.Property(e => e.SalaryId).HasColumnName("SalaryID");
            entity.Property(e => e.Specialty).HasMaxLength(100);

            entity.HasOne(d => d.Salary).WithMany(p => p.Doctors)
                .HasForeignKey(d => d.SalaryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("doctor_ibfk_1");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.FeedbackId).HasName("PRIMARY");

            entity.ToTable("Feedback");

            entity.HasIndex(e => e.Date, "Date").IsUnique();

            entity.Property(e => e.FeedbackId).HasColumnName("FeedbackID");
            entity.Property(e => e.Comment).HasColumnType("text");
            entity.Property(e => e.Date).HasColumnType("datetime");
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.UserEmail).HasMaxLength(200);
        });

        modelBuilder.Entity<Groomer>(entity =>
        {
            entity.HasKey(e => e.GroomerId).HasName("PRIMARY");

            entity.ToTable("Groomer");

            entity.HasIndex(e => e.ContactNumber, "ContactNumber").IsUnique();

            entity.HasIndex(e => e.Email, "Email").IsUnique();

            entity.HasIndex(e => e.HireDate, "HireDate").IsUnique();

            entity.HasIndex(e => e.PersonalId, "PersonalID").IsUnique();

            entity.HasIndex(e => e.SalaryId, "SalaryID");

            entity.Property(e => e.GroomerId).HasColumnName("GroomerID");
            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.ContactNumber).HasMaxLength(50);
            entity.Property(e => e.Email).HasMaxLength(200);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.HireDate).HasColumnType("datetime");
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.PersonalId).HasColumnName("PersonalID");
            entity.Property(e => e.SalaryId).HasColumnName("SalaryID");

            entity.HasOne(d => d.Salary).WithMany(p => p.Groomers)
                .HasForeignKey(d => d.SalaryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("groomer_ibfk_1");
        });

        modelBuilder.Entity<IsIncludedIn>(entity =>
        {
            entity.HasKey(e => new { e.BillId, e.ProductId })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

            entity.ToTable("IsIncludedIn");

            entity.HasIndex(e => e.ProductId, "ProductID");

            entity.Property(e => e.BillId).HasColumnName("BillID");
            entity.Property(e => e.ProductId).HasColumnName("ProductID");

            entity.HasOne(d => d.Bill).WithMany(p => p.IsIncludedIns)
                .HasForeignKey(d => d.BillId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("isincludedin_ibfk_1");

            entity.HasOne(d => d.Product).WithMany(p => p.IsIncludedIns)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("isincludedin_ibfk_2");
        });

        modelBuilder.Entity<Manager>(entity =>
        {
            entity.HasKey(e => e.ManagerId).HasName("PRIMARY");

            entity.ToTable("Manager");

            entity.HasIndex(e => e.ContactNumber, "ContactNumber").IsUnique();

            entity.HasIndex(e => e.Email, "Email").IsUnique();

            entity.HasIndex(e => e.HireDate, "HireDate").IsUnique();

            entity.HasIndex(e => e.PersonalId, "PersonalID").IsUnique();

            entity.HasIndex(e => e.SalaryId, "SalaryID");

            entity.Property(e => e.ManagerId).HasColumnName("ManagerID");
            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.ContactNumber).HasMaxLength(50);
            entity.Property(e => e.Email).HasMaxLength(200);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.HireDate).HasColumnType("datetime");
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.PersonalId).HasColumnName("PersonalID");
            entity.Property(e => e.SalaryId).HasColumnName("SalaryID");

            entity.HasOne(d => d.Salary).WithMany(p => p.Managers)
                .HasForeignKey(d => d.SalaryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("manager_ibfk_1");
        });

        modelBuilder.Entity<MedicalChart>(entity =>
        {
            entity.HasKey(e => e.MedicalChartId).HasName("PRIMARY");

            entity.ToTable("MedicalChart");

            entity.HasIndex(e => e.Date, "Date").IsUnique();

            entity.HasIndex(e => e.PetId, "PetID");

            entity.Property(e => e.MedicalChartId).HasColumnName("MedicalChartID");
            entity.Property(e => e.Date).HasColumnType("datetime");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.PetId).HasColumnName("PetID");

            entity.HasOne(d => d.Pet).WithMany(p => p.MedicalCharts)
                .HasForeignKey(d => d.PetId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("medicalchart_ibfk_1");
        });

        modelBuilder.Entity<Pet>(entity =>
        {
            entity.HasKey(e => e.PetId).HasName("PRIMARY");

            entity.ToTable("Pet");

            entity.HasIndex(e => e.ClientId, "ClientID");

            entity.HasIndex(e => e.RegisterDate, "RegisterDate").IsUnique();

            entity.Property(e => e.PetId).HasColumnName("PetID");
            entity.Property(e => e.AllergyInfo).HasColumnType("text");
            entity.Property(e => e.Breed).HasMaxLength(50);
            entity.Property(e => e.ClientId).HasColumnName("ClientID");
            entity.Property(e => e.Color).HasMaxLength(50);
            entity.Property(e => e.Gender).HasMaxLength(50);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.RegisterDate).HasColumnType("datetime");
            entity.Property(e => e.SpecialNeed).HasColumnType("text");
            entity.Property(e => e.Species).HasMaxLength(50);
            entity.Property(e => e.Weight).HasPrecision(5, 2);

            entity.HasOne(d => d.Client).WithMany(p => p.Pets)
                .HasForeignKey(d => d.ClientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("pet_ibfk_1");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PRIMARY");

            entity.ToTable("Product");

            entity.HasIndex(e => e.DateAdded, "DateAdded").IsUnique();

            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.AnimalType).HasMaxLength(50);
            entity.Property(e => e.Category).HasMaxLength(50);
            entity.Property(e => e.DateAdded).HasColumnType("datetime");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(1000)
                .HasColumnName("ImageURL");
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Price).HasPrecision(10, 2);
        });

        modelBuilder.Entity<Receptionist>(entity =>
        {
            entity.HasKey(e => e.ReceptionistId).HasName("PRIMARY");

            entity.ToTable("Receptionist");

            entity.HasIndex(e => e.ContactNumber, "ContactNumber").IsUnique();

            entity.HasIndex(e => e.Email, "Email").IsUnique();

            entity.HasIndex(e => e.HireDate, "HireDate").IsUnique();

            entity.HasIndex(e => e.PersonalId, "PersonalID").IsUnique();

            entity.HasIndex(e => e.SalaryId, "SalaryID");

            entity.Property(e => e.ReceptionistId).HasColumnName("ReceptionistID");
            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.ContactNumber).HasMaxLength(50);
            entity.Property(e => e.Email).HasMaxLength(200);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.HireDate).HasColumnType("datetime");
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.PersonalId).HasColumnName("PersonalID");
            entity.Property(e => e.Qualification).HasMaxLength(100);
            entity.Property(e => e.SalaryId).HasColumnName("SalaryID");

            entity.HasOne(d => d.Salary).WithMany(p => p.Receptionists)
                .HasForeignKey(d => d.SalaryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("receptionist_ibfk_1");
        });

        modelBuilder.Entity<Salary>(entity =>
        {
            entity.HasKey(e => e.SalaryId).HasName("PRIMARY");

            entity.ToTable("Salary");

            entity.Property(e => e.SalaryId).HasColumnName("SalaryID");
            entity.Property(e => e.BaseSalary).HasPrecision(10, 2);
            entity.Property(e => e.OvertimeRate).HasPrecision(5, 2);
            entity.Property(e => e.PayCycle).HasMaxLength(50);
        });

        modelBuilder.Entity<Service>(entity =>
        {
            entity.HasKey(e => e.ServiceId).HasName("PRIMARY");

            entity.ToTable("Service");

            entity.Property(e => e.ServiceId).HasColumnName("ServiceID");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.Price).HasPrecision(10, 2);
            entity.Property(e => e.ServiceName).HasMaxLength(100);
            entity.Property(e => e.ServiceType).HasMaxLength(50);

            entity.HasMany(d => d.Bills).WithMany(p => p.Services)
                .UsingEntity<Dictionary<string, object>>(
                    "ChargesFor",
                    r => r.HasOne<Bill>().WithMany()
                        .HasForeignKey("BillId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("chargesfor_ibfk_2"),
                    l => l.HasOne<Service>().WithMany()
                        .HasForeignKey("ServiceId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("chargesfor_ibfk_1"),
                    j =>
                    {
                        j.HasKey("ServiceId", "BillId")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("ChargesFor");
                        j.HasIndex(new[] { "BillId" }, "BillID");
                        j.IndexerProperty<int>("ServiceId").HasColumnName("ServiceID");
                        j.IndexerProperty<int>("BillId").HasColumnName("BillID");
                    });
        });

        modelBuilder.Entity<Timetable>(entity =>
        {
            entity.HasKey(e => e.AppointmentId).HasName("PRIMARY");

            entity.ToTable("Timetable");

            entity.HasIndex(e => e.PetId, "PetID");

            entity.HasIndex(e => e.ServiceId, "ServiceID");

            entity.Property(e => e.AppointmentId).HasColumnName("AppointmentID");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.EndTime).HasColumnType("datetime");
            entity.Property(e => e.PetId).HasColumnName("PetID");
            entity.Property(e => e.ServiceId).HasColumnName("ServiceID");
            entity.Property(e => e.StartTime).HasColumnType("datetime");
            entity.Property(e => e.Status).HasMaxLength(50);

            entity.HasOne(d => d.Pet).WithMany(p => p.Timetables)
                .HasForeignKey(d => d.PetId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("timetable_ibfk_1");

            entity.HasOne(d => d.Service).WithMany(p => p.Timetables)
                .HasForeignKey(d => d.ServiceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("timetable_ibfk_2");
        });

        modelBuilder.Entity<UserAuth>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PRIMARY");

            entity.ToTable("UserAuth");

            entity.HasIndex(e => e.ClientId, "ClientID");

            entity.HasIndex(e => e.DoctorId, "DoctorID");

            entity.HasIndex(e => e.GroomerId, "GroomerID");

            entity.HasIndex(e => e.ManagerId, "ManagerID");

            entity.HasIndex(e => e.ReceptionistId, "ReceptionistID");

            entity.HasIndex(e => e.Username, "Username").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.ClientId).HasColumnName("ClientID");
            entity.Property(e => e.DoctorId).HasColumnName("DoctorID");
            entity.Property(e => e.GroomerId).HasColumnName("GroomerID");
            entity.Property(e => e.ManagerId).HasColumnName("ManagerID");
            entity.Property(e => e.Password).HasMaxLength(255);
            entity.Property(e => e.ReceptionistId).HasColumnName("ReceptionistID");
            entity.Property(e => e.Role).HasMaxLength(50);
            entity.Property(e => e.Username).HasMaxLength(100);

            entity.HasOne(d => d.Client).WithMany(p => p.UserAuths)
                .HasForeignKey(d => d.ClientId)
                .HasConstraintName("userauth_ibfk_2");

            entity.HasOne(d => d.Doctor).WithMany(p => p.UserAuths)
                .HasForeignKey(d => d.DoctorId)
                .HasConstraintName("userauth_ibfk_4");

            entity.HasOne(d => d.Groomer).WithMany(p => p.UserAuths)
                .HasForeignKey(d => d.GroomerId)
                .HasConstraintName("userauth_ibfk_3");

            entity.HasOne(d => d.Manager).WithMany(p => p.UserAuths)
                .HasForeignKey(d => d.ManagerId)
                .HasConstraintName("userauth_ibfk_1");

            entity.HasOne(d => d.Receptionist).WithMany(p => p.UserAuths)
                .HasForeignKey(d => d.ReceptionistId)
                .HasConstraintName("userauth_ibfk_5");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
