namespace Equiprent.Data.DbContext.ModelBuilderAppenders.Location
{
    internal class CountryRepresentation
    {
        public readonly string Code = null!;
        public readonly int Id;
        public readonly string Name = null!;

        public CountryRepresentation(string code, int id, string name)
        {
            Code = code;
            Id = id;
            Name = name;
        }
    }
}
