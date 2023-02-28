using System;
using System.ComponentModel;

namespace ControlePassageiros.WebApplication
{
    public class PassageiroResponse
    {
        [DisplayName("Cartão")]
        public string Rfid { get; set; }


        [DisplayName("Usuário")]
        public string Nome { get; set; }


        [DisplayName("Condomínio")]
        public string Condominio { get; set; }


        [DisplayName("Foto")]
        public string Foto { get; set; }


        [DisplayName("Email")]
        public string Email { get; set; }


        [DisplayName("Telefone")]
        public string Telefone { get; set; }


        [DisplayName("Usuário desde")]
        public DateTime DataCadastro { get; set; }


        [DisplayName("CPF")]
        public string Cpf { get; set; }


        public bool Situacao { get; set; }


        [DisplayName("Situação Atual")]
        public string StatusAtual 
        {
            get
            {
                return Situacao ? "Liberado" : "Bloqueado";
            }
        }
    }
}