using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoronaVirusStat.Data
{
    public class InfectionStat
    {
        public int Id { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public int InfectedNo { get; set; }
        public int RecoveredNo { get; set; }
        public int DeathNo { get; set; }
        public DateTime SignalTime { get; set; }
    }
}
