using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Equiprent.Data.Migrations
{
    /// <inheritdoc />
    public partial class EquipmentPhoto_Createable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CreatedById",
                table: "EquipmentPhotos",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "EquipmentPhotos",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_EquipmentPhotos_CreatedById",
                table: "EquipmentPhotos",
                column: "CreatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_EquipmentPhotos_Users_CreatedById",
                table: "EquipmentPhotos",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EquipmentPhotos_Users_CreatedById",
                table: "EquipmentPhotos");

            migrationBuilder.DropIndex(
                name: "IX_EquipmentPhotos_CreatedById",
                table: "EquipmentPhotos");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "EquipmentPhotos");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "EquipmentPhotos");
        }
    }
}
