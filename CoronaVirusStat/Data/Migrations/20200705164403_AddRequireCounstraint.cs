using Microsoft.EntityFrameworkCore.Migrations;

namespace CoronaVirusStat.Data.Migrations
{
    public partial class AddRequireCounstraint : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_InfectionStats_Country_State",
                table: "InfectionStats");

            migrationBuilder.AlterColumn<string>(
                name: "State",
                table: "InfectionStats",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Country",
                table: "InfectionStats",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_InfectionStats_Country_State",
                table: "InfectionStats",
                columns: new[] { "Country", "State" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_InfectionStats_Country_State",
                table: "InfectionStats");

            migrationBuilder.AlterColumn<string>(
                name: "State",
                table: "InfectionStats",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Country",
                table: "InfectionStats",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.CreateIndex(
                name: "IX_InfectionStats_Country_State",
                table: "InfectionStats",
                columns: new[] { "Country", "State" },
                unique: true,
                filter: "[Country] IS NOT NULL AND [State] IS NOT NULL");
        }
    }
}
