// type shim for nodejs' `require()` syntax
// for stricter node.js typings, remove this and install `@types/node`
// declare const require: (module: string) => any;

// add your custom typings here
declare interface CreepMemory {
  role: string;
  home: string;
  spawn: string;
  dispatch: boolean;
  dispatchSite?: string;
  renewing?: boolean;
  [anything: string]: any;
  reservedSourceId?: string;
  arrived?: boolean;
  underEvacuation?: boolean;
  return?: boolean;
}

declare interface RoomMemorySource {
  id: string;
  reserved: boolean;
  reserver: string;
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
  invader?: boolean;
  invaderExpireAt?: number;
  hostile?: boolean;
  dispatchFulfillment: RoomMemoryDispatchFulfillment;
}

declare interface SpawnQueueItem {
  name?: string;
  initialMemory: CreepMemory;
  parts: BodyPartConstant[];
}

declare interface SpawnMemory {
  queue: SpawnQueueItem[];
}
