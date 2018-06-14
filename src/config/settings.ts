import {RoomSettings} from './rooms/RoomSettings';
import {W1N7} from './rooms/W1N7';
import {W2N5} from './rooms/W2N5';
import {W2N7} from './rooms/W2N7';
import {W3N5} from './rooms/W3N5';
import {W3N6} from './rooms/W3N6';
import {W3N7} from './rooms/W3N7';
import {W3N8} from './rooms/W3N8';
import {W4N7} from './rooms/W4N7';
import {W5N5} from './rooms/W5N5';

export interface Settings {
  rooms: {
    [roomName: string]: RoomSettings;
  };
  memory: any;
  mines: {
    [roomName: string]: {
      to: string;
    };
  };
}

export const settings: Settings = {
  rooms: {
    W1N7: W1N7,
    W2N5: W2N5,
    W2N7: W2N7,
    W3N5: W3N5,
    W3N6: W3N6,
    W3N7: W3N7,
    W3N8: W3N8,
    W4N7: W4N7,
    W5N5: W5N5
  },
  memory: undefined,
  mines: {
    W2N5: {
      to: 'W3N5'
    },
    W2N7: {
      to: 'W1N7'
    },
    W3N6: {
      to: 'W3N5'
    },
    W3N8: {
      to: 'W3N7'
    },
    W4N7: {
      to: 'W3N7'
    }
  }
};
