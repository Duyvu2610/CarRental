using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarRental.Migrations
{
    /// <inheritdoc />
    public partial class b8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "Paymentdate",
                table: "HoaDons",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "date");

            migrationBuilder.AddColumn<int>(
                name: "IdBooking",
                table: "HoaDons",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_HoaDons_IdBooking",
                table: "HoaDons",
                column: "IdBooking",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_HoaDons_DonDatXes_IdBooking",
                table: "HoaDons",
                column: "IdBooking",
                principalTable: "DonDatXes",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HoaDons_DonDatXes_IdBooking",
                table: "HoaDons");

            migrationBuilder.DropIndex(
                name: "IX_HoaDons_IdBooking",
                table: "HoaDons");

            migrationBuilder.DropColumn(
                name: "IdBooking",
                table: "HoaDons");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Paymentdate",
                table: "HoaDons",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }
    }
}
