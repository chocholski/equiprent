export class RegexPatterns {
  // static emailPattern = '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';
  static emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$";
  static phoneNumberPattern = '^[+]*[(]{0,1}[0-9\\s]{1,4}[)]{0,1}[-\s\.[0-9\\s]*$';
  static bankAccountPattern = '^[0-9]{26}$';
  static postalCodePattern = /\d{2}-\d{3}/;
  static passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
  static passwordOrEmptyPattern = /^$|[0-9a-zA-Z]{8,20}$/;
  static decimalNumber = /^\d+[\d\s]*[,]?[\d]{0,2}?$/;
  static regonPattern = /^(?:[^\d]|^)(\d{9}|\d{14})(?:[^\d]|$)/;
  static vehicleRegistrationNumberPattern = /^[A-Z]|[0-9]/;
}