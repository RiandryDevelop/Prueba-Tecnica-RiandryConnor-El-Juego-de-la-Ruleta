namespace RouletteGameAPI.Models
{
    public partial class BetValue
    {
        public int BetValueId { get; set; }
        public string Value { get; set; } = null!;
        public int BetTypeId { get; set; }
        public string? Color { get; set; } 

        public virtual BetType BetType { get; set; } = null!;
    }
}
