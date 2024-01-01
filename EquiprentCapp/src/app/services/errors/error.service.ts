import { Component, Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { StringBuilder } from "../../tools/stringBuilder";
import { ErrorMessageTypeEnum } from "../../enums/error-messag-type-enum";
import { FormComponent } from "src/app/components/abstract/forms/form";

@Injectable()
export class ErrorService {

  private static readonly _idMessagePart = "ID";
  private static readonly _maxLengthMessagePart = "MAX";
  private static readonly _messageSeparator = "|";
  private static readonly _messageInnerSeparator = ":";
  private static readonly _minLengthMessagePart = "MIN";
  private static readonly _typeMessagePart = "TYPE";

  private readonly errorMessage: ErrorMessage;
  private readonly errorMessageBuilder: ErrorMessageBuilder;

  constructor(private readonly translate: TranslateService) {
    this.errorMessage = new ErrorMessage();
    this.errorMessageBuilder = new ErrorMessageBuilder(translate, this.errorMessage);
  }

  public getDefaultErrorMessage() {
    return this.translate.instant('General.Error.Global');
  }

  public getFirstErrorMessageKey(error: any) {
    if (this.isValidErrorObject(error)) {
      const errorObject = error.errors;
      const firstErrorPropertyName = this.getFirstErrorName(errorObject);

      if (!firstErrorPropertyName)
        return;

      const firstError: string | string[] = errorObject[firstErrorPropertyName];

      if (!firstError)
        return;

      const splitError = this.getSplitError(firstError);

      return splitError[0];
    }
    else {
      return this.getDefaultErrorMessage();
    }
  }

  public getFirstTranslatedErrorMessage(error: any) {

    if (this.isValidErrorObject(error)) {
      const errorObject = error.errors;
      const firstErrorPropertyName = this.getFirstErrorName(errorObject);

      if (!firstErrorPropertyName)
        return;

      const firstError: string | string[] = errorObject[firstErrorPropertyName];

      if (!firstError)
        return;

      const splitError = this.getSplitError(firstError);
      this.fillErrorMessageBasedOnError(splitError);

      if (!this.errorMessage.hasRequiredPropertiesAssigned()) {
        return this.getDefaultErrorMessage();
      }

      this.errorMessageBuilder.build();

      return this.errorMessageBuilder.getMessage();
    }
    else {
      return this.getDefaultErrorMessage();
    }
  }

  private fillErrorMessageBasedOnError(error: string[]) {
    for (const message of error) {
      const splitMessage = message.split(ErrorService._messageInnerSeparator);

      switch (splitMessage[0]) {
        case ErrorService._idMessagePart:
          this.errorMessage.id = splitMessage[1];
          break;
        case ErrorService._maxLengthMessagePart:
          this.errorMessage.maxLength = splitMessage[1];
          break;
        case ErrorService._minLengthMessagePart:
          this.errorMessage.minLength = splitMessage[1];
          break;
        case ErrorService._typeMessagePart:
          this.errorMessage.type = splitMessage[1];
          break;
      }
    }
  }

  private getFirstErrorName(errors: any) {
    return Object.keys(errors)[0];
  }

  private getSplitError(error: string[] | string) {
    return Array.isArray(error)
      ? error[0].split(ErrorService._messageSeparator)
      : error.split(ErrorService._messageSeparator)
  }

  private isValidErrorObject(error: any) {
    return error?.errors;
  }
}

class ErrorMessage {
  id?: string;
  maxLength?: string;
  minLength?: string;
  type?: string;

  hasRequiredPropertiesAssigned() {
    return this.id && this.type;
  }
}

class ErrorMessageBuilder {
  message: ErrorMessage;
  resultMessageBuilder = new StringBuilder();
  translate: TranslateService;

  constructor(translate: TranslateService, errorMessage: ErrorMessage) {
    this.message = errorMessage;
    this.translate = translate;
  }

  append(messagePart: string): ErrorMessageBuilder {
    this.resultMessageBuilder.append(messagePart);
    return this;
  }

  build() {
    this.clean();

    this
      .append(this.translate.instant('Messages.TheValueOfTheField'))
      .append(" ")
      .append("'")
      .withId()
      .append("'")
      .append(" ")
      .withTypeSpecificMessagePart()
      .append(".");
  }

  private clean() {
    if (this.resultMessageBuilder.length() > 0)
      this.resultMessageBuilder = new StringBuilder();
  }

  getMessage() {
    return this.resultMessageBuilder.toString();
  }

  private withId(): ErrorMessageBuilder {
    return this.append(this.translate.instant(this.message.id!));
  }

  private withTypeSpecificMessagePart(): ErrorMessageBuilder {

    let typeSpecificMessage = '';

    switch (this.message.type) {
      case ErrorMessageTypeEnum.Email:
        typeSpecificMessage = this.translate.instant('General.Error.IsNotValidEmail');
        break;
      case ErrorMessageTypeEnum.Empty:
        typeSpecificMessage = this.translate.instant('General.Error.IsEmpty');
        break;
      case ErrorMessageTypeEnum.Length:
        typeSpecificMessage = this.translate.instant('General.Error.HasIncorrectLength', { minLength: this.message.minLength, maxLength: this.message.maxLength });
        break;
      case ErrorMessageTypeEnum.MatchAllowedLetters:
        typeSpecificMessage = this.translate.instant('General.Error.IsNotMatchingAllowedLetters');
        break;
      case ErrorMessageTypeEnum.MatchSmallLetters:
        typeSpecificMessage = this.translate.instant('General.Error.IsNotMatchingSmallLetters');
        break;
    }

    return this.append(typeSpecificMessage);
  }
}