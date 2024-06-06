namespace RouletteGameAPI.Models
{
    public partial record BetType
    {
        public int BetTypeId { get; init; }
        public string Type { get; init; } = null!;
        public virtual ICollection<BetValue> BetValues { get; init; } = new List<BetValue>();
    }
}
