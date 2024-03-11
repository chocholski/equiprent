namespace Equiprent.Web.Contracts
{
    public static partial class ApiRoutes
    {
        public static class Equipment
        {
            public static class File
            {
                public static class Photo
                {
                    public const string Download = "file/photo/download/{photoId}";
                    public const string MakeThumbnailForFile = "file/photo/makeThumbnailForFile";
                    public const string UploadMultiple = "file/photo/upload/multiple";
                }
            }
        }
    }
}
