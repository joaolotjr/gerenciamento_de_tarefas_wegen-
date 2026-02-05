using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models
{
    public class TodoTask
    {
        public int Id { get; set; }
        
        [Required]
        public string Title { get; set; } = string.Empty;
        
        public string Description { get; set; } = string.Empty;
        
        public bool IsCompleted { get; set; } = false;
        
        public string Category { get; set; } = string.Empty;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Chave estrangeira para o Usuário
        public int UserId { get; set; }
        public User? User { get; set; }
    }
}