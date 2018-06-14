// type shim for nodejs' `require()` syntax
// for stricter node.js typings, remove this and install `@types/node`
// declare const require: (module: string) => any;

declare interface Memory {
  jobs: JobMemory;
}

declare interface CreepMemory {
  role: string; // 역할
  home: string; // 고향
  spawn: string; // 태어난 스폰
  dispatch: boolean; // 파견용 크립 여부
  dispatchSite?: string; // 파견 룸
  dispatchSiteArrived?: boolean; // 파견 룸에 도착했는지 여부
  renewing?: boolean; // 수명 연장 중인지 여부
  reservedSourceId?: string; // [Miner 전용] 본인이 예약한 소스ID
  arrived?: boolean; // 목적지 도착 여부
  pickupRoom?: string; // [Hauler 전용] 에너지 수거 룸
  underEvacuation?: boolean; // 대피 중인지 여부
  return?: boolean; // 복귀 중인지 여부
  status?: string; // 상태 플래그용
  [anything: string]: any;
}

declare interface RoomMemorySource {
  id: string; // 소스 ID
  reserved: boolean; // 예약 여부
  reserver: string; // (예약되었다면) 예약자 ID
}

declare interface RoomMemoryDispatchFulfillment {
  [role: string]: {
    creeps: string[]; // 현지 활동중인 파견직 크립 이름 목록
    count: number; // 현재 활동중인 파견직 크립 수
    spawnQueued: number; // 스폰 큐에 대기중인 수
  };
}

declare interface RoomMemory {
  name: string;
  sources?: {
    [id: string]: RoomMemorySource;
  };
  invader?: boolean; // 인베이더 침입 여부
  invaderExpireAt?: number; // (인베이더가 침입했다면) 수명이 다해 사라지는 시점
  hostile?: boolean; // 적군 침입 여부
  requestedDefender?: boolean; // 방어병력 요청 여부
  dispatchFulfillment: RoomMemoryDispatchFulfillment; // 파견크립 관리 명부
}

declare interface SpawnQueueItem {
  name?: string;
  initialMemory: CreepMemory;
  parts: BodyPartConstant[];
}

declare interface SpawnMemory {
  queue: SpawnQueueItem[]; // 스폰 큐
}

declare interface JobMemory {
  hauler: HaulerJob[];
}

declare interface HaulerJob {
  fromId: string;
  toId: string;
  resourceType: string;
  amount: number;
  assignedTo?: string;
}
