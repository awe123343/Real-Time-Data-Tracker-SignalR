using Microsoft.EntityFrameworkCore.Migrations;

namespace CoronaVirusStat.Data.Migrations
{
    public partial class AddInfectionStat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "InfectionStats",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Country = table.Column<string>(nullable: true),
                    State = table.Column<string>(nullable: true),
                    InfectedNo = table.Column<int>(nullable: false),
                    RecoveredNo = table.Column<int>(nullable: false),
                    DeathNo = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InfectionStats", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InfectionStats");
        }
    }
}
