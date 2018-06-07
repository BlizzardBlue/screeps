import {Settings} from '../settings';
import {RoomSettings} from './RoomSettings';

export const W3N7: RoomSettings = {
  spawn: {
    name: 'Spawn2'
  },
  creep: {
    harvester: {
      population: 2,
      initialMemory: {
        role: 'harvester'
      },
      priority: 0,
      parts: [WORK, CARRY, CARRY, MOVE, MOVE] // 300
    },
    miner: {
      population: 1,
      initialMemory: {
        role: 'miner'
      },
      priority: 4,
      parts: [WORK, WORK, WORK, WORK, WORK, MOVE] // 550
    },
    miner2: {
      population: 1,
      initialMemory: {
        role: 'miner2'
      },
      priority: 4,
      parts: [WORK, WORK, WORK, WORK, WORK, MOVE] // 550
    },
    builder: {
      population: 0,
      initialMemory: {
        role: 'builder',
        building: false
      },
      priority: 1,
      parts: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE] // 800
    },
    upgrader: {
      population: 3,
      initialMemory: {
        role: 'upgrader'
      },
      priority: 3,
      parts: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE] // 550
    },
    repairer: {
      population: 2,
      initialMemory: {
        role: 'repairer',
        repairing: false
      },
      priority: 2,
      parts: [WORK, WORK, CARRY, CARRY, MOVE, MOVE] // 400
    },
    // pioneer: {
    //   population: 0,
    //   initialMemory: {
    //     role: 'pioneer'
    //   },
    //   priority: 5,
    //   parts: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, CARRY, MOVE, CARRY, CARRY, MOVE, MOVE, ATTACK]
    // },
    cleaner: {
      population: 1,
      initialMemory: {
        role: 'cleaner',
        cleaning: true
      },
      priority: 6,
      parts: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE] // 450
    },
    // remoteHarvester: {
    //   population: 2,
    //   initialMemory: {
    //     role: 'remoteHarvester',
    //     mining: true
    //   },
    //   priority: 7,
    //   parts: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, ATTACK]
    // },
    // remoteRepairer: {
    //   population: 1,
    //   initialMemory: {
    //     role: 'remoteRepairer',
    //     ready: false,
    //     arrived: false
    //   },
    //   priority: 8,
    //   parts: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, MOVE, ATTACK, ATTACK]
    // },
    // claimer: {
    //   population: 0,
    //   initialMemory: {
    //     role: 'claimer'
    //   },
    //   priority: 9,
    //   parts: [CLAIM, CLAIM, CLAIM, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE] // 2100
    // },
    // reserver: {
    //   population: 0,
    //   initialMemory: {
    //     role: 'reserver'
    //   },
    //   priority: 10,
    //   parts: [CLAIM, CLAIM, MOVE] // 1250
    // }
    // remoteMiner: {
    //   population: 1
    // },
    defender: {
      population: 0,
      initialMemory: {
        role: 'defender'
      },
      priority: 1,
      parts: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, MOVE, ATTACK] // 550
    }
  }
};
