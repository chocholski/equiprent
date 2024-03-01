using Equiprent.Entities.Enums;
using Equiprent.Logic.Queries.Equipments.Requests;
using Equiprent.Web.Contracts;

namespace Equiprent.Web.Controllers
{
    public partial class EquipmentController
    {
        [PermissionRequirement((int)UserPermissionEnum.Equipments_CanList)]
        [HttpGet(ApiRoutes.Equipment.File.Photo.Download)]
        public async Task<IActionResult> DownloadEquipmentPhotoAsync(Guid photoId)
        {
            var request = new GetEquipmentPhotoByIdRequest(photoId);
            var result = await _mediator.Send(request);
            return result is not null ? Ok(result) : BadRequest();
        }
    }
}
