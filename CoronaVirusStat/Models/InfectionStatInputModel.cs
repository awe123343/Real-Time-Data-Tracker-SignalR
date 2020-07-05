using System;
namespace CoronaVirusStat.Models
{
    public class InfectionStatInputModel
    {
        public string Country { get; set; }
        public string State { get; set; }
        public int InfectedNo { get; set; }
        public int RecoveredNo { get; set; }
        public int DeathNo { get; set; }
    }
}
