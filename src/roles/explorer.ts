import {intel} from '../config/intel';
import {Navigate} from '../utils/Navigate';
// import {StorageModel} from '../models/StorageModel';

export const explorer = {
  run: (creep: Creep) => {
    const home = creep.memory.home;
    // const storageModel: StorageModel = new StorageModel(creep);
    const targetFlag = Game.flags.explorerTarget;
    // const entrance = intel.rooms[home].entrance.roomPosition;
    const navigate: Navigate = new Navigate(creep);

    if (!creep.memory.arrived) {
      navigate.toFlag(targetFlag);
    }
    creep.say('호-하!', true);
  }

  //   if (creep.memory.harvesting && creep.carry.energy === creep.carryCapacity) {
  //     creep.memory.ready = true;
  //     creep.memory.harvesting = false;
  //   }
  //
  //   if (creep.memory.harvesting) {
  //     const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
  //     if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
  //       creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 1});
  //       return;
  //     }
  //   }
  //
  //   if (creep.carry.energy === creep.carryCapacity) {
  //     creep.memory.ready = true;
  //   }
  //
  //   if (creep.memory.ready && !creep.memory.arrived && creep.pos.isEqualTo(targetFlag.pos)) {
  //     creep.say('도착!', true);
  //     creep.memory.arrived = true;
  //   }
  //
  //   if (!creep.memory.ready && !creep.memory.harvesting) {
  //     if (creep.room.name !== intel.rooms[home].name) {
  //       creep.moveTo(entrance, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 1});
  //     } else {
  //       storageModel.withdraw('energy');
  //     }
  //   }
  //
  //   if (creep.memory.ready) {
  //     if (!creep.memory.arrived) {
  //       creep.moveTo(targetFlag, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 1});
  //     } else {
  //       const target: ConstructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
  //       if (target) {
  //         if (creep.build(target) === ERR_NOT_IN_RANGE) {
  //           creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 1});
  //         }
  //       }
  //     }
  //   }
  // }
};
