// type shim for nodejs' `require()` syntax
// for stricter node.js typings, remove this and install `@types/node`
// declare const require: (module: string) => any;

// add your custom typings here
declare interface CreepMemory {
  role: string;
  home: string;
  spawn: string;
  [anything: string]: any;
  reservedSourceId?: string;
  arrived?: boolean;
  retreat?: boolean;
  return?: boolean;
}

declare interface RoomMemorySource {
  id: string;
  reserved: boolean;
  reserver: string;
}

declare interface RoomMemory {
  sources: {
    [id: string]: RoomMemorySource;
  };
  invader: boolean;
  hostile: boolean;
}

declare interface SpawnQueueItem {
  name?: string;
  initialMemory: CreepMemory;
  parts: BodyPartConstant[];
}

declare interface SpawnMemory {
  queue: SpawnQueueItem[];
}
