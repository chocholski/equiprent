﻿// <auto-generated />
using System;
using Equiprent.Data.DbContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Equiprent.Data.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20231106210513_RentalCategoriesToLanguages")]
    partial class RentalCategoriesToLanguages
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Equiprent.Data.CustomQueryTypes.AuditListQueryModel", b =>
                {
                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("FieldName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("NewValue")
                        .HasColumnType("longtext");

                    b.Property<string>("OldValue")
                        .HasColumnType("longtext");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.ToTable("AuditListItems");
                });

            modelBuilder.Entity("Equiprent.Entities.Application.Audit", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid?>("CreatedById")
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("FieldName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("KeyValue")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("NewValue")
                        .HasColumnType("longtext");

                    b.Property<string>("OldValue")
                        .HasColumnType("longtext");

                    b.Property<string>("TableName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.ToTable("Audits", (string)null);
                });

            modelBuilder.Entity("Equiprent.Entities.Application.ConfigurationKey", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("ConfigurationKeys", (string)null);
                });

            modelBuilder.Entity("Equiprent.Entities.Application.Language", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("varchar(10)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.HasKey("Id");

                    b.ToTable("Languages");
                });

            modelBuilder.Entity("Equiprent.Entities.Application.RefreshToken.RefreshToken", b =>
                {
                    b.Property<Guid>("Token")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Invalidated")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsTokenRefreshRequired")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("JwtId")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("Used")
                        .HasColumnType("tinyint(1)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("char(36)");

                    b.HasKey("Token");

                    b.HasIndex("UserId");

                    b.ToTable("RefreshTokens");
                });

            modelBuilder.Entity("Equiprent.Entities.Application.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)")
                        .HasAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

                    b.Property<Guid?>("ChangePasswordToken")
                        .HasColumnType("char(36)");

                    b.Property<Guid?>("CreatedById")
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.Property<bool>("HasDarkModeThemeSelected")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("LanguageId")
                        .HasColumnType("int");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<int>("UserRoleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.HasIndex("LanguageId");

                    b.HasIndex("UserRoleId");

                    b.ToTable("Users", (string)null);
                });

            modelBuilder.Entity("Equiprent.Entities.Application.UserPermission", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("SystemName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.HasKey("Id");

                    b.ToTable("UserPermissions");
                });

            modelBuilder.Entity("Equiprent.Entities.Application.UserPermissionToRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("UserPermissionId")
                        .HasColumnType("int");

                    b.Property<int>("UserRoleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserPermissionId");

                    b.HasIndex("UserRoleId");

                    b.ToTable("UserPermissionToRoles");
                });

            modelBuilder.Entity("Equiprent.Entities.Application.UserPermissionToUserPermission", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("LinkedUserPermissionId")
                        .HasColumnType("int");

                    b.Property<int>("UserPermissionId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LinkedUserPermissionId");

                    b.HasIndex("UserPermissionId");

                    b.ToTable("UserPermissionToUserPermissions");
                });

            modelBuilder.Entity("Equiprent.Entities.Application.UserRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<Guid?>("CreatedById")
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById")
                        .IsUnique();

                    b.ToTable("UserRoles");
                });

            modelBuilder.Entity("Equiprent.Entities.Application.UserRoleToLanguage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("LanguageId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<int>("UserRoleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LanguageId");

                    b.HasIndex("UserRoleId");

                    b.ToTable("UserRolesToLanguages");
                });

            modelBuilder.Entity("Equiprent.Entities.Business.Rental.Rental", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid?>("CreatedById")
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("ExpectedStart")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("IsComingFromExternalSource")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Number")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("Start")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid?>("UserResponsibleForHandlingId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("UserResponsibleForHandlingId");

                    b.ToTable("Rentals");
                });

            modelBuilder.Entity("Equiprent.Entities.Business.RentalCategories.RentalCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("Id");

                    b.ToTable("RentalCategories");
                });

            modelBuilder.Entity("Equiprent.Entities.Business.RentalCategoryToLanguage.RentalCategoryToLanguage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("LanguageId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<int>("RentalCategoryId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LanguageId");

                    b.HasIndex("RentalCategoryId");

                    b.ToTable("RentalCategoriesToLanguages");
                });

            modelBuilder.Entity("Equiprent.Entities.Application.Audit", b =>
                {
                    b.HasOne("Equiprent.Entities.Application.User", "CreatedByUser")
                        .WithMany()
                        .HasForeignKey("CreatedById")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("CreatedByUser");
                });

            modelBuilder.Entity("Equiprent.Entities.Application.RefreshToken.RefreshToken", b =>
                {
                    b.HasOne("Equiprent.Entities.Application.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Equiprent.Entities.Application.User", b =>
                {
                    b.HasOne("Equiprent.Entities.Application.User", "CreatedByUser")
                        .WithMany()
                        .HasForeignKey("CreatedById")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("Equiprent.Entities.Application.Language", "Language")
                        .WithMany()
                        .HasForeignKey("LanguageId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Equiprent.Entities.Application.UserRole", "UserRole")
                        .WithMany()
                        .HasForeignKey("UserRoleId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("CreatedByUser");

                    b.Navigation("Language");

                    b.Navigation("UserRole");
                });

            modelBuilder.Entity("Equiprent.Entities.Application.UserPermissionToRole", b =>
                {
                    b.HasOne("Equiprent.Entities.Application.UserPermission", "UserPermission")
                        .WithMany()
                        .HasForeignKey("UserPermissionId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Equiprent.Entities.Application.UserRole", "UserRole")
                        .WithMany("UserPermissionToRoles")
                        .HasForeignKey("UserRoleId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("UserPermission");

                    b.Navigation("UserRole");
                });

            modelBuilder.Entity("Equiprent.Entities.Application.UserPermissionToUserPermission", b =>
                {
                    b.HasOne("Equiprent.Entities.Application.UserPermission", "LinkedUserPermission")
                        .WithMany()
                        .HasForeignKey("LinkedUserPermissionId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Equiprent.Entities.Application.UserPermission", "UserPermission")
                        .WithMany()
                        .HasForeignKey("UserPermissionId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("LinkedUserPermission");

                    b.Navigation("UserPermission");
                });

            modelBuilder.Entity("Equiprent.Entities.Application.UserRole", b =>
                {
                    b.HasOne("Equiprent.Entities.Application.User", "CreatedByUser")
                        .WithOne()
                        .HasForeignKey("Equiprent.Entities.Application.UserRole", "CreatedById")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("CreatedByUser");
                });

            modelBuilder.Entity("Equiprent.Entities.Application.UserRoleToLanguage", b =>
                {
                    b.HasOne("Equiprent.Entities.Application.Language", "Language")
                        .WithMany()
                        .HasForeignKey("LanguageId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Equiprent.Entities.Application.UserRole", "UserRole")
                        .WithMany()
                        .HasForeignKey("UserRoleId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Language");

                    b.Navigation("UserRole");
                });

            modelBuilder.Entity("Equiprent.Entities.Business.Rental.Rental", b =>
                {
                    b.HasOne("Equiprent.Entities.Application.User", "UserResponsibleForHandling")
                        .WithMany()
                        .HasForeignKey("UserResponsibleForHandlingId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("UserResponsibleForHandling");
                });

            modelBuilder.Entity("Equiprent.Entities.Business.RentalCategoryToLanguage.RentalCategoryToLanguage", b =>
                {
                    b.HasOne("Equiprent.Entities.Application.Language", "Language")
                        .WithMany()
                        .HasForeignKey("LanguageId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Equiprent.Entities.Business.RentalCategories.RentalCategory", "RentalCategory")
                        .WithMany()
                        .HasForeignKey("RentalCategoryId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Language");

                    b.Navigation("RentalCategory");
                });

            modelBuilder.Entity("Equiprent.Entities.Application.UserRole", b =>
                {
                    b.Navigation("UserPermissionToRoles");
                });
#pragma warning restore 612, 618
        }
    }
}
