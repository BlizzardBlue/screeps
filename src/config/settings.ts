import {W1N7, W3N5, W3N7} from './rooms';
import {RoomSettings} from './rooms/RoomSettings';

export interface Settings {
  rooms: {
    [roomName: string]: RoomSettings;
  };
  memory: any;
}

export const settings: Settings = {
  rooms: {
    W1N7: W1N7,
    W3N7: W3N7,
    W3N5: W3N5
  },
  memory: undefined
};
