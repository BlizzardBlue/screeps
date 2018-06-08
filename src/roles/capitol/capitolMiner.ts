import {intel} from '../../config/intel';
import {RoomMemoryModel} from '../../models/memory/RoomMemoryModel';
import {Navigate} from '../../utils/Navigate';

export const capitolMiner = {
  run: (creep: Creep) => {
    const capitolRoomName: string = intel.alias.capitol.roomName;
    const navigate: Navigate = new Navigate(creep);
    const roomMemoryModel: RoomMemoryModel = new RoomMemoryModel(capitolRoomName, creep);

    // 인베이더가 침입하면 집으로 도망감
    if (Memory.rooms[capitolRoomName].invader) {
      return navigate.fromCapitoltoHome();
    }

    if (creep.memory.reservedSourceId) {
      // 공격받기 시작하거나 3틱안에 수명이 다하면 소스 예약 해제
      if (creep.hits < creep.hitsMax || creep.ticksToLive < 3) {
        return roomMemoryModel.releaseSource(creep.memory.reservedSourceId);
      }
    }

    // 캐피톨로 이동
    if (!creep.memory.arrived) {
      return navigate.toCapitol();
    } else {
      // 예약한 소스가 없으면 소스 예약
      if (!creep.memory.reservedSourceId) {
        // 캐피톨 도착시 룸 메모리 초기화
        roomMemoryModel.initializeMemory();

        // 예약되지 않은 소스 조회
        const unreservedSourceId: string = roomMemoryModel.getUnreservedSources()[0];

        if (unreservedSourceId) {
          // 소스 예약하고, 크립 메모리에 소스ID 할당
          creep.memory.reservedSourceId = roomMemoryModel.reserveSource(unreservedSourceId);
        } else {
          // 예약 실패
          creep.say('빈 소스가 없어요!', true);
        }
      } else {
        // 크립 메모리에서 예약한 소스ID 가져옴
        const source: Source = Game.getObjectById(creep.memory.reservedSourceId);

        // 소스 근처 컨테이너 탐색
        const container = source.pos.findInRange(FIND_STRUCTURES, 1, {
          filter: (s: any) => { // TODO: any 개선
            return s.structureType === STRUCTURE_CONTAINER;
          }
        })[0];

        // 소스 근처 컨테이너 없으면
        if (!container) {
          creep.say('컨테이너가 없어요!', true);
        } else {
          // 마이너가 컨테이너 위에 올라가있으면 채굴 시작
          if (creep.pos.isEqualTo(container.pos)) {
            creep.harvest(source);
          } else {
            creep.moveTo(container, {reusePath: 1});
          }
        }
      }
    }
  }
};
