using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouletteGameAPI.Models;

namespace RouletteGameAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RouletteController(DbrouletteGameContext context) : ControllerBase
    {
        private static readonly Random random = new();
        private readonly DbrouletteGameContext _context = context;

        [HttpPost("initialize")]
        public async Task<ActionResult> InitializePlayer([FromBody] Player player)
        {
            var existingPlayer = await _context.Players.FindAsync(player.Name);

            if (existingPlayer != null)
            {
                existingPlayer.Balance += player.Balance;
                await _context.SaveChangesAsync();
                return Ok(existingPlayer);
            }

            _context.Players.Add(player);
            await _context.SaveChangesAsync();
            return Ok(player);
        }


        [HttpGet("random")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult GetRandomNumberAndColor()
        {
            int number = random.Next(0, 37);
            string color = number == 0 ? "green" : (number % 2 == 0 ? "red" : "black");
            return Ok(new { number, color });
        }

        [HttpPost("bet")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> PlaceBet([FromBody] BetRequest betRequest)
        {
            var player = await _context.Players.FindAsync(betRequest.PlayerName);

            if (player == null)
            {
                return NotFound("Player not found.");
            }

            var betType = await _context.BetTypes.FirstOrDefaultAsync(bt => bt.BetTypeId == betRequest.BetTypeId);
            var betValue = await _context.BetValues.FirstOrDefaultAsync(bv => bv.BetValueId == betRequest.BetValueId && bv.BetTypeId == betRequest.BetTypeId);

            if (betType == null || betValue == null)
            {
                return BadRequest("Invalid bet type or value.");
            }

            if (player.Balance < betRequest.Amount)
            {
                return BadRequest("Insufficient balance.");
            }

            int number = random.Next(0, 37);
            string color = number == 0 ? "green" : (number % 2 == 0 ? "red" : "black");

            decimal prize = 0;

            if (betType.Type == "Color")
            {
                if (color == betValue.Value)
                {
                    prize = betRequest.Amount * 2;
                }
            }
            else if (betType.Type == "Number")
            {
                if (number == Convert.ToInt32(betValue.Value))
                {
                    prize = betRequest.Amount * 36;
                }
            }
            else if (betType.Type == "Even")
            {
                if (number % 2 == 0)
                {
                    prize = betRequest.Amount * 2;
                }
            }
            else if (betType.Type == "Odd")
            {
                if (number % 2 != 0)
                {
                    prize = betRequest.Amount * 2;
                }
            }

            if (prize == 0)
            {
                prize = -betRequest.Amount;
            }

            player.Balance += prize;
            await _context.SaveChangesAsync();

            return Ok(new { prize, number, color, newBalance = player.Balance });
        }
    }
}
