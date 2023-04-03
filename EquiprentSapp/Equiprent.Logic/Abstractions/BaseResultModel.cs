namespace Equiprent.Logic.Abstractions
{
    public abstract class BaseResultModel
    {
        public bool HasSuccess { get; set; }
        public string? Message { get; set; }
    }
}
