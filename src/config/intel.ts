interface Intel {
  rooms: {
    [roomName: string]: {
      name: string;
      object: Room;
      sources?: {
        primary: {
          id: string;
          roomPosition: RoomPosition;
          seats: number;
          x: number;
          y: number;
        };
        secondary?: {
          id: string;
          roomPosition: RoomPosition;
          seats: number;
          x: number;
          y: number;
        };
      };
      mineral?: {
        id: string;
        type: RESOURCE_UTRIUM | RESOURCE_LEMERGIUM | RESOURCE_KEANIUM | RESOURCE_GHODIUM | RESOURCE_ZYNTHIUM | RESOURCE_OXYGEN | RESOURCE_HYDROGEN | RESOURCE_CATALYST;
        density: number;
        seats: number;
        x: number;
        y: number;
      };
      entrance?: {
        roomPosition: RoomPosition;
        x: number;
        y: number;
      };
    };
  };
  expansion: {
    mining: {
      rooms: string[];
    };
    reservation: string[];
  };
}

export const intel: Intel = {
  rooms: {
    W1N7: {
      name: 'W1N7',
      object: Game.rooms.W1N7,
      entrance: {
        roomPosition: new RoomPosition(36, 26, 'W1N7'),
        x: 36,
        y: 26
      },
      sources: {
        primary: {
          id: 'ef990774d80108c',
          roomPosition: new RoomPosition(36, 30, 'W1N7'),
          seats: 4,
          x: 36,
          y: 30
        },
        secondary: {
          id: 'ba3c0774d80c3a8',
          roomPosition: new RoomPosition(15, 24, 'W1N7'),
          seats: 3,
          x: 15,
          y: 24
        }
      },
      mineral: {
        id: '766c6164dd1fb19',
        type: RESOURCE_UTRIUM,
        density: DENSITY_MODERATE,
        seats: 3,
        x: 18,
        y: 35
      }
    },
    W2N7: {
      name: 'W2N7',
      object: Game.rooms.W2N7,
      sources: {
        primary: {
          id: '25020774762401f',
          roomPosition: new RoomPosition(19, 39, 'W2N7'),
          seats: 4,
          x: 19,
          y: 39
        },
        secondary: {
          id: '147e0774762a341',
          roomPosition: new RoomPosition(14, 14, 'W2N7'),
          seats: 4,
          x: 14,
          y: 14
        }
      }
    },
    W3N7: {
      name: 'W3N7',
      object: Game.rooms.W3N7,
      sources: {
        primary: {
          id: 'eee50774086309c',
          roomPosition: new RoomPosition(38, 3, 'W3N7'),
          seats: 4,
          x: 38,
          y: 3
        },
        secondary: {
          id: 'eff307740862fd8',
          roomPosition: new RoomPosition(12, 21, 'W3N7'),
          seats: 4,
          x: 12,
          y: 21
        }
      }
    }
  },
  expansion: {
    mining: {
      rooms: ['W2N7']
    },
    reservation: ['W2N7']
  }
};
