export class FormSubmitionActionExecutionSettings<T> {
  afterSubmitionCustomOperationsExecutor?: (...args: any[]) => void = undefined;
  afterSubmitionNavigationLink?: string = undefined;
  beforeSubmitionCustomOperationsExecutor: (...args: any[]) => T;
  entityName: string = '';
}