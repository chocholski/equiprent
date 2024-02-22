namespace Equiprent.Logic.Infrastructure.FluentValidation
{
    public class FluentValidationMessageCreator<T>
    {
        private static readonly string MessageSeparator = "|";

        public static string CreateMessageForEmptyPropertyValue(string propertyName) => CreateMessage(propertyName, FluentValidationMessageTypeEnum.Empty);

        public static string CreateMessageForExceedingTheRangeOfLengths(string propertyName, Range possibleLengthsRange) =>
            $"ID:{CreateClientTranslationId(propertyName)}{MessageSeparator}MIN:{possibleLengthsRange.Start.Value}{MessageSeparator}MAX:{possibleLengthsRange.End.Value}TYPE:{FluentValidationMessageTypeEnum.Length}";

        public static string CreateMessageForNegativeNumber(string propertyName) =>
            $"ID:{CreateClientTranslationId(propertyName)}{MessageSeparator}TYPE:{FluentValidationMessageTypeEnum.NegativeNumber}";

        public static string CreateMessageForUnmatchingAllowedLetters(string propertyName) => CreateMessage(propertyName, FluentValidationMessageTypeEnum.MatchAllowedLetters);

        public static string CreateMessageForUnmatchingSmallLetters(string propertyName) => CreateMessage(propertyName, FluentValidationMessageTypeEnum.MatchSmallLetters);

        public static string CreateMessageForWrongEmailAddress(string propertyName) => CreateMessage(propertyName, FluentValidationMessageTypeEnum.Email);

        public static string CreateMessageForWrongPhoneNumber(string propertyName) => CreateMessage(propertyName, FluentValidationMessageTypeEnum.PhoneNumber);

        private static string CreateMessage(string propertyName, FluentValidationMessageTypeEnum type) =>
            $"ID:{CreateClientTranslationId(propertyName)}{MessageSeparator}TYPE:{type}";

        private static string CreateClientTranslationId(string propertyName) => $"{typeof(T).Name}.{propertyName}";
    }
}
