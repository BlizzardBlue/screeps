const _ = require('lodash');
// import {ErrorMapper} from 'utils/ErrorMapper';

import {settings} from 'config/settings';
import {roleMap} from 'roles/roleMap';
import {systemSettings} from './config/systemSettings';

import {intel} from './config/intel';
import {SpawnQueue} from './queues/SpawnQueue';
import {RoomMemoryInitializer} from './tasks/RoomMemoryInitializer';
import {ThreatMonitor} from './tasks/ThreatMonitor';
import {ThreatMonitorHelper} from './tasks/ThreatMonitorHelper';

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
// export const loop = ErrorMapper.wrapLoop(() => {
export const loop = () => {
  const capitolRoomName: string = intel.alias.capitol.roomName;

  // 죽은 크립 메모리 청소
  for (const name of Object.keys(Memory.creeps)) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
      console.log(`[Task] Cleared non-existing creep memory: ${name}`);
    }
  }

  // Tasks 실행
  for (const roomName of Object.keys(Game.rooms)) {
    const roomMemoryInitializer: RoomMemoryInitializer = new RoomMemoryInitializer(Game.rooms[roomName]);
    roomMemoryInitializer.initialize();
    const threatMonitor: ThreatMonitor = new ThreatMonitor(Game.rooms[roomName]);
    threatMonitor.invader();
    threatMonitor.hostile();
  }
  for (const roomName of Object.keys(Memory.rooms)) {
    const threatMonitorHelper: ThreatMonitorHelper = new ThreatMonitorHelper(Memory.rooms[roomName]);
    threatMonitorHelper.validateInvaderExpireAt();
  }

  // 설정으로 등록해둔 방에서 크립 생산
  for (const roomName of Object.keys(settings.rooms)) {
    const roomSetting = settings.rooms[roomName];
    const spawnName = roomSetting.spawn.name;

    for (const creepType of Object.keys(roomSetting.creep)) {
      // 캐피톨에 인베이더가 침입하면, 캐피톨 크립들은 생산하지 않음
      if (creepType === ('capitolBuilder' || 'capitolHauler' || 'capitolMiner' || 'capitolRepairer') && Memory.rooms[capitolRoomName].invader) {
        break;
      }
      const creepSetting = roomSetting.creep[creepType];

      // 타입이 같고 && 고향이 같고 && 살아있는 크립의 수 계산
      const liveCreeps = _.filter(Game.creeps, (creep: any) => {
        return creep.memory.role === creepType && creep.memory.home === roomName;
      });

      // 설정해둔 개체수 목표치 이하면 생산
      if (liveCreeps.length < creepSetting.population) {
        const newName = `${creepType}_${roomName}_${Game.time}`;
        // 메모리에 정보 추가
        // TODO: 추가하는 방식 개선 (큐에서 애매함)
        const additionalMemory = {
          home: roomName,
          spawn: spawnName
        };
        Game.spawns[spawnName].spawnCreep(creepSetting.parts, newName, {
          memory: _.merge(additionalMemory, creepSetting.initialMemory)
        });
      }
    }
  }

  // 크립 생산시, 스폰 옆에 메시지를 띄움
  for (const spawnName of Object.keys(Game.spawns)) {
    const spawn: StructureSpawn = Game.spawns[spawnName];
    if (spawn.spawning) {
      const spawningCreep = Game.creeps[spawn.spawning.name];
      spawn.room.visual.text(`🛠️ ${spawningCreep.memory.role}`, spawn.pos.x + 1, spawn.pos.y, {
        align: 'left',
        opacity: 0.8
      });
    }
  }

  // 타워 관련
  // TODO: 코드 개선
  const towerIds: string[] = [
    '5b132f1de77af90020399c2f',
    '5b186b836c39f600211ac970',
    '5b1b075d8b2122002511e982',
    '5b14bb351dca9e002421adaa'
  ];
  for (const towerId of towerIds) {
    const tower = Game.getObjectById(towerId) as StructureTower;
    if (tower) {
      const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if (closestHostile) {
        tower.attack(closestHostile);
        // const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        //   filter: (structure) => structure.hits < structure.hitsMax
        // });
        // if (closestDamagedStructure) {
        //   tower.repair(closestDamagedStructure);
        // }
      }
    }
  }

  // 스폰 큐 소비
  for (const spawnName of Object.keys(Game.spawns)) {
    const spawnQueue: SpawnQueue = new SpawnQueue(spawnName);
    const spawn: StructureSpawn = Game.spawns[spawnName];
    const roomName: string = spawn.room.name;

    if (!spawn.spawning) {
      const newCreep = spawnQueue.consume();
      if (newCreep) {
        const role: string = newCreep.initialMemory.role;
        newCreep.name = newCreep.name || `${role}_${roomName}_${Game.time}`;
        Game.spawns[spawnName].spawnCreep(newCreep.parts, newCreep.name, {
          memory: newCreep.initialMemory
        });
        console.log(`[Queue | ${spawnName}] Consumed: ${newCreep.name}`);
      }
    }
  }

  // 크립 run()
  for (const name of Object.keys(Game.creeps)) {
    const creepClass = roleMap[Game.creeps[name].memory.role];
    const creep = new creepClass(Game.creeps[name]);
    const runResult = creep.run();
    if (runResult !== 0 && !_.isUndefined(runResult)) {
      console.log(new Error(`creepName: ${name} / Errorcode: ${runResult}`));
    }
  }

  // 시스템 설정
  if (systemSettings.metric) {
    console.log(`[CPU] ${Game.cpu.getUsed().toPrecision(3)} | [Memory] ${Game.cpu.getHeapStatistics().total_heap_size / 1024} KB`);
  }
  if (systemSettings.metricAlert) {
    if (Game.cpu.getUsed() >= 100) {
      console.log(`[Alert | CPU] ${Game.cpu.getUsed().toPrecision(3)} (Bucket: ${Game.cpu.bucket})`);
    }
  }
};
