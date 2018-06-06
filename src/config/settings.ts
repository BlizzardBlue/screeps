interface Settings {
  mode: string;
  creep: {
    [creepType: string]: {
      population: number;
      initialMemory: any;
      priority: number;
      parts: BodyPartConstant[];
    };
  };
}

export const settings: Settings = {
  mode: 'normal', // ['normal','harvest','build','upgrade']
  creep: {
    harvester: {
      population: 2,
      initialMemory: {
        role: 'harvester'
      },
      priority: 0,
      parts: [CARRY, CARRY, CARRY, MOVE, MOVE]
    },
    miner: {
      population: 1,
      initialMemory: {
        role: 'miner'
      },
      priority: 4,
      parts: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE]
    },
    miner2: {
      population: 1,
      initialMemory: {
        role: 'miner2'
      },
      priority: 4,
      parts: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE]
    },
    builder: {
      population: 0,
      initialMemory: {
        role: 'builder',
        building: false
      },
      priority: 1,
      parts: [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
    },
    upgrader: {
      population: 2,
      initialMemory: {
        role: 'upgrader'
      },
      priority: 3,
      parts: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
    },
    repairer: {
      population: 1,
      initialMemory: {
        role: 'repairer',
        repairing: false
      },
      priority: 2,
      parts: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
    },
    pioneer: {
      population: 0,
      initialMemory: {
        role: 'pioneer'
      },
      priority: 5,
      parts: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, ATTACK]
    },
    cleaner: {
      population: 1,
      initialMemory: {
        role: 'cleaner',
        cleaning: true
      },
      priority: 6,
      parts: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
    },
    remoteHarvester: {
      population: 2,
      initialMemory: {
        role: 'remoteHarvester',
        mining: true
      },
      priority: 7,
      parts: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, ATTACK]
    },
    remoteRepairer: {
      population: 1,
      initialMemory: {
        role: 'remoteRepairer',
        ready: false,
        arrived: false
      },
      priority: 8,
      parts: [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, MOVE, ATTACK, ATTACK]
    },
    claimer: {
      population: 1,
      initialMemory: {
        role: 'claimer'
      },
      priority: 9,
      parts: [CLAIM, CLAIM, CLAIM, MOVE, MOVE] // 1900
    }
  }
};
