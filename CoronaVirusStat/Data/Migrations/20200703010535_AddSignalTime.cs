using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CoronaVirusStat.Data.Migrations
{
    public partial class AddSignalTime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "SignalTime",
                table: "InfectionStats",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SignalTime",
                table: "InfectionStats");
        }
    }
}
