using csharp_asp.modules.planet;
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

        [HttpGet("all")]
        public async Task<ActionResult> GetAllStarships([FromQuery] Dictionary<string, object> query)
        {
            try
            {
                var result = await _globalFunctions.FindAllElement(query, "Starship");
                if (result.Count == 0) return NotFound("Naves no encontradas");

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(404, $"Error al obtener las naves: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetStarship(string id)
        {
            try
            {
                var objectId = ObjectId.Parse(id);
                var result = await _globalFunctions.FindElement(objectId, "Starship");
                if (result == null) return NotFound("Nave no encontrada");

                return Ok(result);
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

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateStarship(string id, [FromBody] Starship body)
        {
            try
            {
                var objectId = ObjectId.Parse(id);

                if (body == null) return BadRequest("Los datos de actualización no pueden estar vacíos.");

                var result = await _globalFunctions.UpdateElement(objectId, body, "Starship");
                if (result == null) return NotFound("Nave no encontrada");

                return Ok(result);
            }
            catch (FormatException)
            {
                return BadRequest("Formato de ID inválido");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al actualizar la nave: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteStarship(string id)
        {
            try
            {
                var objectId = ObjectId.Parse(id);
                var result = await _globalFunctions.DeleteElement(objectId, "Starship");

                if (result == null) return NotFound("Nave no encontrada");

                return Ok(result);
            }
            catch (FormatException)
            {
                return BadRequest("Formato de ID inválido");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al eliminar la nave: {ex.Message}");
            }
        }
    }
}
