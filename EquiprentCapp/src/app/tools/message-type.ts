import { MessageLifeTimeEnum } from "../enums/message-lifetime-enum";
import { MessageTypeEnum } from "../enums/message-type-enum";

export const MessageTypes = {
  error: <MessageType>{
    name: MessageTypeEnum.Error,
    lifeTime: MessageLifeTimeEnum.Error
  },
  info: <MessageType>{
    name: MessageTypeEnum.Info,
    lifeTime: MessageLifeTimeEnum.Info
  },
  success: <MessageType>{
    name: MessageTypeEnum.Success,
    lifeTime: MessageLifeTimeEnum.Success
  },
  warning: <MessageType>{
    name: MessageTypeEnum.Warning,
    lifeTime: MessageLifeTimeEnum.Warning
  }
};

export interface MessageType {
  name: string,
  lifeTime: number;
}