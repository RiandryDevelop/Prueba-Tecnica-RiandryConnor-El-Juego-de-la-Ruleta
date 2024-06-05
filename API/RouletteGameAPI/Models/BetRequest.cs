namespace RouletteGameAPI.Models
{
    public class BetRequest
    {
        public required string PlayerName { get; set; }
        public required string BetType { get; set; }
        public required string BetValue { get; set; }
        public decimal Amount { get; set; }
        public required string Color { get; set; }
    }
}
