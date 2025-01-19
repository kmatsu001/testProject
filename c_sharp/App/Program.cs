/**
 * Program.cs
 * 
 * This file contains the main entry point for the ASP.NET Core application.
 * It configures the host builder, sets up the web host defaults, and specifies
 * the startup class. Additionally, it sets the URL for the application to run on.
 * 
 * Author: [Your Name]
 * Date: [Date]
 */

using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

public class Program
{
    // アプリケーションのエントリーポイント
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run(); // ホストビルダーを作成し、アプリケーションを実行
    }

    // ホストビルダーを構成するメソッド
    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>(); // Startupクラスを使用して構成
                webBuilder.UseUrls("http://+:5002");  // ここでポート5001を指定
            });
}
