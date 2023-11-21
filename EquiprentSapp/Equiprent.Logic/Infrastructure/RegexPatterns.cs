namespace Equiprent.Logic.Infrastructure
{
    public static class RegexPatterns
    {
        public const string LoginPattern = "[a-z]+";
        public const string NamePattern = "[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]+";
        public const string PhoneNumberPattern = "^[+]*[(]{0,1}[0-9\\\\s]{1,4}[)]{0,1}[-\\s\\.[0-9\\\\s]*$";
    }
}
