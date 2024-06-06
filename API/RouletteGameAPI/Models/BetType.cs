using System.Collections.Generic;

namespace RouletteGameAPI.Models
{
    public partial class BetType
    {
        public BetType()
        {
            BetValues = new HashSet<BetValue>();
        }

        public int BetTypeId { get; set; }
        public string Type { get; set; } = null!;

        public virtual ICollection<BetValue> BetValues { get; set; }
    }
}
