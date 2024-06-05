using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        /// <summary>
        /// Gets a random number and color.
        /// </summary>
        /// <returns>A random number between 0 and 36 and a color (red, black, or green).</returns>
        [HttpGet("random")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult GetRandomNumberAndColor()
        {
            int number = random.Next(0, 37);
            string color = number == 0 ? "green" : (number % 2 == 0 ? "red" : "black");
            return Ok(new { number, color });
        }

        /// <summary>
        /// Calculates the prize based on the user's bet.
        /// </summary>
        /// <param name="betRequest">The bet request.</param>
        /// <returns>The prize, random number, and color.</returns>
        [HttpPost("bet")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> CalculatePrize([FromBody] BetRequest betRequest)
        {
            int number = random.Next(0, 37);
            string color = number == 0 ? "green" : (number % 2 == 0 ? "red" : "black");

            decimal prize = 0;

            if (betRequest.BetType == "color" && betRequest.BetValue.ToLower() == color)
            {
                prize = betRequest.Amount / 2;
            }
            else if (betRequest.BetType == "evenodd" && (number % 2 == (betRequest.BetValue.ToLower() == "even" ? 0 : 1)))
            {
                prize = betRequest.Amount;
            }
            else if (betRequest.BetType == "number" && betRequest.BetValue == number.ToString() && betRequest.Color.ToLower() == color)
            {
                prize = betRequest.Amount * 3;
            }
            else
            {
                prize = -betRequest.Amount;
            }

            var player = await _context.Players.FindAsync(betRequest.PlayerName);

            if (player == null)
            {
                return NotFound();
            }

            player.Balance += prize;
            _context.Entry(player).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { prize, number, color });
        }
    }
}
