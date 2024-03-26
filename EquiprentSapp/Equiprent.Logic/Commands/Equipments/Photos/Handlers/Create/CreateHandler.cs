using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Equipments.Photos;
using Equiprent.Logic.Commands.Equipments.Photos.Requests.Create;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Equipments.Photos.Handlers.Create
{
    public sealed class CreateHandler : IRequestHandler<CreateRequest, CommandResult>
    {
        private readonly ApplicationDbContext _dbContext;

        public CreateHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CommandResult> Handle(CreateRequest request, CancellationToken cancellationToken)
        {
            var equipmentPhoto = await _dbContext.EquipmentPhotos
                .Where(photo =>
                    !photo.IsDeleted &&
                    photo.EquipmentId == request.EquipmentId &&
                    photo.RelativePath == request.RelativePath)
                .SingleOrDefaultAsync(cancellationToken);

            if (equipmentPhoto is not null)
                return CommandResult.EquipmentPhoto_AlreadyExists;

            equipmentPhoto = new EquipmentPhoto
            {
                CreatedById = request.CreatedById,
                CreatedOn = DateTime.Now,
                EquipmentId = request.EquipmentId,
                FileName = request.FileName,
                RelativePath = request.RelativePath,
            };

            await _dbContext.EquipmentPhotos.AddAndSaveAsync(equipmentPhoto, cancellationToken);

            return CommandResult.OK;
        }
    }
}
