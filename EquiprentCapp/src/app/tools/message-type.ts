import { MessageLifeTimeEnum } from "../enums/messageLifeTimeEnum";
import { MessageTypeEnum } from "../enums/messageTypeEnum";

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