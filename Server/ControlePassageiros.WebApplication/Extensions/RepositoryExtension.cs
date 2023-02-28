using Microsoft.Extensions.DependencyInjection;

namespace ControlePassageiros.WebApplication
{
    public static class RepositoryExtension
    {
        public static void AddRepositorios(this IServiceCollection services)
        {
            services.AddScoped<UsuarioRepository>();
            services.AddScoped<PassageiroRepository>();
        }
    }
}
