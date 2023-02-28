using ControlePassageiros.WebApplication.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControlePassageiros.WebApplication.Controllers
{
    [AllowAnonymous]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly UsuarioRepository _usuarioRepository;
        private readonly AjaxResult<LoginModel> _ajaxResult;
        private readonly PassageiroRepository _passageiroRepository;


        public HomeController(ILogger<HomeController> logger, UsuarioRepository usuarioRepository, PassageiroRepository passageiroRepository, AjaxResult<LoginModel> ajaxResult)
        {
            _logger = logger;
            _usuarioRepository = usuarioRepository;
            _ajaxResult = ajaxResult;
            _passageiroRepository = passageiroRepository;
        }


        public async Task<IActionResult> Index()
        {
            ViewBag.Title = "Controle de Usuários";

            List<PassageiroResponse> response = await ListarPassageirosAsync();

            return View(response);
        }


        public async Task<IActionResult> PesquisarAsync()
        {
            List<PassageiroResponse> response = await ListarPassageirosAsync();
            return View("Listagem", response);
        }


        public IActionResult Login()
        {
            LoginModel model = new LoginModel();

            //model.Login = "marcio.barcellos";
            //model.Senha = "capiau";

            return View(model);
        }


        [HttpPost]
        public async Task<IActionResult> AutenticarAsync(LoginModel model)
        {
            _ajaxResult.Success = false;
            _ajaxResult.Message = "Dados inválidos";

            if (ModelState.IsValid)
            {
                Usuario usuario = await _usuarioRepository.ObterUsuarioLoginAsync(model.Login.ToLower(), model.Senha);

                if (usuario != null)
                {
                    //POPULA O USUARIO LOGADO (ESTATICO) COM OS DADOS DA BASE
                    UsuarioLogado.Criar(usuario);


                    _ajaxResult.Success = true;
                    _ajaxResult.Message = string.Empty;
                    _ajaxResult.Url = "Home/Index";

                    return Ok(_ajaxResult);
                }
            }

            return Ok(_ajaxResult);
        }


        public IActionResult Cadastrar()
        {
            PassageiroRequest model = new PassageiroRequest();
            return View("Formulario", model);
        }


        public async Task<IActionResult> EditarAsync(string rfid)
        {
            Passageiro passageiro = await _passageiroRepository.ObterPorRfidAsync(rfid);

            PassageiroRequest model = new PassageiroRequest
            {
                PassageiroId = passageiro.PassageiroId,
                RfId = passageiro.RfId,
                Condominio = passageiro.Condominio,
                Foto = passageiro.Foto,
                Nome = passageiro.Nome,
                Situacao = passageiro.Situacao,
                Alterado = passageiro.Alterado,
                Email = passageiro.Email?.ToLower(),
                Telefone = passageiro.Telefone,
                DataCadastro = passageiro.DataCadastro.ToShortDateString(),
                Cpf = passageiro.Cpf
            };

            return View("Formulario", model);
        }


        [HttpPost]
        public async Task<JsonResult> IncluirAsync(PassageiroRequest model)
        {
            Passageiro passageiro = new Passageiro
            {
                Alterado = true,
                Nome = model.Nome,
                Condominio = model.Condominio,
                RfId = model.RfId,
                Situacao = model.Situacao,
                Email = model.Email?.ToLower(),
                Telefone = model.Telefone,
                DataCadastro = Convert.ToDateTime(model.DataCadastro),
                Cpf = model.Cpf
            };

            await _passageiroRepository.IncluirAsync(passageiro);

            _ajaxResult.Success = true;
            _ajaxResult.Message = "Usuário cadastrado com sucesso";

            return Json(_ajaxResult);
        }


        [HttpPost]
        public async Task<JsonResult> AlterarAsync(PassageiroRequest model)
        {
            Passageiro passageiro = await _passageiroRepository.ObterPorIdAsync(model.PassageiroId);
            passageiro.Alterado = true;
            passageiro.Condominio = model.Condominio;
            passageiro.Nome = model.Nome;
            passageiro.RfId = model.RfId;
            passageiro.Situacao = model.Situacao;
            passageiro.Email = model.Email?.ToLower();
            passageiro.Telefone = model.Telefone;
            passageiro.DataCadastro = Convert.ToDateTime(model.DataCadastro);
            passageiro.Cpf = model.Cpf;
            

            await _passageiroRepository.AlterarAsync(passageiro);

            _ajaxResult.Success = true;
            _ajaxResult.Message = "Dados alterados com sucesso";

            return Json(_ajaxResult);
        }


        private async Task<List<PassageiroResponse>> ListarPassageirosAsync()
        {
            List<Passageiro> passageiros = await _passageiroRepository.ListarTodosAsync();
            List<PassageiroResponse> response = passageiros.Select(x => new PassageiroResponse
            {
                Rfid = x.RfId,
                Nome = x.Nome,
                Condominio = x.Condominio,
                Foto = x.Foto,
                Situacao = x.Situacao,
                Cpf = x.Cpf,
                DataCadastro = x.DataCadastro,
                Email = x.Email?.ToLower(),
                Telefone = x.Telefone                
            }).ToList();

            return response;
        }
    }
}
