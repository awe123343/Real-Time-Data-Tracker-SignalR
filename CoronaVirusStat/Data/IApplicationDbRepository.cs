using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CoronaVirusStat.Data
{
    public interface IApplicationDbRepository
    {
        Task<IEnumerable<InfectionStat>> GetInfectionData();
        InfectionStat GetInfectionDataById(int id);
        Task UpdateInfectionData(string country, string state, int newInfectionNo, int newRecoveryNo, int newDeathNo, DateTime updateTime);
        bool SaveAll();
    }
}
