import {RoomSettings} from './RoomSettings';

export const W5N5: RoomSettings = {
  dispatch: {
    builder: {
      fromRoom: 'W3N5',
      fromSpawn: 'Spawn3',
      population: 0,
      initialMemory: {
        role: 'builder',
        class: 'builder',
        building: false,
        dispatch: true,
        dispatchSite: 'W5N5',
        dispatchSiteArrived: false
      },
      parts: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
    },
    miner: {
      fromRoom: 'W3N5',
      fromSpawn: 'Spawn3',
      population: 0,
      initialMemory: {
        role: 'miner',
        class: 'miner',
        dispatch: true,
        dispatchSite: 'W5N5',
        dispatchSiteArrived: false
      },
      parts: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE]
    },
    repairer: {
      fromRoom: 'W3N5',
      fromSpawn: 'Spawn3',
      population: 0,
      initialMemory: {
        role: 'repairer',
        class: 'repairer',
        repairing: false,
        dispatch: true,
        dispatchSite: 'W5N5',
        dispatchSiteArrived: false
      },
      parts: [WORK, WORK, CARRY, CARRY, MOVE, MOVE]
    },
    hauler: {
      fromRoom: 'W3N5',
      fromSpawn: 'Spawn3',
      population: 5,
      initialMemory: {
        role: 'hauler',
        class: 'hauler',
        dispatch: true,
        dispatchSite: 'W5N5',
        dispatchSiteArrived: false,
        arrived: false
        // pickupRoom: 'W5N5'
      },
      parts: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
    }
  }
};
