using ControlePassageiros.WebApplication.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControlePassageiros.WebApplication
{
    public class PassageiroRepository
    {
        private readonly MySqlContext _mySqlContext;

        public PassageiroRepository(MySqlContext context)
        {
            _mySqlContext = context;
        }

        public Task<List<Passageiro>> ListarTodosAsync()
        {
            return _mySqlContext.Passageiros
                                .OrderBy(x => x.Nome)
                                .ToListAsync();
        }

        public Task<List<Passageiro>> ListarTodosAlteradosAsync()
        {
            return _mySqlContext.Passageiros
                                .Where(x => x.Alterado)
                                .ToListAsync();
        }

        public async Task RemoverFlagAlteradoAsync()
        {
            List<Passageiro> passageirosAlterados = await ListarTodosAlteradosAsync();

            foreach (var passageiro in passageirosAlterados)
                passageiro.Alterado = false;

            await _mySqlContext.SaveChangesAsync();
        }



        public Task<Passageiro> ObterPorIdAsync(int? id)
        {
            return _mySqlContext.Passageiros
                                .FirstOrDefaultAsync(x => x.PassageiroId == id);
        }


        public Task<Passageiro> ObterPorRfidAsync(string rfid)
        {
            return _mySqlContext.Passageiros
                                .FirstOrDefaultAsync(x => x.RfId.ToLower() == rfid.ToLower());
        }


        public async Task AtualizarStatusAlteracaoAsync(bool status)
        {
            List<Passageiro> passageirosAlterados = await _mySqlContext.Passageiros
                                                                       .ToListAsync();

            foreach (var passageiro in passageirosAlterados)
            {
                passageiro.Alterado = status;
                await AlterarAsync(passageiro);
            }
                

            await _mySqlContext.SaveChangesAsync();
        }




        public async Task IncluirAsync(Passageiro model)
        {
            await _mySqlContext.AddAsync(model);
            await _mySqlContext.SaveChangesAsync();
        }

        public async Task AlterarAsync(Passageiro model)
        {
            _mySqlContext.Entry(model).State = EntityState.Modified;
            await _mySqlContext.SaveChangesAsync();
        }


        public async Task BloquearPorRfidAsync(string rfid)
        {
            Passageiro passageiro = await ObterPorRfidAsync(rfid);
            passageiro.Situacao = false;
            passageiro.Alterado = true;

            _mySqlContext.Entry(passageiro).State = EntityState.Modified;
            await _mySqlContext.SaveChangesAsync();
        }
    }
}