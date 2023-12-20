using csharp_asp.services.functions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using MongoDB.Bson;

namespace csharp_asp.modules.people
{
    [ApiController]
    [Route("people")]
    public class PeopleController : Controller
    {
        private readonly GlobalFunctions<People> _globalFunctions;

        public PeopleController(GlobalFunctions<People> globalFunctions)
        {
            _globalFunctions = globalFunctions;
        }

        [HttpPost]
        [IgnoreAntiforgeryToken]
        public async Task<ActionResult> CreatePeople([FromBody] People body, [FromServices] IHttpContextAccessor accessor)
        {
            try
            {
                if (body == null) return BadRequest("El cuerpo no puede ser nulo.");

                var result = await _globalFunctions.CreateElement(body, typeof(People).FullName);

                return Ok(result);
            }
            catch
            {
                return BadRequest("Hubo un error al crear el objeto.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetPeople(string id)
        {
            try
            {
                var objectId = ObjectId.Parse(id);
                var people = await _globalFunctions.FindElement(objectId, "People");
                if (people == null) return NotFound("Persona no encontrada");

                return Ok(people);
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
        public async Task<ActionResult> GetAllPeoples([FromQuery] Dictionary<string, object> query)
        {
            try
            {
                var peoples = await _globalFunctions.FindAllElement(query, "People");
                if (peoples.Count == 0) return NotFound("Personas no encontradas");

                return Ok(peoples);
            }
            catch (Exception ex)
            {
                return StatusCode(404, $"Error al obtener las personas: {ex.Message}");
            }
        }



    }
}

