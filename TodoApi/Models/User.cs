using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models
{
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        public string Username { get; set; } = string.Empty;
        
        [Required]
        public string PasswordHash { get; set; } = string.Empty;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Relacionamento: Um usuário tem muitas tarefas
        public ICollection<TodoTask> Tasks { get; set; } = new List<TodoTask>();
    }
}