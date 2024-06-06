namespace RouletteGameAPI.Models
{
    public record BetRequest
    {
        public required string PlayerName { get; init; }
        public int BetTypeId { get; init; }
        public int BetValueId { get; init; }
        public decimal Amount { get; init; }
        public required string Color { get; init; }
    }
}
