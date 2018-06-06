type Intel = {
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
  };
};

// export interface Intel {
//   rooms: {
//     [roomName: string]: {
//       name: string;
//       object: Room;
//       sources?: {
//         primary: {
//           id: string;
//           roomPosition: RoomPosition;
//           seats: number;
//           x: number;
//           y: number;
//         };
//         secondary?: {
//           id: string;
//           roomPosition: RoomPosition;
//           seats: number;
//           x: number;
//           y: number;
//         };
//       };
//       entrance?: {
//         roomPosition: RoomPosition;
//         x: number;
//         y: number;
//       };
//     };
//   };
//   expansion: {
//     mining: {
//       rooms: string[];
//     };
//   };
// }

export const intel: Intel = {
  rooms: {
    home: {
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
          // object: Game.getObjectById('ef990774d80108c'),
          roomPosition: new RoomPosition(36, 30, 'W1N7'),
          seats: 4,
          x: 36,
          y: 30
        },
        secondary: {
          id: 'ba3c0774d80c3a8',
          // object: Game.getObjectById('ba3c0774d80c3a8'),
          roomPosition: new RoomPosition(15, 24, 'W1N7'),
          seats: 3,
          x: 15,
          y: 24
        }
      }
    },
    W2N7: {
      name: 'W2N7',
      object: Game.rooms.W2N7,
      sources: {
        primary: {
          id: '25020774762401f',
          // object: Game.getObjectById('25020774762401f'),
          roomPosition: new RoomPosition(19, 39, 'W2N7'),
          seats: 4,
          x: 19,
          y: 39
        },
        secondary: {
          id: '147e0774762a341',
          // object: Game.getObjectById('147e0774762a341'),
          roomPosition: new RoomPosition(14, 14, 'W2N7'),
          seats: 4,
          x: 14,
          y: 14
        }
      }
    }
  },
  expansion: {
    mining: {
      rooms: ['W2N7']
    }
  }
};
