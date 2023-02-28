using ControlePassageiros.WebApplication.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace ControlePassageiros.WebApplication.Controllers
{
    [AllowAnonymous]
    public class PassageirosController : Controller
    {
        private readonly PassageiroRepository _passageiroRepository;
        private readonly AjaxResult<Passageiro> _ajaxResult;

        public PassageirosController(PassageiroRepository passageiroRepository, AjaxResult<Passageiro> ajaxResult)
        {
            _passageiroRepository = passageiroRepository;
            _ajaxResult = ajaxResult;
        }


        /// <summary>
        /// RETORNA TODOS OS REGISTROS MARCADOS COMO ATUALIZADOS
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<JsonResult> ObterAtualizacoesAsync()
        {
            List<Passageiro> passageiros = await _passageiroRepository.ListarTodosAlteradosAsync();
            List<PassageiroAppResponse> response = passageiros.Select(x => new PassageiroAppResponse
            {
                Ativo = x.Situacao,
                Cartao = x.RfId,
                Nome = x.Nome,
                Condominio = x.Condominio,
                Foto = x.Foto                
            }).ToList();


            return Json(response);
        }


        /// <summary>
        /// CONFIRMACAO DE QUE A BASE DO MARCIO FOI ATUALIZADA E
        /// ATUALIZA O FLAG_ALTERADO PARA FALSE
        /// </summary>
        /// <returns>true</returns>        
        [HttpPost]
        public async Task<JsonResult> ConfirmarAtualizacaoAsync()
        {
            await _passageiroRepository.RemoverFlagAlteradoAsync();
            return Json(true);
        }


        /// <summary>
        /// ALTERA TODOS OS REGISTROS PARA FLAG_ALTERADO 
        /// </summary>
        /// <returns>true</returns>
        [HttpPost]
        public async Task<JsonResult> ResetarBaseAsync(bool? status)
        {
            
            await _passageiroRepository.AtualizarStatusAlteracaoAsync((bool)status);
            _ajaxResult.Success = true;
            _ajaxResult.Message = "Dados resetados com sucesso";

            return Json(_ajaxResult);
        }


        /// <summary>
        /// Bloqueia o Usuário pelo Código de RfId
        /// </summary>
        /// <param name="rfid"></param>
        /// <returns></returns>
        public async Task<JsonResult> BloquearAsync(string rfid)
        {
            await _passageiroRepository.BloquearPorRfidAsync(rfid);

            _ajaxResult.Success = true;
            _ajaxResult.Message = "Usuário bloqueado com sucesso";

            return Json(_ajaxResult);
        }
    }
}
