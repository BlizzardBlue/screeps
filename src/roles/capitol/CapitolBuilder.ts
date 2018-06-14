import {intel} from '../../config/intel';
import {StorageModel} from '../../models/StorageModel';
import {CapitolRole} from './CapitolRole';

export class CapitolBuilder extends CapitolRole {
  public capitolRoomName: string;
  private storageModel: StorageModel;

  constructor(creep: Creep) {
    super(creep);
    this.capitolRoomName = intel.alias.capitol.roomName;
    this.storageModel = new StorageModel(creep);
  }

  public run() {
    // 인베이더가 침입하면 집으로 도망감
    // if (Memory.rooms[capitolRoomName].invader) {
    //   creep.memory.underEvacuation = true;
    //   if (creep.room.name === creep.memory.home) {
    //     // TODO: 모듈화
    //     creep.say('♻️', true);
    //     const spawn: StructureSpawn = creep.room.find(FIND_MY_SPAWNS)[0];
    //     const renewResult = spawn.recycleCreep(creep);
    //     switch (renewResult) {
    //       case OK:
    //         console.log(`[Spawn | ${spawn.name}] Recycled: ${creep.name}`);
    //         break;
    //       case ERR_BUSY:
    //         creep.moveTo(spawn, {reusePath: 4});
    //         break;
    //       case ERR_NOT_IN_RANGE:
    //         creep.moveTo(spawn, {reusePath: 4});
    //         break;
    //       default:
    //         creep.say(`Err: ${renewResult}`);
    //     }
    //     return true;
    //   } else {
    //     creep.say('🆘', true);
    //     return navigate.fromCapitoltoHome();
    //   }
    // } else {
    //   creep.memory.underEvacuation = false;
    // }

    if (this.creep.carry.energy === 0) {
      if (this.creep.memory.arrived && this.creep.memory.ready) {
        // find closest source
        const source = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        // try to harvest energy, if the source is not in range
        if (!source) {
          this.creep.memory.ready = false;
          this.creep.memory.arrived = false;
          this.creep.memory.harvesting = false;
        } else {
          this.creep.say('현지조달!', true);
          this.creep.memory.ready = false;
          this.creep.memory.harvesting = true;
        }
      }
    }

    if (this.creep.memory.harvesting && this.creep.carry.energy === this.creep.carryCapacity) {
      this.creep.memory.ready = true;
      this.creep.memory.harvesting = false;
    }

    if (this.creep.memory.harvesting) {
      // TODO: 모듈화
      // find closest container
      const container = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s: any) => {
          return s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 100;
        }
      });
      // if one was found
      if (container !== null) {
        // try to withdraw energy, if the container is not in range
        if (this.creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          // move towards it
          this.creep.moveTo(container, {reusePath: 4});
        }
      } else {
        const source = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if (this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
          return this.creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 4});
        }
      }
    }

    if (this.creep.carry.energy === this.creep.carryCapacity) {
      this.creep.memory.ready = true;
    }

    // 출발 전 에너지 채우기
    if (!this.creep.memory.ready && !this.creep.memory.harvesting) {
      if (this.creep.room.name === intel.rooms[this.home].name) {
        this.storageModel.withdraw('energy');
      }
    }

    if (this.creep.memory.ready) {
      if (!this.creep.memory.arrived) {
        return this.navigate.toCapitol();
      } else {
        const target: ConstructionSite = this.creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if (target) {
          if (this.creep.build(target) === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 4});
          }
        }
      }
    }
  }
}
