import { WebSocketEvent } from "./const";
import { createWebsocketLink } from "./util";

let websocket: WebSocket | null = null

export const EventTypeClientCount = 'websocket:clientCount'

export interface EventMessage {
  type: string,
  data: string
}

export const ConnectEvent = () => {
  if (websocket != null) {
    return websocket;
  }

  const link = createWebsocketLink(WebSocketEvent)
  websocket = new WebSocket(link)
  return websocket
}