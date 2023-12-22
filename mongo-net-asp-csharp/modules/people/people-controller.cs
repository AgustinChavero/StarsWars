using csharp_asp.services.functions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using MongoDB.Bson;
using System.Text.Json;

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

        public class UpdateData
        {
            public string? FieldName { get; set; }
            public object? NewValue { get; set; }
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

        [HttpGet("all")]
        public async Task<ActionResult> GetAllPeoples([FromQuery] Dictionary<string, object> query)
        {
            try
            {
                var result = await _globalFunctions.FindAllElement(query, "People");
                if (result.Count == 0) return NotFound("Personas no encontradas");

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(404, $"Error al obtener las personas: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetPeople(string id)
        {
            try
            {
                var objectId = ObjectId.Parse(id);
                var result = await _globalFunctions.FindElement(objectId, "People");
                if (result == null) return NotFound("Persona no encontrada");

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
        public async Task<ActionResult> UpdatePeople(string id, [FromBody] People body)
        {
            try
            {
                var objectId = ObjectId.Parse(id);

                if (body == null) return BadRequest("Los datos de actualización no pueden estar vacíos.");

                var result = await _globalFunctions.UpdateElement(objectId, body, "People");
                if (result == null)  return NotFound("Persona no encontrada");

                return Ok(result);
            }
            catch (FormatException)
            {
                return BadRequest("Formato de ID inválido");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al actualizar la persona: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePeople(string id)
        {
            try
            {
                var objectId = ObjectId.Parse(id);
                var result = await _globalFunctions.DeleteElement(objectId, "People");

                if (result == null) return NotFound("Persona no encontrada");

                return Ok(result);
            }
            catch (FormatException)
            {
                return BadRequest("Formato de ID inválido");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al eliminar la persona: {ex.Message}");
            }
        }

    }
}

