import "./Message.css";

import { MessageType, MessageTypes } from "../../../utils/enums";

export interface MessageProps {
  message: string;
  type: MessageType;
  width?: string;
}

export const Message = ({ message, type, width }: MessageProps) => {
  const checkType = (type: MessageType) => {
    if (type === MessageTypes.Error) return "message-error";
    if (type === MessageTypes.Success) return "message-success";
    if (type === MessageTypes.Info) return "message-info";
    if (type === MessageTypes.Warning) return "message-warning";
  };

  if (message === "") return null;

  return (
    <div
      className={`message-container ${checkType(type)}`}
      style={{ minWidth: width, maxWidth: width }}
    >
      <p>{message}</p>
    </div>
  );
};
