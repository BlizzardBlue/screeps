interface Intel {
  alias: {
    [key: string]: any;
  };
  rooms: {
    [roomName: string]: {
      name: string;
      alias?: string;
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
    W2N5: {
      name: 'W2N5',
      sources: {
        primary: {
          id: '95d107748ae4e46',
          roomPosition: new RoomPosition(13, 39, 'W2N5'),
          seats: 4,
          x: 13,
          y: 39
        },
        secondary: {
          id: '31ef07748aec3a4',
          roomPosition: new RoomPosition(15, 41, 'W2N5'),
          seats: 4,
          x: 15,
          y: 41
        }
      }
    },
    W2N7: {
      name: 'W2N7',
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
    W3N5: {
      name: 'W3N5',
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
    W3N6: {
      name: 'W3N6',
      sources: {
        primary: {
          id: '4ae507741489546',
          roomPosition: new RoomPosition(27, 12, 'W3N6'),
          seats: 1,
          x: 27,
          y: 12
        },
        secondary: {
          id: 'c43d0774148f19c',
          roomPosition: new RoomPosition(46, 30, 'W3N6'),
          seats: 3,
          x: 46,
          y: 30
        }
      }
    },
    W3N7: {
      name: 'W3N7',
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
    W3N8: {
      name: 'W3N8',
      entrance: {
        roomPosition: new RoomPosition(32, 46, 'W3N8'),
        x: 32,
        y: 46
      },
      sources: {
        primary: {
          id: 'ebdd0774017409d',
          roomPosition: new RoomPosition(42, 36, 'W3N8'),
          seats: 4,
          x: 42,
          y: 36
        },
        secondary: {
          id: '9d330774017e6b9',
          roomPosition: new RoomPosition(35, 4, 'W3N8'),
          seats: 4,
          x: 35,
          y: 4
        }
      }
    },
    W4N7: {
      name: 'W4N7',
      sources: {
        primary: {
          id: 'bca30773a345a6a',
          roomPosition: new RoomPosition(44, 34, 'W4N7'),
          seats: 2,
          x: 44,
          y: 34
        }
      }
    },
    W5N5: {
      name: 'W5N5',
      alias: 'capitol',
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
