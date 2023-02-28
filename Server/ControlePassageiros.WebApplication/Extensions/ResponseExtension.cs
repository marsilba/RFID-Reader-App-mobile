using ControlePassageiros.WebApplication.Persistence;
using Microsoft.Extensions.DependencyInjection;

namespace ControlePassageiros.WebApplication
{
    public static class ResponseExtension
    {
        public static void AddResponses(this IServiceCollection services)
        {
            services.AddScoped<AjaxResult<LoginModel>>();
            services.AddScoped<AjaxResult<Passageiro>>();
        }
    }
}