using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;
using CoronaVirusStat.Hubs;
using CoronaVirusStat.Models;
using CoronaVirusStat.Data;
using CoronaVirusStat.Utils;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CoronaVirusStat.Controllers
{
    // [Authorize]
    [ApiController]
    [Route("api/v1/signals")]
    public class SignalController : ControllerBase
    {
        private readonly IHubContext<SignalHub> _hubContext;
        private readonly IApplicationDbRepository _dbRepo;

        public SignalController(IHubContext<SignalHub> hub, IApplicationDbRepository repo)
        {
            _hubContext = hub;
            _dbRepo = repo;
        }

        public async Task<IActionResult> Get()
        {
            // var timerManager = new TimerManager(async () => { 
            //     var data = await _dbRepo.GetInfectionData();
            //     await _hubContext.Clients.All.SendAsync("transferData", data); 
            // });
            var data = await _dbRepo.GetInfectionData();
            await _hubContext.Clients.All.SendAsync("transferData", data);

            return Ok(new { Message = "Request Completed" });
        }
    }
}
