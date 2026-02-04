using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Bloqueia acesso sem Token JWT
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        // Helper para pegar o ID do usuário logado através do Token
        private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoTask>>> GetTasks([FromQuery] string? category)
        {
            var userId = GetUserId();
            var query = _context.Tasks.Where(t => t.UserId == userId);

            // Filtragem por categoria (opcional)
            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(t => t.Category.ToLower() == category.ToLower());
            }

            return await query.ToListAsync();
        }

        // POST: api/Tasks
        [HttpPost]
        public async Task<ActionResult<TodoTask>> CreateTask(TodoTaskDto taskDto)
        {
            var task = new TodoTask
            {
                Title = taskDto.Title,
                Description = taskDto.Description,
                Category = taskDto.Category,
                IsCompleted = false,
                UserId = GetUserId(),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return Ok(task);
        }

        // PUT: api/Tasks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, TodoTaskDto taskDto)
        {
            var userId = GetUserId();
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (task == null) return NotFound("Tarefa não encontrada ou acesso negado.");

            task.Title = taskDto.Title;
            task.Description = taskDto.Description;
            task.Category = taskDto.Category;
            task.IsCompleted = taskDto.IsCompleted;
            task.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return Ok(task);
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var userId = GetUserId();
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (task == null) return NotFound();

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

    // DTO para receber dados do Frontend
    public class TodoTaskDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }
    }
}