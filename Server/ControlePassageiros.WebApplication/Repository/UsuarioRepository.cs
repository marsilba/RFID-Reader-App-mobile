using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace ControlePassageiros.WebApplication
{
    public class UsuarioRepository
    {
        private readonly MySqlContext _mySqlContext;

        public UsuarioRepository(MySqlContext context)
        {
            _mySqlContext = context;
        }

        
        public Task<Usuario> ObterPorIdAsync(int? id)
        {
            return _mySqlContext.Usuarios
                                .FirstOrDefaultAsync(x => x.UsuarioId == id);
        }

        public Task<Usuario> ObterPorLoginAsync(string login)
        {
            return _mySqlContext.Usuarios
                                .FirstOrDefaultAsync(x => x.Login.ToLower() == login.ToLower());
        }

        public Task<Usuario> ObterUsuarioLoginAsync(string login, string senha)
        {
            return _mySqlContext.Usuarios
                                .FirstOrDefaultAsync(x => x.Login.ToLower() == login.ToLower() &&
                                                          x.Senha == senha);
        }
    }
}