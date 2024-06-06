using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RouletteGameAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddColorToBetValue : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BetType",
                columns: table => new
                {
                    BetTypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BetType", x => x.BetTypeId);
                });

            migrationBuilder.CreateTable(
                name: "BetValue",
                columns: table => new
                {
                    BetValueId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BetTypeId = table.Column<int>(type: "int", nullable: false),
                    Color = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BetValue", x => x.BetValueId);
                    table.ForeignKey(
                        name: "FK_BetValue_BetType_BetTypeId",
                        column: x => x.BetTypeId,
                        principalTable: "BetType",
                        principalColumn: "BetTypeId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_BetValue_BetTypeId",
                table: "BetValue",
                column: "BetTypeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BetValue");

            migrationBuilder.DropTable(
                name: "BetType");
        }
    }
}
