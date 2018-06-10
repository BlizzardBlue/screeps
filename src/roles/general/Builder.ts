import {GeneralRole} from './GeneralRole';

/**
 * 룸 상주형 건축공
 */
export class Builder extends GeneralRole {
  public dismantleFlag: Flag;

  constructor(creep: Creep) {
    super(creep, {
      targetTicksToLiveOnDispatch: 200
    });
    this.dismantleFlag = Game.flags.dismantle_1;
  }

  public run() {
    // 파견지에 도착하면 메모리의 arrived값 true로 변경
    if (this.dispatch && this.creep.pos.inRangeTo(new RoomPosition(21, 29, this.dispatchSite), 4)) {
      this.creep.say('도착!', true);
      this.creep.memory.arrived = true;
    }

    // 파견근무용 크립일경우 파견지로 이동
    if (this.dispatch && !this.arrived) {
      this.creep.say(`${this.dispatchSite}로 가는 중!`, true);
      return this.navigate.toDispatchSite();
    }

    // 파견지에서 수명 연장
    if (this.dispatch && this.creep.ticksToLive < this.creepSettings.targetTicksToLiveOnDispatch) {
      this.creep.memory.renewing = true;
    } else if (this.dispatch && this.creep.ticksToLive > 1400) {
      this.creep.memory.renewing = false;
    }
    if (this.dispatch && this.creep.memory.renewing) {
      this.creep.say('수명 연장 비활성화 됨', true); // TODO: 파견지에 스토리지 생기고 나면, 수명 연장 다시 활성화
      // return this.renewAtDispatchSite();
    }

    if (this.creep.memory.building && this.creep.carry.energy === 0) {
      // console.log(this.creep.name, '2');
      this.creep.memory.building = false;
      this.creep.say('⛏️', true);
    }

    if (!this.creep.memory.building && this.creep.carry.energy === this.creep.carryCapacity) {
      // console.log(this.creep.name, '3');
      this.creep.memory.building = true;
      this.creep.say('🚧', true);
    }

    if (this.creep.memory.building) {
      if (this.dismantleFlag) {
        // console.log(this.creep.name, '4');
        const dismantleTargets = this.creep.room.lookAt(this.dismantleFlag.pos);
        const filteredTargets = dismantleTargets.filter((target) => {
          if (target.type === 'structure') {
            return target.structure;
          }
        });
        if (filteredTargets) {
          // console.log(this.creep.name, '5');
          for (const target of filteredTargets) {
            if (this.creep.dismantle(target.structure) === ERR_NOT_IN_RANGE) {
              this.creep.moveTo(target.structure);
            }
          }
        }
      } else {
        // console.log(this.creep.name, '6');
        const target: ConstructionSite = this.creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if (target) {
          // console.log(this.creep.name, '7');
          if (this.creep.build(target) === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 1});
          }
        }
      }
    }

    if (!this.creep.memory.building) {
      // console.log(this.creep.name, '8');
      // find closest container
      const container: any = this.creep.pos.findClosestByPath(FIND_STRUCTURES, { // TODO: any 개선
        filter: (s: any) => {
          return s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 200;
        }
      });

      // if one was found
      if (container !== null) {
        // console.log(this.creep.name, '9');
        // try to withdraw energy, if the container is not in range
        if (this.creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          // move towards it
          this.creep.moveTo(container, {reusePath: 1});
        }
      } else {
        // console.log(this.creep.name, '10');
        // find closest source

        // const source = Game.getObjectById(this.creep.room.rooms[this.home].sources.secondary.id) as Source; // let source = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        // try to harvest energy, if the source is not in range
        const source = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if (this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
          return this.creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 1});
        }
      }
    }
  }
}
