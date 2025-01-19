/**
 * Startup.cs
 * 
 * This file contains the Startup class for configuring the ASP.NET Core application.
 * It includes middleware for handling CORS, registering services, and setting up 
 * request handling via controllers.
 * 
 * Author: kazuki.matsuoka
 * Date: 2025/1/19
 */

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TestProject.Models;
using TestProject.Repository;

public class Startup
{
    /// <summary>
    /// IConfigurationインスタンスを保持するプロパティ
    /// </summary>
    public IConfiguration Configuration { get; }

    /// <summary>
    /// コンストラクタでIConfigurationインスタンスを受け取る
    /// </summary>
    /// <param name="configuration">IConfigurationインスタンス</param>
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    /// <summary>
    /// アプリケーションに必要なサービスを登録するメソッド
    /// </summary>
    /// <param name="services">IServiceCollectionインスタンス</param>
    public void ConfigureServices(IServiceCollection services)
    {
        // 環境変数からCORSの許可されたオリジンを取得し、nullの場合はデフォルト値を設定
        var allowedOrigins = Configuration["AllowedOrigins"] ?? "http://localhost:3000";

        // CORSポリシーを追加
        services.AddCors(options =>
        {
            options.AddPolicy("AllowSpecificOrigin",
                builder => builder.WithOrigins(allowedOrigins)
                                  .AllowAnyHeader()
                                  .AllowAnyMethod());
        });

        // DbContextを登録
        services.AddDbContext<MyDbContext>(options =>
            options.UseMySql(
                Configuration.GetConnectionString("DefaultConnection"),
                new MySqlServerVersion(new Version(5, 7, 0))));

        // リポジトリを登録
        services.AddScoped<TestRepository>();

        // 他のサービスの設定
        services.AddControllers();
    }

    /// <summary>
    /// HTTPリクエストパイプラインを構成するメソッド
    /// </summary>
    /// <param name="app">IApplicationBuilderインスタンス</param>
    /// <param name="env">IWebHostEnvironmentインスタンス</param>
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        // 開発環境の場合、開発者例外ページを使用
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        // ルーティングを使用
        app.UseRouting();

        // CORSを有効に
        app.UseCors("AllowSpecificOrigin");

        // エンドポイントをマッピング
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
