namespace RouletteGameAPI.Models
{
    public class BetRequest
    {
        public required string PlayerName { get; set; }
        public int BetTypeId { get; set; }
        public int BetValueId { get; set; }
        public decimal Amount { get; set; }
        public required string Color { get; set; } 
    }
}
