using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
                webBuilder.ConfigureServices(services =>
                {
                    // SampleService と SampleTableRepository を登録
                    services.AddScoped<TestProject.Services.SampleService>();
                    services.AddScoped<TestProject.Repository.SampleTableRepository>();
                });
            });
}