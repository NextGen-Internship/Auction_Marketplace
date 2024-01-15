using System;
using System.Text;
using Auction_Marketplace.Data;
using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Services.Abstract;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("ConnectionString");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddIdentity<User, Role>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();
builder.Services.AddSqlServer<ApplicationDbContext>(connectionString);
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(jwt =>
{
    var key = Encoding.ASCII.GetBytes(builder.Configuration["JwtConfig:Secret"]!);
    jwt.SaveToken = true;
    jwt.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidIssuer = builder.Configuration["JwtConfig:Issuer"],
        ValidAudience = builder.Configuration["JwtConfig:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidateLifetime = true
    };
});


builder.Services.RegisterDbContext(builder.Configuration, builder.Environment)
                           .RegisterAuthentication(builder.Configuration)
                           .ConfigureServices();

builder.Services.AddAuthorization();
// Added policy for the React app
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder.WithOrigins("http://localhost:5173") //ToDo: Update with the actual URL of our React app
        .AllowAnyHeader()
        .AllowAnyMethod());
});
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();