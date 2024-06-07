namespace RouletteGameAPI.Models
{
    public record BetRequest
    {
<<<<<<< HEAD
        public required string PlayerName { get; init; }
        public int BetTypeId { get; init; }
        public int BetValueId { get; init; }
        public decimal Amount { get; init; }
        public required string Color { get; init; }
=======
        public required string PlayerName { get; set; }
        public decimal Amount { get; set; }
        public required string Color { get; set; }
        public required int Value { get; set; }

        public  string? Type { get; set; }


>>>>>>> develop
    }
}
