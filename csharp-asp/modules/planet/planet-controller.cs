using csharp_asp.services.functions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using MongoDB.Bson;

namespace csharp_asp.modules.planet
{
    [ApiController]
    [Route("planet")]
    public class PlanetController : Controller
    {
        private readonly GlobalFunctions<Planet> _globalFunctions;

        public PlanetController(GlobalFunctions<Planet> globalFunctions)
        {
            _globalFunctions = globalFunctions;
        }

        [HttpPost]
        [IgnoreAntiforgeryToken]
        public async Task<ActionResult> CreatePlanet([FromBody] Planet body, [FromServices] IHttpContextAccessor accessor)
        {
            try
            {
                if (body == null) return BadRequest("El cuerpo no puede ser nulo.");

                var result = await _globalFunctions.CreateElement(body, typeof(Planet).FullName);

                return Ok(result);
            }
            catch
            {
                return BadRequest("Hubo un error al crear el objeto.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetPlanet(string id)
        {
            try
            {
                var objectId = ObjectId.Parse(id);
                var planet = await _globalFunctions.FindElement(objectId, "Planet");
                if (planet == null) return NotFound("Planeta no encontrado");

                return Ok(planet);
            }
            catch (FormatException)
            {
                return BadRequest("Formato de ID inválido");
            }
            catch (Exception ex)
            {
                return StatusCode(404, $"Error al buscar el planeta: {ex.Message}");
            }
        }

        [HttpGet("all")]
        public async Task<ActionResult> GetAllPlanets([FromQuery] Dictionary<string, object> query)
        {
            try
            {
                var planets = await _globalFunctions.FindAllElement(query, "Planet");
                if (planets.Count == 0) return NotFound("Planetas no encontrados");

                return Ok(planets);
            }
            catch (Exception ex)
            {
                return StatusCode(404, $"Error al obtener los planetas: {ex.Message}");
            }
        }



    }
}