using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuctionMarketplace.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddPricesAuctionEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "FinalPrice",
                table: "Auctions",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "StartPrice",
                table: "Auctions",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FinalPrice",
                table: "Auctions");

            migrationBuilder.DropColumn(
                name: "StartPrice",
                table: "Auctions");
        }
    }
}
