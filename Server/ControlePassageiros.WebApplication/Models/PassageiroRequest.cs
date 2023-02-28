using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace ControlePassageiros.WebApplication
{
    public class PassageiroRequest
    {
        public int? PassageiroId { get; set; }


        [DisplayName("Usuário")]
        [Required(ErrorMessage ="Informe o nome do {0}")]
        public string Nome { get; set; }


        [DisplayName("Foto")]
        public string Foto { get; set; }


        [DisplayName("Situação Atual")]
        public bool Situacao { get; set; }


        [DisplayName("Cartão")]
        [Required(ErrorMessage = "Informe o {0}")]
        public string RfId { get; set; }


        [DisplayName("Condomínio")]
        
        public string Condominio { get; set; }


        [DisplayName("Email")]
        public string Email { get; set; }


        [DisplayName("Telefone")]
        public string Telefone { get; set; }


        [DisplayName("Usuário desde")]
        public string DataCadastro { get; set; }


        [DisplayName("CPF")]
        public string Cpf { get; set; }


        public bool Alterado { get; set; }


        public List<SelectListItem> ListaCondominios
        {
            get
            {
                var listaCondominios = new List<SelectListItem>
                {
                    new SelectListItem { Value = "Atlantys Duplex", Text = "Atlantys Duplex"},
                    new SelectListItem { Value = "Barra Bali", Text = "Barra Bali"},
                    new SelectListItem { Value = "Lyon", Text = "Lyon"},
                    new SelectListItem { Value = "Marbella", Text = "Marbella"},
                    new SelectListItem { Value = "Itapoã", Text = "Itapoã"},
                    new SelectListItem { Value = "Barra Golden", Text = "Barra Golden"},
                    new SelectListItem { Value = "Porto Seguro", Text = "Porto Seguro"}
                };

                return listaCondominios.OrderBy(x => x.Text)
                                       .ToList();
            }
        }
    }
}
