using Microsoft.EntityFrameworkCore;
using BackenAPI.Models;

namespace BackenAPI.Models;

public class DbBancoContext : DbContext
{

    public DbBancoContext(DbContextOptions<DbBancoContext> options) : base(options)
    {
    }

    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Pais> Paises { get; set; } = null!;
    public DbSet<Banco> Bancos { get; set; } = null!;
    public DbSet<Cuenta> Cuentas { get; set; } = null!;
    public virtual DbSet<Proveedores> Proveedores { get; set; }
    public virtual DbSet<Facturas> Facturas { get; set; }




    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);


        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Usuario");

            entity.ToTable("Usuario");

            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Pais>(entity =>
        {
            entity.HasKey(e => e.IdPais);
            entity.Property(e => e.Nombre).HasMaxLength(100);
        });

        modelBuilder.Entity<Banco>(entity =>
        {
            entity.HasKey(e => e.IdBancos);
            entity.Property(e => e.Nombre).HasMaxLength(100);           
        });

        modelBuilder.Entity<Cuenta>(entity =>
        {
            entity.HasKey(e => e.IdCuenta);
            entity.Property(e => e.Nombre).HasMaxLength(100);
            entity.Property(e => e.NroCuenta).HasMaxLength(50);
        });
        modelBuilder.Entity<Proveedores>(entity =>
        {
            entity.HasKey(e => e.id_prov).HasName("PKProveedores");

            entity.ToTable("Proveedores");

            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.Property(e => e.ruc)
                .HasMaxLength(10)
                .IsUnicode(false);

            entity.Property(e => e.correo)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.Property(e => e.telefono);
        });

        modelBuilder.Entity<Facturas>(entity =>
        {
            entity.HasKey(e => e.id_factura).HasName("PKFacturas");
            entity.ToTable("Facturas");
            entity.Property(e => e.nro_factura);
            entity.Property(e => e.total);
            entity.Property(e => e.saldo);
            entity.Property(e => e.aplica);
            entity.Property(e => e.fecha_exp).HasColumnType("date");
            // Para la clave Foranea (Puede estar mal)
            entity.HasOne(f => f.Proveedor)
            .WithMany(p => p.Facturas)
            .HasForeignKey(f => f.id_prov)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_Facturas_Proveedores");
        });
        



}
}

   
