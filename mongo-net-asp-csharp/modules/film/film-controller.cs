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

        [HttpGet("{id}")]
        public async Task<ActionResult> GetFilm(string id)
        {
            try
            {
                var objectId = ObjectId.Parse(id);
                var film = await _globalFunctions.FindElement(objectId, "Film");
                if (film == null) return NotFound("Película no encontrada");

                return Ok(film);
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

        [HttpGet("all")]
        public async Task<ActionResult> GetAllFilms([FromQuery] Dictionary<string, object> query)
        {
            try
            {
                var films = await _globalFunctions.FindAllElement(query, "Film");
                if (films.Count == 0) return NotFound("Películas no encontradas");

                return Ok(films);
            }
            catch (Exception ex)
            {
                return StatusCode(404, $"Error al obtener las películas: {ex.Message}");
            }
        }



    }
}



