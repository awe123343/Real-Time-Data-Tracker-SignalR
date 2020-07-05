using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace CoronaVirusStat.Data
{
    public class ApplicationDbRepository : IApplicationDbRepository
    {
        private readonly ApplicationDbContext _ctx;
        private readonly ILogger<ApplicationDbRepository> _logger;
        public ApplicationDbRepository(ApplicationDbContext ctx, ILogger<ApplicationDbRepository> logger)
        {
            _ctx = ctx;
            _logger = logger;
        }

        public async Task<IEnumerable<InfectionStat>> GetInfectionData()
        {
            try
            {
                _logger.LogInformation("GetInfectionData was called");

                return await _ctx.InfectionStats.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get all infection data: {ex}");
                return null;
            }
        }

        public InfectionStat GetInfectionDataById(int id)
        {
            try
            {
                return _ctx.InfectionStats.Where(record => record.Id == id).FirstOrDefault();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get infection data: {ex} for id: {id}");
                return null;
            }
        }

        public async Task UpdateInfectionData(string country, string state, int newInfectionNo, int newRecoveryNo, int newDeathNo, DateTime updateTime)
        {
            InfectionStat curRecord = await _ctx.InfectionStats.FirstOrDefaultAsync(record => record.Country == country && record.State == state);

            if (curRecord != null)
            {
                curRecord.InfectedNo = newInfectionNo;
                curRecord.RecoveredNo = newRecoveryNo;
                curRecord.DeathNo = newDeathNo;
                curRecord.SignalTime = updateTime;
                await _ctx.SaveChangesAsync();
            }
        }

        public bool SaveAll()
        {
            return _ctx.SaveChanges() > 0;
        }
    }
}
