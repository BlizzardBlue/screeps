import {RoomSettings} from './RoomSettings';

export const W4N7: RoomSettings = {
  dispatch: {
    builder: {
      fromRoom: 'W3N7',
      fromSpawn: 'Spawn2',
      population: 0,
      initialMemory: {
        role: 'builder',
        class: 'builder',
        building: false,
        dispatch: true,
        dispatchSite: 'W4N7',
        dispatchSiteArrived: false
      },
      parts: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
    },
    miner: {
      fromRoom: 'W3N7',
      fromSpawn: 'Spawn2',
      population: 1,
      initialMemory: {
        role: 'miner',
        class: 'miner',
        dispatch: true,
        dispatchSite: 'W4N7',
        dispatchSiteArrived: false
      },
      parts: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE]
    },
    repairer: {
      fromRoom: 'W3N7',
      fromSpawn: 'Spawn2',
      population: 1,
      initialMemory: {
        role: 'repairer',
        class: 'repairer',
        repairing: false,
        dispatch: true,
        dispatchSite: 'W4N7',
        dispatchSiteArrived: false
      },
      parts: [WORK, WORK, CARRY, CARRY, MOVE, MOVE]
    },
    hauler: {
      fromRoom: 'W3N7',
      fromSpawn: 'Spawn2',
      population: 1,
      initialMemory: {
        role: 'hauler',
        class: 'hauler',
        dispatch: true,
        dispatchSite: 'W4N7',
        dispatchSiteArrived: false,
        arrived: false
        // pickupRoom: 'W4N7'
      },
      parts: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
    }
  }
};
