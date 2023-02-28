using System.IO;

namespace ControlePassageiros.WebApplication
{
    public static class UsuarioLogado
    {
        public static int? Id { get; set; }

        public static string Nome { get; set; }

        public static string Login { get; set; }

        public static string Perfil
        {
            get
            {
                return "Administrador";
            }
        }

        public static string Foto { get; set; }

        public static void Criar(Usuario usuario)
        {
            Id = usuario.UsuarioId;
            Nome = usuario.Nome;
            Login = usuario.Login;
            Foto = usuario.Foto;
        }
    }
}