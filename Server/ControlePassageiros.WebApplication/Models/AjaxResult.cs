using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Collections.Generic;
using System.Linq;

namespace ControlePassageiros.WebApplication
{
    public class AjaxResult<T> where T : class
    {
        public AjaxResult(T entidade)
        {
            Model = entidade;
        }

        public AjaxResult()
        { }

        public bool Success { get; set; }
        public string Message { get; set; }
        public T Model { get; set; }
        public int Valor { get; set; }
        public string Json { get; set; }
        public string Url { get; set; }
        public int StatusCode { get; set; }

        public string ConfigurarModelStateErrors(ModelStateDictionary modelState)
        {
            List<string> erros = modelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).Distinct().ToList();
            Message = "Existem dados inválidos ou não preenchidos.<br>";
            
            foreach (var e in erros)
            {
                Message += "<br>- " + e + ".";
            }
         
            return Message;
        }
    }
}