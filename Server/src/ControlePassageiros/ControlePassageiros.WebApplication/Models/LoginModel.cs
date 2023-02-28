using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ControlePassageiros.WebApplication
{
    public class LoginModel
    {
        [DisplayName("Login")]
        [Required(ErrorMessage = "Informe o login")]
        public string Login { get; set; }


        [DisplayName("Senha")]
        [DataType(DataType.Password)]
        [Required(ErrorMessage = "Informe a senha")]
        public string Senha { get; set; }


        [DisplayName("Email")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
    }
}
