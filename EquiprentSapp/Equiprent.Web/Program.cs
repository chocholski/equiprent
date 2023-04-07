using Equiprent.Logic.Infrastructure.CQRS;
using Equiprent.Web.Infrastructure;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;
using Serilog;
using Newtonsoft.Json.Serialization;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Equiprent.ApplicationServices.ApplicationUser;
using Equiprent.Data.Services;
using Equiprent.ApplicationServices.Audit;
using Equiprent.ApplicationServices.UserPermissions;
using Equiprent.ApplicationServices.Languageable;
using Equiprent.ApplicationServices.Createable;

namespace EquiprentAPI.Web
{
    public class Program
    {
        public static readonly string APP_NAME = "Equiprent";
        internal static readonly string CORS_POLICY_NAME = "AllowAll";
        internal static readonly string CONFIG_ROOT_PATH = "wwwroot";

        public static void Main(string[] args)
        {
            CurrentDirectoryHelper.SetCurrentDirectory();

            var builder = GetBuilder(args);
            var app = builder.Build();

            app.Configure();
            app.Run();
        }

        private static WebApplicationBuilder GetBuilder(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Host.UseSerilog((context, config) =>
            {
                config.ReadFrom.Configuration(context.Configuration);
            });

            builder.Configuration
                .SetBasePath(builder.Environment.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{Environment.MachineName}.json", optional: true)
                .AddEnvironmentVariables();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: CORS_POLICY_NAME, policyBuilder =>
                {
                    policyBuilder.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            builder.Services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = CONFIG_ROOT_PATH;
            });

            builder.Services.AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                });

            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options
                    .UseLazyLoadingProxies()
                    .UseMySql(
                        builder.Configuration.GetConnectionString("DefaultConnection"),
                        new MariaDbServerVersion(new Version(major: 10, minor: 3, build: 2)),
                        optionsBuilder =>
                        {
                            optionsBuilder.MigrationsAssembly("Equiprent.Data");
                            optionsBuilder.EnableRetryOnFailure(maxRetryCount: 10, maxRetryDelay: TimeSpan.FromSeconds(30), errorNumbersToAdd: null);
                        })
                    );

            builder.Services.AddSwaggerGen(config =>
            {
                config.SwaggerDoc(name: "v1", new OpenApiInfo { Title = $"{Program.APP_NAME} Api", Version = "v1" });
                config.AddSecurityDefinition(name: "Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme."
                });

                config.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });

                config.CustomSchemaIds(schemaIdSelector: type => type.FullName);
            });

            builder.Services.AddAuthentication(defaultScheme: JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidIssuer = builder.Configuration["Auth:Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Auth:Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Auth:Jwt:Key"]!)),
                        ClockSkew = TimeSpan.Zero,
                        // security switches
                        RequireExpirationTime = true,
                        ValidateIssuer = true,
                        ValidateIssuerSigningKey = true,
                        ValidateAudience = true
                    };
                });

            builder.Services.AddSingleton(builder.Configuration);
            builder.Services.Add(new ServiceDescriptor(typeof(IPasswordHasher), typeof(PasswordHasher), ServiceLifetime.Transient));
            builder.Services.Add(new ServiceDescriptor(typeof(IHttpContextAccessor), typeof(HttpContextAccessor), ServiceLifetime.Singleton));
            builder.Services.Add(new ServiceDescriptor(typeof(IAuditMemberTranslatorService), typeof(AuditMemberTranslatorService), ServiceLifetime.Transient));
            builder.Services.Add(new ServiceDescriptor(typeof(IKeyAtAuditValueService), typeof(KeyAtAuditValueService), ServiceLifetime.Transient));
            builder.Services.Add(new ServiceDescriptor(typeof(IUserService), typeof(UserService), ServiceLifetime.Transient));
            builder.Services.Add(new ServiceDescriptor(typeof(IUserPermissionsService), typeof(UserPermissionsService), ServiceLifetime.Transient));
            builder.Services.Add(new ServiceDescriptor(typeof(ICreateableService), typeof(CreateableService), ServiceLifetime.Transient));
            builder.Services.Add(new ServiceDescriptor(typeof(ILanguageableService), typeof(LanguageableService), ServiceLifetime.Transient));
            builder.Services.AddCommandQueryHandler(typeof(ICommandHandler<>), AppDomain.CurrentDomain.Load("Equiprent.Logic"));
            builder.Services.AddCommandQueryHandler(typeof(ICommandHandler<,>), AppDomain.CurrentDomain.Load("Equiprent.Logic"));
            builder.Services.AddCommandQueryHandler(typeof(IQueryHandler<,>), AppDomain.CurrentDomain.Load("Equiprent.Logic"));

            builder.Services.AddScoped<ICommandDispatcher, CommandDispatcher>();
            builder.Services.AddScoped<IQueryDispatcher, QueryDispatcher>();

            builder.Services.Add(new ServiceDescriptor(typeof(ICommandDispatcher), typeof(CommandDispatcher), ServiceLifetime.Scoped));
            builder.Services.Add(new ServiceDescriptor(typeof(IQueryDispatcher), typeof(QueryDispatcher), ServiceLifetime.Scoped));

            builder.Services.Add(new ServiceDescriptor(typeof(IAuthorizationPolicyProvider), typeof(PermissionPolicyProvider), ServiceLifetime.Singleton));
            builder.Services.Add(new ServiceDescriptor(typeof(IAuthorizationHandler), typeof(PermissionAuthorizationHandler), ServiceLifetime.Singleton));

            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

            return builder;
        }
    }

    internal static class Extensions
    {
        internal static void Configure(this WebApplication app)
        {
            app.UseSwagger();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwaggerUI(config => {
                    config.SwaggerEndpoint("/swagger/v1/swagger.json", $"{Program.APP_NAME} API V1");
                    config.RoutePrefix = string.Empty;
                });

                app.UseDeveloperExceptionPage();
            }
            else if (app.Environment.IsProduction())
            {
                app.UseHttpsRedirection();
            }

            app.UseSpaStaticFiles();
            app.UseRouting();
            app.UseCors(Program.CORS_POLICY_NAME);
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();

            app.MigrateDatabase();

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = Program.CONFIG_ROOT_PATH;

                if (app.Environment.IsDevelopment())
                {
                    spa.Options.StartupTimeout = TimeSpan.FromSeconds(30);
                }
            });
        }

        internal static void MigrateDatabase(this WebApplication app)
        {
            var serviceScopeFactory = app.Services.GetService<IServiceScopeFactory>();

            if (serviceScopeFactory is not null)
            {
                using var serviceScope = serviceScopeFactory.CreateScope();
                var context = serviceScope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                context.Database.Migrate();
            }
        }
    }
}