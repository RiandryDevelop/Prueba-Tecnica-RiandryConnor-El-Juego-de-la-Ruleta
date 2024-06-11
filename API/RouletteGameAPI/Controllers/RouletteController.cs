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
            var (generatedNumber, generatedColor) = GenerateRandomNumberAndColor();

            if (player == null)
            {
                return NotFound("Player not found.");
            }

            if (player.Balance < betRequest.Amount)
            {
                return BadRequest("Insufficient balance.");
            }

            decimal prize = 0;

            if (betRequest.Number.HasValue && !string.IsNullOrEmpty(betRequest.Color))
            {
        
                if (generatedNumber == betRequest.Number && generatedColor == betRequest.Color)
                {
                    prize = betRequest.Amount * 3;
                }
            }
            else if (!string.IsNullOrEmpty(betRequest.Type))
            {
        
                bool isEven = generatedNumber % 2 == 0;
                if ((betRequest.Type == "EVEN" && isEven) || (betRequest.Type == "ODD" && !isEven))
                {
                    if (generatedColor == betRequest.Color)
                    {
                        prize = betRequest.Amount;
                    }
                }
            }
            else if (!string.IsNullOrEmpty(betRequest.Color))
            {
        
                if (generatedColor == betRequest.Color)
                {
                    prize = betRequest.Amount * 0.5m;
                }
            }

            if (prize == 0)
            {
                prize = -betRequest.Amount;
            }

            decimal newBalance = player.Balance + prize;

            return Ok(new { prize, generatedNumber, generatedColor, newBalance });
        }
    }
}
