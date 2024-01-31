using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Equiprent.Data.Migrations
{
    /// <inheritdoc />
    public partial class Rentals_Categories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RentalCategoriesToLanguages_Languages_LanguageId",
                table: "RentalCategoriesToLanguages");

            migrationBuilder.DropForeignKey(
                name: "FK_RentalCategoriesToLanguages_RentalCategories_RentalCategoryId",
                table: "RentalCategoriesToLanguages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RentalCategoriesToLanguages",
                table: "RentalCategoriesToLanguages");

            migrationBuilder.DropColumn(
                name: "ExpectedStart",
                table: "Rentals");

            migrationBuilder.DropColumn(
                name: "IsComingFromExternalSource",
                table: "Rentals");

            migrationBuilder.RenameTable(
                name: "RentalCategoriesToLanguages",
                newName: "RentalCategoryToLanguages");

            migrationBuilder.RenameIndex(
                name: "IX_RentalCategoriesToLanguages_RentalCategoryId",
                table: "RentalCategoryToLanguages",
                newName: "IX_RentalCategoryToLanguages_RentalCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_RentalCategoriesToLanguages_LanguageId",
                table: "RentalCategoryToLanguages",
                newName: "IX_RentalCategoryToLanguages_LanguageId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Start",
                table: "Rentals",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Rentals",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "End",
                table: "Rentals",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "RenterId",
                table: "Rentals",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.AddColumn<Guid>(
                name: "RentierId",
                table: "Rentals",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RentalCategoryToLanguages",
                table: "RentalCategoryToLanguages",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "LeaseRentals",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeaseRentals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LeaseRentals_Rentals_Id",
                        column: x => x.Id,
                        principalTable: "Rentals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "RentToOwnRentals",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentToOwnRentals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RentToOwnRentals_Rentals_Id",
                        column: x => x.Id,
                        principalTable: "Rentals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "SubleaseRentals",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubleaseRentals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubleaseRentals_Rentals_Id",
                        column: x => x.Id,
                        principalTable: "Rentals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Rentals_CategoryId",
                table: "Rentals",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Rentals_RenterId",
                table: "Rentals",
                column: "RenterId");

            migrationBuilder.CreateIndex(
                name: "IX_Rentals_RentierId",
                table: "Rentals",
                column: "RentierId");

            migrationBuilder.AddForeignKey(
                name: "FK_RentalCategoryToLanguages_Languages_LanguageId",
                table: "RentalCategoryToLanguages",
                column: "LanguageId",
                principalTable: "Languages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RentalCategoryToLanguages_RentalCategories_RentalCategoryId",
                table: "RentalCategoryToLanguages",
                column: "RentalCategoryId",
                principalTable: "RentalCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Rentals_Clients_RenterId",
                table: "Rentals",
                column: "RenterId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Rentals_Clients_RentierId",
                table: "Rentals",
                column: "RentierId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Rentals_RentalCategories_CategoryId",
                table: "Rentals",
                column: "CategoryId",
                principalTable: "RentalCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RentalCategoryToLanguages_Languages_LanguageId",
                table: "RentalCategoryToLanguages");

            migrationBuilder.DropForeignKey(
                name: "FK_RentalCategoryToLanguages_RentalCategories_RentalCategoryId",
                table: "RentalCategoryToLanguages");

            migrationBuilder.DropForeignKey(
                name: "FK_Rentals_Clients_RenterId",
                table: "Rentals");

            migrationBuilder.DropForeignKey(
                name: "FK_Rentals_Clients_RentierId",
                table: "Rentals");

            migrationBuilder.DropForeignKey(
                name: "FK_Rentals_RentalCategories_CategoryId",
                table: "Rentals");

            migrationBuilder.DropTable(
                name: "LeaseRentals");

            migrationBuilder.DropTable(
                name: "RentToOwnRentals");

            migrationBuilder.DropTable(
                name: "SubleaseRentals");

            migrationBuilder.DropIndex(
                name: "IX_Rentals_CategoryId",
                table: "Rentals");

            migrationBuilder.DropIndex(
                name: "IX_Rentals_RenterId",
                table: "Rentals");

            migrationBuilder.DropIndex(
                name: "IX_Rentals_RentierId",
                table: "Rentals");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RentalCategoryToLanguages",
                table: "RentalCategoryToLanguages");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Rentals");

            migrationBuilder.DropColumn(
                name: "End",
                table: "Rentals");

            migrationBuilder.DropColumn(
                name: "RenterId",
                table: "Rentals");

            migrationBuilder.DropColumn(
                name: "RentierId",
                table: "Rentals");

            migrationBuilder.RenameTable(
                name: "RentalCategoryToLanguages",
                newName: "RentalCategoriesToLanguages");

            migrationBuilder.RenameIndex(
                name: "IX_RentalCategoryToLanguages_RentalCategoryId",
                table: "RentalCategoriesToLanguages",
                newName: "IX_RentalCategoriesToLanguages_RentalCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_RentalCategoryToLanguages_LanguageId",
                table: "RentalCategoriesToLanguages",
                newName: "IX_RentalCategoriesToLanguages_LanguageId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Start",
                table: "Rentals",
                type: "datetime(6)",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AddColumn<DateTime>(
                name: "ExpectedStart",
                table: "Rentals",
                type: "datetime(6)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsComingFromExternalSource",
                table: "Rentals",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_RentalCategoriesToLanguages",
                table: "RentalCategoriesToLanguages",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RentalCategoriesToLanguages_Languages_LanguageId",
                table: "RentalCategoriesToLanguages",
                column: "LanguageId",
                principalTable: "Languages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RentalCategoriesToLanguages_RentalCategories_RentalCategoryId",
                table: "RentalCategoriesToLanguages",
                column: "RentalCategoryId",
                principalTable: "RentalCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
