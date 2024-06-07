using Microsoft.AspNetCore.Mvc;
using RouletteGameAPI.Models;

namespace RouletteGameAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RouletteController : ControllerBase
    {
        private static readonly Random random = new();
        private readonly DbrouletteGameContext _context;

        public RouletteController(DbrouletteGameContext context)
        {
            _context = context;
        }

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
            var (number, color) = GenerateRandomNumberAndColor();
            return Ok(new { number, color });
        }

        private static (int, string) GenerateRandomNumberAndColor()
        {
            int number = random.Next(0, 37);
            string color = number == 0 ? "green" : (random.Next(0, 21) % 2 == 0 ? "red" : "black");
            return (number, color);
        }

        [HttpPost("bet")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> PlaceBet([FromBody] BetRequest betRequest)
        {
            var player = await _context.Players.FindAsync(betRequest.PlayerName);
            var (number, color) = GenerateRandomNumberAndColor();

            if (player == null)
            {
                return NotFound("Player not found.");
            }

            if (player.Balance < betRequest.Amount)
            {
                return BadRequest("Insufficient balance.");
            }

            decimal prize = 0;

            if (betRequest.Type == "NumberAndColor")
            {
                if (number == betRequest.Value && color == betRequest.Color)
                {
                    prize = betRequest.Amount * 4;
                }
            }
            else if (betRequest.Type == "Number")
            {
                if (number == betRequest.Value)
                {
                    prize = betRequest.Amount * 1.5m;
                }
            }
            else if (betRequest.Type == "Color")
            {
                if (color == betRequest.Color)
                {
                    prize = betRequest.Amount * 1.5m;
                }
            }
            else if (betRequest.Type == "Even")
            {
                if (number % 2 == 0)
                {
                    prize = betRequest.Amount * 2;
                }
            }
            else if (betRequest.Type == "Odd")
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

            decimal newBalance = player.Balance;

            return Ok(new { prize, number, color, newBalance });
        }
    }
}
