import {intel} from '../../config/intel';
import {RoomMemoryModel} from '../../models/memory/RoomMemoryModel';
import {CapitolRole} from './CapitolRole';

export class CapitolMiner extends CapitolRole {
  public capitolRoomName: string;
  private roomMemoryModel: RoomMemoryModel;

  constructor(creep: Creep) {
    super(creep);
    this.capitolRoomName = intel.alias.capitol.roomName;
    this.roomMemoryModel = new RoomMemoryModel(this.capitolRoomName, creep);
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
    //         creep.moveTo(spawn, {reusePath: 1});
    //         break;
    //       case ERR_NOT_IN_RANGE:
    //         creep.moveTo(spawn, {reusePath: 1});
    //         break;
    //       default:
    //         creep.say(`Err: ${renewResult}`);
    //     }
    //     return true;
    //   } else {
    //     creep.say('🆘', true);
    //     if (creep.memory.reservedSourceId) {
    //       const releaseResult = roomMemoryModel.releaseSource(creep.memory.reservedSourceId);
    //       if (releaseResult) {
    //         delete creep.memory.reservedSourceId;
    //       }
    //     }
    //     return navigate.fromCapitoltoHome();
    //   }
    // } else {
    //   creep.memory.underEvacuation = false;
    // }

    if (this.creep.memory.reservedSourceId) {
      // 공격받기 시작하거나 3틱안에 수명이 다하면 소스 예약 해제
      if (this.creep.hits < this.creep.hitsMax || this.creep.ticksToLive < 3) {
        return this.roomMemoryModel.releaseSource(this.creep.memory.reservedSourceId);
      }
    }

    // 캐피톨로 이동
    if (!this.creep.memory.arrived) {
      return this.navigate.toCapitol();
    } else {
      // 예약한 소스가 없으면 소스 예약
      if (!this.creep.memory.reservedSourceId) {
        // 캐피톨 도착시 룸 메모리 초기화
        this.roomMemoryModel.initializeMemory();

        // 예약되지 않은 소스 조회
        const unreservedSourceId: string = this.roomMemoryModel.getUnreservedSources()[0];

        if (unreservedSourceId) {
          // 소스 예약하고, 크립 메모리에 소스ID 할당
          this.creep.memory.reservedSourceId = this.roomMemoryModel.reserveSource(unreservedSourceId);
        } else {
          // 예약 실패
          this.creep.say('빈 소스가 없어요!', true);
        }
      } else {
        // 크립 메모리에서 예약한 소스ID 가져옴
        const source: Source = Game.getObjectById(this.creep.memory.reservedSourceId);

        // 소스 근처 컨테이너 탐색
        const container = source.pos.findInRange(FIND_STRUCTURES, 1, {
          filter: (s: any) => { // TODO: any 개선
            return s.structureType === STRUCTURE_CONTAINER;
          }
        })[0];

        // 소스 근처 컨테이너 없으면
        if (!container) {
          this.creep.say('컨테이너가 없어요!', true);
        } else {
          // 마이너가 컨테이너 위에 올라가있으면 채굴 시작
          if (this.creep.pos.isEqualTo(container.pos)) {
            this.creep.harvest(source);
          } else {
            this.creep.moveTo(container, {reusePath: 1});
          }
        }
      }
    }
  }
}
