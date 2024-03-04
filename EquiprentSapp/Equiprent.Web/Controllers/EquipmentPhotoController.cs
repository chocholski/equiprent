﻿using Equiprent.Entities.Enums;
using Equiprent.Logic.Commands.Equipments.Requests.MakeEquipmentPhotoThumbnailForFile;
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
            return new JsonResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.Equipments_CanList)]
        [HttpPost(ApiRoutes.Equipment.File.Photo.MakeThumbnailForFile)]
        public async Task<IActionResult> MakeThumbnailForFileAsync(MakeEquipmentPhotoThumbnailForFileRequest request)
        {
            var result = await _mediator.Send(request);
            return new JsonResult(result);
        }
    }
}