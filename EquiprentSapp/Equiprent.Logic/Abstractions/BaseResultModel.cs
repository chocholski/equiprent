namespace Equiprent.Logic.Abstractions
{
    public abstract record BaseResultModel(bool HasSuccess, string? Message);
}
