namespace RouletteGameAPI.Models
{
    public partial class BetType
    {
        public int BetTypeId { get; set; }
        public string Type { get; set; } = null!;
        public virtual ICollection<BetValue> BetValues { get; set; } = new List<BetValue>();
    }
}
