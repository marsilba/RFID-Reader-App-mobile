using System.ComponentModel;
using System.Text.Json.Serialization;

namespace ControlePassageiros.WebApplication
{
    public class PassageiroAppResponse
    {
        [JsonPropertyName("Cartao")]
        public string Cartao { get; set; }


        [JsonPropertyName("Nome")]
        public string Nome { get; set; }


        [JsonPropertyName("Condominio")]
        public string Condominio { get; set; }


        [JsonPropertyName("Foto")]
        public string Foto { get; set; }


        [JsonPropertyName("Ativo")]
        public bool Ativo { get; set; }
    }
}