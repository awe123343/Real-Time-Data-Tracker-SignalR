using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using CoronaVirusStat.Models;
using CoronaVirusStat.Data;

namespace CoronaVirusStat.Hubs
{
    public class SignalHub : Hub
    {
        private readonly IApplicationDbRepository _dbRepo;

        public SignalHub(IApplicationDbRepository repo)
        {
            _dbRepo = repo;
        }

        public async Task BroadcastData(InfectionStatInputModel inputModel)
        {
            await _dbRepo.UpdateInfectionData(inputModel.Country, inputModel.State, inputModel.InfectedNo, inputModel.RecoveredNo, inputModel.DeathNo, DateTime.Now);
            var data = await _dbRepo.GetInfectionData();
            await Clients.All.SendAsync("broadcastdata", data);
        }
    }
}
