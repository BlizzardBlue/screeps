import {RoomSettings} from './RoomSettings';

export const W3N5: RoomSettings = {
  spawn: {
    name: 'Spawn3'
  },
  creep: {
    harvester: {
      population: 2,
      initialMemory: {
        role: 'harvester',
        class: 'harvester'
      },
      priority: 0,
      parts: [WORK, CARRY, CARRY, MOVE, MOVE] // 300
    },
    miner: {
      population: 1,
      initialMemory: {
        role: 'miner',
        class: 'miner'
      },
      priority: 4,
      parts: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE]
    },
    builder: {
      population: 0,
      initialMemory: {
        role: 'builder',
      class: 'builder',
        building: false
      },
      priority: 1,
      parts: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE] // 800
    },
    upgrader: {
      population: 2,
      initialMemory: {
        role: 'upgrader',
        class: 'upgrader'
      },
      priority: 3,
      parts: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
    },
    repairer: {
      population: 0,
      initialMemory: {
        role: 'repairer',
        class: 'repairer',
        repairing: false
      },
      priority: 2,
      parts: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE] // 500
    },
    // pioneer: {
    //   population: 0,
    //   initialMemory: {
    //     role: 'pioneer',
    //     class: 'pioneer'
    //   },
    //   priority: 5,
    //   parts: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE] // 1250
    // },
    cleaner: {
      population: 1,
      initialMemory: {
        role: 'cleaner',
        class: 'cleaner',
        cleaning: true
      },
      priority: 6,
      parts: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
    },
    // remoteHarvester: {
    //   population: 2,
    //   initialMemory: {
    //     role: 'remoteHarvester',
    //     class: 'harvester',
    //     mining: true
    //   },
    //   priority: 7,
    //   parts: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, ATTACK]
    // },
    // remoteRepairer: {
    //   population: 1,
    //   initialMemory: {
    //     role: 'remoteRepairer',
    //     class: 'repairer',
    //     ready: false,
    //     arrived: false
    //   },
    //   priority: 8,
    //   parts: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, MOVE, MOVE, MOVE]
    // },
    // claimer: {
    //   population: 1,
    //   initialMemory: {
    //     role: 'claimer',
    //     class: 'claimer'
    //   },
    //   priority: 9,
    //   parts: [CLAIM, MOVE, MOVE] // 700
    // },
    // reserver: {
    //   population: 0,
    //   initialMemory: {
    //     role: 'reserver',
    //     class: 'reserver'
    //   },
    //   priority: 10,
    //   parts: [CLAIM, CLAIM, MOVE] // 1250
    // },
    // remoteMiner: {
    //   population: 1
    // },
    // defender: {
    //   population: 0,
    //   initialMemory: {
    //     role: 'defender',
    //     class: 'dealer'
    //   },
    //   priority: 1,
    //   parts: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, MOVE, ATTACK] // 550
    // },
    // explorer: {
    //   population: 0,
    //   initialMemory: {
    //     role: 'explorer',
    //     class: 'explorer',
    //     arrived: false
    //   },
    //   priority: 12,
    //   parts: [WORK, CARRY, MOVE, MOVE] // 300
    // },
    capitolBuilder: {
      population: 0,
      initialMemory: {
        role: 'capitolBuilder',
        class: 'builder',
        arrived: false
      },
      priority: 12,
      parts: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE] // 1000
    },
    capitolMiner: {
      population: 3,
      initialMemory: {
        role: 'capitolMiner',
        class: 'miner',
        arrived: false
      },
      priority: 12,
      parts: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE] // 1050
    },
    capitolRepairer: {
      population: 1,
      initialMemory: {
        role: 'capitolRepairer',
        class: 'repairer',
        arrived: false
      },
      priority: 12,
      parts: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE] // 750
    },
    capitolDefender: {
      population: 0,
      initialMemory: {
        role: 'capitolDefender',
        class: 'dealer',
        arrived: false
      },
      priority: 12,
      parts: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK] // 1290
    },
    capitolHealer: {
      population: 0,
      initialMemory: {
        role: 'capitolHealer',
        class: 'healer',
        arrived: false
      },
      priority: 12,
      parts: [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL, HEAL] // 1300
    },
    capitolHauler: {
      population: 0,
      initialMemory: {
        role: 'capitolHauler',
        class: 'hauler',
        arrived: false
      },
      priority: 12,
      parts: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE] // 1300
    }
  },
  dispatch: {
    harvester: {
      fromRoom: 'W3N7',
      fromSpawn: 'Spawn2',
      population: 0,
      initialMemory: {
        role: 'harvester',
        class: 'harvester',
        dispatch: true,
        dispatchSite: 'W3N5',
        dispatchSiteArrived: false
      },
      parts: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
    },
    builder: {
      fromRoom: 'W3N7',
      fromSpawn: 'Spawn2',
      population: 0,
      initialMemory: {
        role: 'builder',
        class: 'builder',
        building: false,
        dispatch: true,
        dispatchSite: 'W3N5',
        dispatchSiteArrived: false
      },
      parts: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
    },
    miner: {
      fromRoom: 'W3N7',
      fromSpawn: 'Spawn2',
      population: 0,
      initialMemory: {
        role: 'miner',
        class: 'miner',
        dispatch: true,
        dispatchSite: 'W3N5',
        dispatchSiteArrived: false
      },
      parts: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE]
    },
    upgrader: {
      fromRoom: 'W3N7',
      fromSpawn: 'Spawn2',
      population: 0,
      initialMemory: {
        role: 'upgrader',
        class: 'upgrader',
        dispatch: true,
        dispatchSite: 'W3N5',
        dispatchSiteArrived: false
      },
      parts: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
    },
    repairer: {
      fromRoom: 'W3N7',
      fromSpawn: 'Spawn2',
      population: 0,
      initialMemory: {
        role: 'repairer',
        class: 'repairer',
        repairing: false,
        dispatch: true,
        dispatchSite: 'W3N5',
        dispatchSiteArrived: false
      },
      parts: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE] // 500
    }
  }
};
