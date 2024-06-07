namespace RouletteGameAPI.Models
{
    public class BetRequest
    {
        public required string PlayerName { get; set; }
        public decimal Amount { get; set; }
        public required string Color { get; set; }
        public required int Value { get; set; }

        public  string? Type { get; set; }


    }
}
