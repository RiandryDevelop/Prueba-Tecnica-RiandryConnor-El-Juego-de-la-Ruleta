using Microsoft.EntityFrameworkCore;


namespace RouletteGameAPI.Models
{
    public partial class DbrouletteGameContext : DbContext
    {
        public DbrouletteGameContext()
        {
        }

        public DbrouletteGameContext(DbContextOptions<DbrouletteGameContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Player> Players { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var configuration = new ConfigurationBuilder()
                    .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                    .AddJsonFile("appsettings.json")
                    .Build();

                var connectionString = configuration.GetConnectionString("DefaultConnection");
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Player>(entity =>
            {
                entity.HasKey(e => e.Name).HasName("PK__Players__737584F79617B0BF");

                entity.Property(e => e.Name).HasMaxLength(100);
                entity.Property(e => e.Balance).HasColumnType("decimal(18, 2)");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
