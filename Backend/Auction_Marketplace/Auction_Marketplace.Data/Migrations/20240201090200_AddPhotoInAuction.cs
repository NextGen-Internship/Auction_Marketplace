using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuctionMarketplace.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddPhotoInAuction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Photo",
                table: "Auctions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Photo",
                table: "Auctions");
        }
    }
}
