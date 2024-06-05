﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RouletteGameAPI.Models;

#nullable disable

namespace RouletteGameAPI.Migrations
{
    [DbContext(typeof(DbrouletteGameContext))]
    [Migration("20240605194305_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("RouletteGameAPI.Models.Player", b =>
                {
                    b.Property<string>("Name")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<decimal>("Balance")
                        .HasColumnType("decimal(18, 2)");

                    b.HasKey("Name")
                        .HasName("PK__Players__737584F79617B0BF");

                    b.ToTable("Players");
                });
#pragma warning restore 612, 618
        }
    }
}
