using csharp_asp.services.functions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using MongoDB.Bson;

namespace csharp_asp.modules.starship
{
    [ApiController]
    [Route("starship")]
    public class StarshipController : Controller
    {
        private readonly GlobalFunctions<Starship> _globalFunctions;

        public StarshipController(GlobalFunctions<Starship> globalFunctions)
        {
            _globalFunctions = globalFunctions;
        }

        [HttpPost]
        [IgnoreAntiforgeryToken]
        public async Task<ActionResult> CreateStarship([FromBody] Starship body, [FromServices] IHttpContextAccessor accessor)
        {
            try
            {
                if (body == null) return BadRequest("El cuerpo no puede ser nulo.");

                var result = await _globalFunctions.CreateElement(body, "Starship");

                return Ok(result);
            }
            catch
            {
                return BadRequest("Hubo un error al crear el objeto.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetStarship(string id)
        {
            try
            {
                var objectId = ObjectId.Parse(id);
                var starship = await _globalFunctions.FindElement(objectId, "Starship");
                if (starship == null) return NotFound("Nave no encontrada");

                return Ok(starship);
            }
            catch (FormatException)
            {
                return BadRequest("Formato de ID inválido");
            }
            catch (Exception ex)
            {
                return StatusCode(404, $"Error al buscar la nave: {ex.Message}");
            }
        }

        [HttpGet("all")]
        public async Task<ActionResult> GetAllStarships([FromQuery] Dictionary<string, object> query)
        {
            try
            {
                var starships = await _globalFunctions.FindAllElement(query, "Starship");
                if (starships.Count == 0) return NotFound("Naves no encontradas");

                return Ok(starships);
            }
            catch (Exception ex)
            {
                return StatusCode(404, $"Error al obtener las naves: {ex.Message}");
            }
        }



    }
}
