﻿namespace RouletteGameAPI.Models
{
    public class BetRequest
    {
        public required string PlayerName { get; set; }
        public decimal Amount { get; set; }
        public required string Color { get; set; }
        public  int? Number { get; set; }
        public  string? Type { get; set; }
    }
}
