interface Intel {
  alias: {
    [key: string]: any;
  };
  rooms: {
    [roomName: string]: {
      name: string;
      alias?: string;
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
        tertiary?: {
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
  alias: {
    capitol: {
      roomName: 'W5N5'
    }
  },
  rooms: {
    W1N7: {
      name: 'W1N7',
      alias: 'headquarter',
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
      entrance: {
        roomPosition: new RoomPosition(35, 27, 'W3N7'),
        x: 35,
        y: 27
      },
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
    },
    W3N5: {
      name: 'W3N5',
      object: Game.rooms.W3N5,
      entrance: {
        roomPosition: new RoomPosition(25, 5, 'W3N5'),
        x: 25,
        y: 5
      },
      sources: {
        primary: {
          id: 'b25207741a44ada',
          roomPosition: new RoomPosition(40, 45, 'W3N5'),
          seats: 1,
          x: 40,
          y: 45
        }
      },
      mineral: {
        id: '766c6164dd1fb19',
        type: RESOURCE_KEANIUM,
        seats: 5,
        x: 27,
        y: 17
      }
    },
    W5N5: {
      name: 'W5N5',
      alias: 'capitol',
      object: Game.rooms.W5N5,
      entrance: {
        roomPosition: new RoomPosition(47, 31, 'W5N5'),
        x: 47,
        y: 31
      },
      sources: {
        primary: {
          id: 'f43c07734e2574c',
          roomPosition: new RoomPosition(46, 15, 'W5N5'),
          seats: 5,
          x: 46,
          y: 15
        },
        secondary: {
          id: 'a7a007734e22c6e',
          roomPosition: new RoomPosition(12, 33, 'W5N5'),
          seats: 3,
          x: 12,
          y: 33
        },
        tertiary: {
          id: '03a407734e2b07f',
          roomPosition: new RoomPosition(5, 5, 'W5N5'),
          seats: 2,
          x: 5,
          y: 5
        }
      },
      mineral: {
        id: '766c6164dd1fb19',
        type: RESOURCE_UTRIUM,
        seats: 3,
        x: 18,
        y: 35
      }
    }
  },
  expansion: {
    mining: {
      rooms: ['W2N7']
    },
    reservation: []
  }
};
