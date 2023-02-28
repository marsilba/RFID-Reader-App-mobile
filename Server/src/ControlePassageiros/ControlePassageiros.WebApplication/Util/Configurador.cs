using System.IO;

namespace ControlePassageiros.WebApplication
{
    public static class Configurador
    {
        public static string Versao
        {
            get
            {
                return "v1.4.0";
            }
        }

        public static string NomeSistema
        {
            get
            {
                return "Acesso Fácil";
            }
        }

        public static string Empresa
        {
            get
            {
                return "BusOnline";
            }
        }

        public static string SiteEmpresa
        {
            get
            {
                return "https://www.busonline.com.br/";
            }
        }

        public static string DiretorioFotosUsuario
        {
            get
            {
                return Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "usuario");
            }
        }

        public static string FotoUsuarioPadrao
        {
            get
            {
                return Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "usuario", "user-default.png");
            }
        }
    }
}