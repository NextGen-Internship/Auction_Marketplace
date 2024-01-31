using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuctionMarketplace.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddPhotoProperyOnCauseEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CauseId1",
                table: "Payments",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Photo",
                table: "Causes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_CauseId1",
                table: "Payments",
                column: "CauseId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Causes_CauseId1",
                table: "Payments",
                column: "CauseId1",
                principalTable: "Causes",
                principalColumn: "CauseId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Causes_CauseId1",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Payments_CauseId1",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "CauseId1",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "Photo",
                table: "Causes");
        }
    }
}
