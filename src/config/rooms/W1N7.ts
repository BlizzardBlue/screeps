import {Settings} from '../settings';
import {RoomSettings} from './RoomSettings';

export const W1N7: RoomSettings = {
  spawn: {
    name: 'Spawn1'
  },
  creep: {
    harvester: {
      population: 4,
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
      parts: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE]
    },
    miner2: {
      population: 1,
      initialMemory: {
        role: 'miner2',
        class: 'miner'
      },
      priority: 4,
      parts: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE]
    },
    builder: {
      population: 0,
      initialMemory: {
        role: 'builder',
      class: 'builder',
        building: false
      },
      priority: 1,
      parts: [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
    },
    upgrader: {
      population: 3,
      initialMemory: {
        role: 'upgrader',
        class: 'upgrader'
      },
      priority: 3,
      parts: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
    },
    repairer: {
      population: 1,
      initialMemory: {
        role: 'repairer',
      class: 'repairer',
        repairing: false
      },
      priority: 2,
      parts: [WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE] // 1600
    },
    pioneer: {
      population: 0,
      initialMemory: {
        role: 'pioneer',
        class: 'pioneer'
      },
      priority: 5,
      parts: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, CARRY, MOVE, CARRY, CARRY, MOVE, MOVE, ATTACK]
    },
    cleaner: {
      population: 1,
      initialMemory: {
        role: 'cleaner',
        class: 'cleaner',
        cleaning: true
      },
      priority: 6,
      parts: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
    },
    remoteHarvester: {
      population: 2,
      initialMemory: {
        role: 'remoteHarvester',
        class: 'harvester',
        mining: true
      },
      priority: 7,
      parts: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, ATTACK]
    },
    remoteRepairer: {
      population: 1,
      initialMemory: {
        role: 'remoteRepairer',
        class: 'repairer',
        ready: false,
        arrived: false
      },
      priority: 8,
      parts: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, MOVE, ATTACK, ATTACK]
    },
    claimer: {
      population: 0,
      initialMemory: {
        role: 'claimer',
        class: 'claimer'
      },
      priority: 9,
      parts: [CLAIM, CLAIM, CLAIM, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE] // 2100
    },
    reserver: {
      population: 0,
      initialMemory: {
        role: 'reserver',
        class: 'reserver'
      },
      priority: 10,
      parts: [CLAIM, CLAIM, MOVE] // 1250
    },
    // remoteMiner: {
    //   population: 1
    // }
    mineralMiner: {
      population: 0,
      initialMemory: {
        role: 'mineralMiner',
        class: 'miner'
      },
      priority: 11,
      parts: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE] // 1150
    },
    capitolRepairer: {
      population: 2,
      initialMemory: {
        role: 'capitolRepairer',
        class: 'repairer',
        arrived: false
      },
      priority: 12,
      parts: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE] // 600
    },
    capitolDefender: {
      population: 2,
      initialMemory: {
        role: 'capitolDefender',
        class: 'dealer',
        arrived: false
      },
      priority: 12,
      parts: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, MOVE, ATTACK, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK] // 1550
    },
    capitolHealer: {
      population: 4,
      initialMemory: {
        role: 'capitolHealer',
        class: 'healer',
        arrived: false
      },
      priority: 12,
      parts: [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL, HEAL, HEAL] // 1750
    },
    capitolHauler: {
      population: 4,
      initialMemory: {
        role: 'capitolHauler',
        class: 'hauler',
        arrived: false
      },
      priority: 12,
      parts: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE] // 1700
    }
  }
};
