using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace ControlePassageiros.WebApplication.Persistence
{
    public class Passageiro
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int PassageiroId { get; set; }

        [Column("nome")]
        public string Nome { get; set; }

        [Column("foto")]
        public string Foto { get; set; }

        [Column("flag_ativo")]
        public bool Situacao { get; set; }

        [Column("rfid")]
        public string RfId { get; set; }

        [Column("condominio")]
        public string Condominio { get; set; }

        [Column("flag_alterado")]
        public bool Alterado { get; set; }

        [Column("email")]
        public string Email { get; set; }

        [Column("telefone")]
        public string Telefone { get; set; }

        [Column("data_cadastro")]
        public DateTime DataCadastro { get; set; }

        [Column("cpf")]
        public string Cpf { get; set; }
    }
}