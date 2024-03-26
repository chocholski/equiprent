using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Equiprent.Data.Migrations
{
    /// <inheritdoc />
    public partial class Sublettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Sublettings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    PricePerDay = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    RentalId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    RentierId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    CreatedById = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Start = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    End = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sublettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sublettings_Clients_RentierId",
                        column: x => x.RentierId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Sublettings_SubleaseRentals_RentalId",
                        column: x => x.RentalId,
                        principalTable: "SubleaseRentals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Sublettings_RentalId",
                table: "Sublettings",
                column: "RentalId");

            migrationBuilder.CreateIndex(
                name: "IX_Sublettings_RentierId",
                table: "Sublettings",
                column: "RentierId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Sublettings");
        }
    }
}
