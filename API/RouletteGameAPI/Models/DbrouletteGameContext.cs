﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace RouletteGameAPI.Models;

public partial class DbrouletteGameContext : DbContext
{
    public DbrouletteGameContext()
    {
    }

    public DbrouletteGameContext(DbContextOptions<DbrouletteGameContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Player> Players { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(local); DataBase=DBRouletteGame; Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Player>(entity =>
        {
            entity.HasKey(e => e.Name).HasName("PK__Players__737584F79617B0BF");

            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Balance).HasColumnType("decimal(18, 2)");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
