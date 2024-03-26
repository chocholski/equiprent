using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Equiprent.Data.Migrations
{
    /// <inheritdoc />
    public partial class Rental_Equipment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "EquipmentId",
                table: "Rentals",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_Rentals_EquipmentId",
                table: "Rentals",
                column: "EquipmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rentals_Equipments_EquipmentId",
                table: "Rentals",
                column: "EquipmentId",
                principalTable: "Equipments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rentals_Equipments_EquipmentId",
                table: "Rentals");

            migrationBuilder.DropIndex(
                name: "IX_Rentals_EquipmentId",
                table: "Rentals");

            migrationBuilder.DropColumn(
                name: "EquipmentId",
                table: "Rentals");
        }
    }
}
