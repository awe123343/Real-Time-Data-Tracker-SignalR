using CoronaVirusStat.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoronaVirusStat.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        public DbSet<InfectionStat> InfectionStats { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<InfectionStat>()
                .Property(b => b.InfectedNo)
                .IsRequired();
            modelBuilder.Entity<InfectionStat>()
                .Property(b => b.RecoveredNo)
                .IsRequired();
            modelBuilder.Entity<InfectionStat>()
                .Property(b => b.DeathNo)
                .IsRequired();
        }
    }
}
