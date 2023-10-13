import { Injectable } from '@angular/core';
import { DataBaseOperationTypeMessagePartsForConsole, DatabaseOperationTypeMessagePartForConsole } from '../tools/database-operation-type';

@Injectable()
export class ConsoleMessageService {
  constructor() { }

  public getConsoleMessageWithResultForEntityAfterCreation(entity: string, result: string) {
    return this.getConsoleMessage(entity, result, DataBaseOperationTypeMessagePartsForConsole.create);
  }

  public getConsoleMessageWithResultForEntityAfterDeletion(entity: string, result: string) {
    return this.getConsoleMessage(entity, result, DataBaseOperationTypeMessagePartsForConsole.delete);
  }

  public getConsoleMessageWithResultForEntityAfterUpdate(entity: string, result: string) {
    return this.getConsoleMessage(entity, result, DataBaseOperationTypeMessagePartsForConsole.update);
  }

  private getConsoleMessage(entity: string, result: string, operation: DatabaseOperationTypeMessagePartForConsole) {
    return `The ${entity} has been ${operation.name} with result: ${result}`;
  }
}