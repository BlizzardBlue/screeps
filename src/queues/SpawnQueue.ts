const _ = require('lodash');

export class SpawnQueue {
  public spawnName: string;

  constructor(spawnName: string) {
    this.spawnName = spawnName;
    this.initialize();
  }

  // 스폰 큐 상태 조회
  public status(): SpawnQueueItem[] {
    return Memory.spawns[this.spawnName].queue;
  }

  // 스폰 큐 추가
  public produce(item: SpawnQueueItem): number {
    // 메모리에 정보 추가
    // TODO: 추가하는 방식 개선 (큐에서 애매함)
    const additionalMemory = {
      home: Game.spawns[this.spawnName].room.name,
      spawn: this.spawnName
    };
    const newMemory = _.merge(item.initialMemory, additionalMemory);
    item.initialMemory = newMemory;

    console.log(`[Queue | ${this.spawnName}] Produced: ${item.initialMemory.role}`);
    return Memory.spawns[this.spawnName].queue.push(item);
  }

  // 스폰 큐 맨 앞에 추가
  public priorProduce(item: SpawnQueueItem): number {
    // 메모리에 정보 추가
    // TODO: 추가하는 방식 개선 (큐에서 애매함)
    const additionalMemory = {
      home: Game.spawns[this.spawnName].room.name,
      spawn: this.spawnName
    };
    const newMemory = _.merge(item.initialMemory, additionalMemory);
    item.initialMemory = newMemory;

    console.log(`[Queue | ${this.spawnName}] PriorProduced: ${item.initialMemory.role}`);
    return Memory.spawns[this.spawnName].queue.unshift(item);
  }

  // 스폰 큐 소비
  public consume(): SpawnQueueItem | false {
    const queue: SpawnQueueItem[] = Memory.spawns[this.spawnName].queue;
    if (!_.isEmpty(queue)) {
      return Memory.spawns[this.spawnName].queue.shift();
    } else {
      return false;
    }
  }

  // 스폰 큐 삭제
  public clean(): void {
    console.log(`[Queue | ${this.spawnName}] Cleaned`);
    delete Memory.spawns[this.spawnName].queue;
  }

  // 스폰 큐 초기화
  private initialize(): void {
    if (_.isUndefined(Game.spawns[this.spawnName].memory.queue)) {
      console.log(`[Queue | ${this.spawnName}] Initialized`);
      Memory.spawns[this.spawnName].queue = [];
    }
  }
}
