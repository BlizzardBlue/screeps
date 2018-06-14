import {RoomSettings} from './RoomSettings';

export const W3N6: RoomSettings = {
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
        dispatchSite: 'W3N6',
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
        dispatchSite: 'W3N6',
        dispatchSiteArrived: false
      },
      parts: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE]
    },
    miner2: {
      fromRoom: 'W3N7',
      fromSpawn: 'Spawn2',
      population: 1,
      initialMemory: {
        role: 'miner2',
        class: 'miner',
        dispatch: true,
        dispatchSite: 'W3N6',
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
        dispatchSite: 'W3N6',
        dispatchSiteArrived: false
      },
      parts: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE] // 500
    },
    defender: {
      fromRoom: 'W3N7',
      fromSpawn: 'Spawn2',
      population: 0,
      initialMemory: {
        role: 'defender',
        class: 'dealer',
        dispatch: true,
        dispatchSite: 'W3N6',
        dispatchSiteArrived: false
      },
      parts: [TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK]
    },
    hauler: {
      fromRoom: 'W3N5',
      fromSpawn: 'Spawn3',
      population: 2,
      initialMemory: {
        role: 'hauler',
        class: 'hauler',
        dispatch: true,
        dispatchSite: 'W3N6',
        dispatchSiteArrived: false,
        arrived: false
        // pickupRoom: 'W3N6'
      },
      parts: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
    }
  }
};
