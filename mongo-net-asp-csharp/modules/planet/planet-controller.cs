using csharp_asp.modules.film;
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
                var result = await _globalFunctions.FindElement(objectId, "Planet");
                if (result == null) return NotFound("Planeta no encontrado");

                return Ok(result);
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
                var result = await _globalFunctions.FindAllElement(query, "Planet");
                if (result.Count == 0) return NotFound("Planetas no encontrados");

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(404, $"Error al obtener los planetas: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePlanet(string id, [FromBody] Planet body)
        {
            try
            {
                var objectId = ObjectId.Parse(id);

                if (body == null) return BadRequest("Los datos de actualización no pueden estar vacíos.");

                var result = await _globalFunctions.UpdateElement(objectId, body, "Planet");
                if (result == null) return NotFound("Planet no encontrado");

                return Ok(result);
            }
            catch (FormatException)
            {
                return BadRequest("Formato de ID inválido");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al actualizar el planeta: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePlanet(string id)
        {
            try
            {
                var objectId = ObjectId.Parse(id);
                var result = await _globalFunctions.DeleteElement(objectId, "Planet");

                if (result == null) return NotFound("Planeta no encontrado");

                return Ok(result);
            }
            catch (FormatException)
            {
                return BadRequest("Formato de ID inválido");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al eliminar el planeta: {ex.Message}");
            }
        }
    }
}