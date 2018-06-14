export class Coupang {
  constructor() {
    // pass
  }

  public newJob(fromId: string, toId: string, resourceType: string, amount: number): any {
    const nearestHauler: string = this.findNearestHauler(fromId, amount);
    const newHaulerJob: HaulerJob = {
      fromId: fromId,
      toId: toId,
      resourceType: resourceType,
      amount: amount,
      assignedTo: nearestHauler
    };
    return Memory.jobs.hauler.push(newHaulerJob);
  }

  private findNearestHauler(originId: string, amount: number): string {
    const availableHaulers: any = [];
    for (const creepName of Object.keys(Game.creeps)) {
      const creep = Game.creeps[creepName];
      // 역할이 Hauler이고, 현재 일감이 없고, 요청받은 운송량 이상의 carryCapacity를 가진 크립만 필터
      if (creep.memory.role === 'hauler' && creep.memory.status === 'waiting' && creep.carryCapacity > amount) {
        const origin = Game.getObjectById(originId) as any;
        // 크립의 현재 위치로부터 배송 출발지까지의 거리 비용 계산
        const pathFindResult: PathFinderPath = PathFinder.search(creep.pos, origin);
        if (!pathFindResult.incomplete) {
          availableHaulers.push([creepName, pathFindResult.cost]);
        }
      }
    }
    availableHaulers.sort((a: any, b: any) => {
      return a[1] - b[1];
    });
    // 가장 가까운 Hauler의 이름을 return
    return availableHaulers[0][0];
  }

  private addToQueue(hawlerJob: HaulerJob): any {
    // TODO: 사용 가능한 Hauler가 없을 때, 큐에 등록하고 소비하는거 구현
  }
}
