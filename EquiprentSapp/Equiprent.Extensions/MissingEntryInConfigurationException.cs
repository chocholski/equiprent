using System;

namespace Equiprent.Extensions
{
    public class MissingEntryInConfigurationException : Exception
    {
        private readonly string _objectOfInterestName;

        public MissingEntryInConfigurationException(string objectOfInterestName) => _objectOfInterestName = objectOfInterestName;

        public override string Message => $"Missing entry in configuration regarding {_objectOfInterestName}!";
    }
}
