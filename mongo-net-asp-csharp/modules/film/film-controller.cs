using csharp_asp.modules.people;
using csharp_asp.services.functions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using MongoDB.Bson;

namespace csharp_asp.modules.film
{
    [ApiController]
    [Route("film")]
    public class FilmController : Controller
    {
        private readonly GlobalFunctions<Film> _globalFunctions;

        public FilmController(GlobalFunctions<Film> globalFunctions)
        {
            _globalFunctions = globalFunctions;
        }

        [HttpPost]
        [IgnoreAntiforgeryToken]
        public async Task<ActionResult> CreateFilm([FromBody] Film body, [FromServices] IHttpContextAccessor accessor)
        {
            try
            {
                if (body == null) return BadRequest("El cuerpo no puede ser nulo.");

                var result = await _globalFunctions.CreateElement(body, typeof(Film).FullName);

                return Ok(result);
            }
            catch
            {
                return BadRequest("Hubo un error al crear el objeto.");
            }
        }

        [HttpGet("all")]
        public async Task<ActionResult> GetAllFilms([FromQuery] Dictionary<string, object> query)
        {
            try
            {
                var result = await _globalFunctions.FindAllElement(query, "Film");
                if (result.Count == 0) return NotFound("Films no encontradas");

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(404, $"Error al obtener las personas: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetFilm(string id)
        {
            try
            {
                var objectId = ObjectId.Parse(id);
                var result = await _globalFunctions.FindElement(objectId, "Film");
                if (result == null) return NotFound("Película no encontrada");

                return Ok(result);
            }
            catch (FormatException)
            {
                return BadRequest("Formato de ID inválido");
            }
            catch (Exception ex)
            {
                return StatusCode(404, $"Error al buscar la película: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateFilm(string id, [FromBody] Film body)
        {
            try
            {
                var objectId = ObjectId.Parse(id);

                if (body == null) return BadRequest("Los datos de actualización no pueden estar vacíos.");

                var result = await _globalFunctions.UpdateElement(objectId, body, "Film");
                if (result == null) return NotFound("Film no encontrado");

                return Ok(result);
            }
            catch (FormatException)
            {
                return BadRequest("Formato de ID inválido");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al actualizar el film: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFilm(string id)
        {
            try
            {
                var objectId = ObjectId.Parse(id);
                var result = await _globalFunctions.DeleteElement(objectId, "Film");

                if (result == null) return NotFound("Film no encontrado");

                return Ok(result);
            }
            catch (FormatException)
            {
                return BadRequest("Formato de ID inválido");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al eliminar el film: {ex.Message}");
            }
        }
    }
}



