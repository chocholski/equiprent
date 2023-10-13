export const DataBaseOperationTypeMessagePartsForConsole = {
  create: <DatabaseOperationTypeMessagePartForConsole>{
    name: "created"
  },
  delete: <DatabaseOperationTypeMessagePartForConsole>{
    name: "deleted"
  },
  update: <DatabaseOperationTypeMessagePartForConsole>{
    name: "updated"
  },
};

export interface DatabaseOperationTypeMessagePartForConsole {
  name: string;
}