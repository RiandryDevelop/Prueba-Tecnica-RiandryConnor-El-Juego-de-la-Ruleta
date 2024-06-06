namespace RouletteGameAPI.Models
{
    public partial record BetValue
    {
        public int BetValueId { get; init; }
        public string Value { get; init; } = null!;
        public int BetTypeId { get; init; }
        public string? Color { get; init; }

        public virtual BetType BetType { get; init; } = null!;
    }
}
