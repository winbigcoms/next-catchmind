import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

export interface SocketType {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}
