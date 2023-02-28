using ControlePassageiros.WebApplication.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ControlePassageiros.WebApplication
{
    public class MySqlContext : DbContext
    {
        public MySqlContext(DbContextOptions<MySqlContext> options) 
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {   
            modelBuilder.Entity<Usuario>().ToTable("usuario");
            modelBuilder.Entity<Passageiro>().ToTable("passageiro");
        }
            

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Passageiro> Passageiros { get; set; }
    }
}