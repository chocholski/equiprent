using Equiprent.Logic.Commands.Equipments.Photos.Responses.ThumbnailForFile;
using MediatR;

namespace Equiprent.Logic.Commands.Equipments.Photos.Requests.MakeThumbnailForFile
{
    public class MakeThumbnailForFileRequest : IRequest<ThumbnailForFileResponse?>
    {
        public required string File { get; set; }

        public required string FileName { get; set; }
    }
}
