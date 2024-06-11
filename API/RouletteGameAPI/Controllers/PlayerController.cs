using RouletteGameAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace RouletteGameAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(DbrouletteGameContext context) : ControllerBase
    {
        private readonly DbrouletteGameContext _context = context;

        [HttpPost("updateBalance")]
        public async Task<ActionResult> UpdateBalance([FromBody] Player player)
        {
            var existingUser = await _context.Players.FindAsync(player.Name);

            if (existingUser == null)
            {
                _context.Players.Add(player);
            }
            else
            {
                existingUser.Balance += player.Balance;
                _context.Entry(existingUser).State = EntityState.Modified;
            }

            await _context.SaveChangesAsync();
            return Ok(player);
        }

        [HttpGet("{name}")]
        public async Task<ActionResult<decimal>> GetUserBalance(string name)
        {
            var user = await _context.Players.FindAsync(name);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user.Balance);
        }
    }
}
