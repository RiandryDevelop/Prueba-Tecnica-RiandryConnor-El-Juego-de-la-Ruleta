﻿using System;
using System.Collections.Generic;

namespace RouletteGameAPI.Models;

public partial class Player
{
    public string Name { get; set; } = null!;

    public decimal Balance { get; set; }
}
