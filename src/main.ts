const _ = require('lodash');
// import {ErrorMapper} from 'utils/ErrorMapper';

import {settings} from 'config/settings';
import {roleMap} from 'roles/roleMap';
import {systemSettings} from './config/systemSettings';

import {intel} from './config/intel';
import {SpawnQueue} from './queues/SpawnQueue';
import {CreepMemoryCleaner} from './tasks/CreepMemoryCleaner';
import {DispatchFulfillmentMonitor} from './tasks/DispatchFulfillmentMonitor';
import {calculateDispatchFulfillmentSpawnQueued, dispatchFulfillmentValidate} from './tasks/dispatchFulfillmentValidate';
import {RoomMemoryInitializer} from './tasks/RoomMemoryInitializer';
import {ThreatMonitor} from './tasks/ThreatMonitor';
import {ThreatMonitorHelper} from './tasks/ThreatMonitorHelper';

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
// export const loop = ErrorMapper.wrapLoop(() => {
export const loop = () => {
  /**
   * Tasks 실행
   */
  // 룸 메모리에 남아있는 죽은 크립들부터 제거
  dispatchFulfillmentValidate();
  // 스폰 큐를 읽어 각 룸의 dispatchFulfillment.spawnQueued 값을 갱신함
  calculateDispatchFulfillmentSpawnQueued();
  // Game.rooms 관련
  for (const roomName of Object.keys(Game.rooms)) {
    // RoomMemoryInitializer
    const roomMemoryInitializer: RoomMemoryInitializer = new RoomMemoryInitializer(Game.rooms[roomName]);
    roomMemoryInitializer.initialize();
    // ThreatMonitor
    const threatMonitor: ThreatMonitor = new ThreatMonitor(Game.rooms[roomName]);
    threatMonitor.invader();
    threatMonitor.hostile();
  }
  // Memory.creeps 관련
  for (const name of Object.keys(Memory.creeps)) {
    // CreepMemoryCleaner
    const creepMemoryCleaner: CreepMemoryCleaner = new CreepMemoryCleaner(name);
    creepMemoryCleaner.forgetDeadCreeps();
  }
  // Game.creeps 관련
  for (const creepName of Object.keys(Game.creeps)) {
    // DispatchFulfillmentMonitor
    const dispatchFulfillmentMonitor: DispatchFulfillmentMonitor = new DispatchFulfillmentMonitor(creepName);
    dispatchFulfillmentMonitor.run();
  }
  // Memory.rooms 관련
  for (const roomName of Object.keys(Memory.rooms)) {
    const threatMonitorHelper: ThreatMonitorHelper = new ThreatMonitorHelper(Memory.rooms[roomName]);
    threatMonitorHelper.validateInvaderExpireAt();
  }

  /**
   * 크립 생산
   */
  for (const roomName of Object.keys(settings.rooms)) {
    const roomSetting = settings.rooms[roomName];
    // 스폰이 없는 방은 넘김
    if (_.isUndefined(roomSetting.spawn)) {
      continue;
    }
    const spawnName = roomSetting.spawn.name;

    // 내수용 크립 생산
    for (const creepType of Object.keys(roomSetting.creep)) {
      // console.log(`${spawnName} / ${creepType}`);
      // 캐피톨에 인베이더가 침입하면, 캐피톨 크립들은 생산하지 않음
      const capitolRoomName: string = intel.alias.capitol.roomName;
      if (creepType === ('capitolBuilder' || 'capitolHauler' || 'capitolMiner' || 'capitolRepairer') && Memory.rooms[capitolRoomName].invader) {
        continue;
      }
      const creepSetting = roomSetting.creep[creepType];

      // 타입이 같고 && 고향이 같고 && 파견용 크립이 아닌 && 살아있는 크립의 수 계산
      const liveCreeps = _.filter(Game.creeps, (creep: any) => {
        return creep.memory.role === creepType && creep.memory.home === roomName && !creep.memory.dispatch;
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

  // 파견용 크립 생산
  for (const roomName of Object.keys(settings.rooms)) {
    const dispatchSetting = settings.rooms[roomName].dispatch;
    const dispatchFulfillment = Memory.rooms[roomName].dispatchFulfillment;
    //  룸 설정에 파견 관련 데이터가 있으면
    if (!_.isUndefined(dispatchSetting)) {
      for (const role of Object.keys(dispatchSetting)) {
        const spawnQueue: SpawnQueue = new SpawnQueue(dispatchSetting[role].fromSpawn);
        // 스폰 큐에 추가해야할 크립 수 계산
        if (dispatchSetting[role].population > 0) {
          const requiredNumber: number = ((dispatchSetting[role].population - dispatchFulfillment[role].count) - dispatchFulfillment[role].spawnQueued);
          const newCreep: SpawnQueueItem = {
            initialMemory: dispatchSetting[role].initialMemory,
            parts: dispatchSetting[role].parts
          };
          // 필요한 수 만큼 스폰 큐에 추가
          _.times(requiredNumber, () => {
            spawnQueue.produce(newCreep);
            // 스폰 큐 대기 카운트 1 증가
            // *주의* hauler의 설정은 dispatchSite 대신 pickupRoom에 존재함. 따라서 아래의 roomName은 pickupRoom으로 설정됨.
            // Memory.rooms[roomName].dispatchFulfillment[role].spawnQueued += 1;
          });
        }
      }
    }
  }

  /**
   * 타워 관련
   * TODO: 리팩토링
   */
  const towerIds: string[] = [
    '5b21b301db63e5002db72203', // W1N7
    '5b132f1de77af90020399c2f', // W1N7
    '5b1cf7d98b2122002512ca2c', // W1N7
    '5b186b836c39f600211ac970',
    '5b21b338db63e5002db72213', // W3N7
    '5b1b075d8b2122002511e982', // W3N7
    '5b14bb351dca9e002421adaa',
    '5b21b778e1840700263e3716', // W3N5
    '5b1c608c547fcf002b749104' // W3N5
  ];
  for (const towerId of towerIds) {
    const tower = Game.getObjectById(towerId) as StructureTower;
    if (tower) {
      const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if (closestHostile) {
        tower.attack(closestHostile);
      } else {
        if (tower.energy > 700) {
          const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_WALL && structure.structureType !== STRUCTURE_RAMPART
          });
          if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
          }
        }
      }
    }
  }

  /**
   * 스폰 큐 소비
   */
  for (const spawnName of Object.keys(Game.spawns)) {
    const spawnQueue: SpawnQueue = new SpawnQueue(spawnName);
    const spawn: StructureSpawn = Game.spawns[spawnName];
    const roomName: string = spawn.room.name;

    if (!spawn.spawning) {
      const newCreep = spawnQueue.consume();
      if (newCreep) {
        const role: string = newCreep.initialMemory.role;
        newCreep.name = newCreep.name || `${role}_${roomName}_${Game.time}`;
        // 파견직 크립이면 앞에 접두어 추가
        if (newCreep.initialMemory.dispatch && newCreep.name.slice(0, 9) !== 'dispatch_') {
          newCreep.name = `dispatch_${newCreep.name}`;
        }
        // 크립 생성
        const spawnResult = Game.spawns[spawnName].spawnCreep(newCreep.parts, newCreep.name, {
          memory: newCreep.initialMemory
        });
        if (spawnResult !== OK) {
          if (newCreep.initialMemory.dispatch) {
            newCreep.name = `dispatch_${role}_${roomName}_${Game.time}`;
          }
          spawnQueue.priorProduce(newCreep, false);
        } else {
          // 파견직 크립이면 파견지 메모리의 'spawnQueued' 값 1 감소
          // if (newCreep.initialMemory.dispatch) {
          // 하울러의 설정은 dispatchSite 대신 pickupRoom에 존재함. 따라서 하울러의 파견지점 메모리는 pickupRoom으로 설정해야함
          // if (newCreep.initialMemory.role === 'hauler') {
          //   console.log('1');
          //   Memory.rooms[newCreep.initialMemory.pickupRoom].dispatchFulfillment[role].spawnQueued -= 1;
          //   console.log(`${Memory.rooms[newCreep.initialMemory.pickupRoom].dispatchFulfillment[role].spawnQueued}`);
          // } else {
          // Memory.rooms[newCreep.initialMemory.dispatchSite].dispatchFulfillment[role].spawnQueued -= 1;
          // console.log(`${Memory.rooms[newCreep.initialMemory.dispatchSite].dispatchFulfillment[role].spawnQueued}`);
          // }
          console.log(`[Queue | ${spawnName}] Consumed: ${newCreep.name}`);
          // }
        }
      }
    }
  }

  // 크립 생산시, 스폰 옆에 메시지를 띄움
  for (const spawnName of Object.keys(Game.spawns)) {
    const spawn: StructureSpawn = Game.spawns[spawnName];
    if (spawn.spawning) {
      const spawningCreep = Game.creeps[spawn.spawning.name];
      const queueLength: number = spawn.memory.queue.length;
      let text = `🛠️ ${spawningCreep.memory.role}`;
      if (queueLength) {
        text = `${text} (+${queueLength})`;
      }
      spawn.room.visual.text(text, spawn.pos.x + 1, spawn.pos.y, {
        align: 'left',
        opacity: 0.8
      });
    }
  }

  /**
   * 크립 실행
   */
  for (const name of Object.keys(Game.creeps)) {
    const creepClass = roleMap[Game.creeps[name].memory.role];
    const creep = new creepClass(Game.creeps[name]);
    const runResult = creep.run();
    // if (runResult !== 0 && !_.isUndefined(runResult)) {
    //   console.log(new Error(`creepName: ${name} / Errorcode: ${runResult}`));
    // }
  }

  /**
   * 시스템 Task
   */
  if (systemSettings.metric) {
    console.log(`[CPU] ${Game.cpu.getUsed().toPrecision(3)} | [Memory] ${Game.cpu.getHeapStatistics().total_heap_size / 1024} KB`);
  }
  if (systemSettings.metricAlert) {
    if (Game.cpu.getUsed() >= 100) {
      console.log(`[Alert | CPU] ${Game.cpu.getUsed().toPrecision(3)} (Bucket: ${Game.cpu.bucket})`);
    }
  }
};
