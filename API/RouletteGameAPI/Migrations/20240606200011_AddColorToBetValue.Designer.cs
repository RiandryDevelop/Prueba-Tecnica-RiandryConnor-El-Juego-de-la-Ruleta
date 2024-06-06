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
    [Migration("20240606200011_AddColorToBetValue")]
    partial class AddColorToBetValue
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("RouletteGameAPI.Models.BetType", b =>
                {
                    b.Property<int>("BetTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BetTypeId"));

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("BetTypeId");

                    b.ToTable("BetType");
                });

            modelBuilder.Entity("RouletteGameAPI.Models.BetValue", b =>
                {
                    b.Property<int>("BetValueId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BetValueId"));

                    b.Property<int>("BetTypeId")
                        .HasColumnType("int");

                    b.Property<string>("Color")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("BetValueId");

                    b.HasIndex("BetTypeId");

                    b.ToTable("BetValue");
                });

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

            modelBuilder.Entity("RouletteGameAPI.Models.BetValue", b =>
                {
                    b.HasOne("RouletteGameAPI.Models.BetType", "BetType")
                        .WithMany("BetValues")
                        .HasForeignKey("BetTypeId")
                        .IsRequired();

                    b.Navigation("BetType");
                });

            modelBuilder.Entity("RouletteGameAPI.Models.BetType", b =>
                {
                    b.Navigation("BetValues");
                });
#pragma warning restore 612, 618
        }
    }
}