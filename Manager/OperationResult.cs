using System.Collections.Generic;
using FluentValidation.Results;

namespace Manager
{
    public class OperationResult
    {
        public bool Success { get; set; }
        public List<string> MessageList { get; set; }

        public OperationResult(bool success, string message)
        {
            Success = success;
            MessageList = new List<string>();
            MessageList.Add(message);
        }

        public OperationResult(bool success, ValidationResult results)
        {
            Success = success;

            MessageList = new List<string>();
            foreach (var error in results.Errors)
            {
                MessageList.Add("Property " + error.PropertyName + " : " + error.ErrorMessage);
            }
        }

        public void Append(string message)
        {
            MessageList.Add(message);
        }
    }
}
