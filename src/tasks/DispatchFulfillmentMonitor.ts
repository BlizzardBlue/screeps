const _ = require('lodash');

/**
 * 파견 크립 인원수 충족여부 모니터링 task
 */
export class DispatchFulfillmentMonitor {
  private creep: Creep;
  private readonly role: string;
  private fulfillingCreeps: string[];
  private readonly dispatchSite: string;

  constructor(creepName: string) {
    this.creep = Game.creeps[creepName];
    this.role = this.creep.memory.role;
    this.dispatchSite = this.creep.memory.dispatchSite;
  }

  public run(): void {
    // 파견직 크립이면
    if (this.dispatchSite) {
      // 메모리 초기화
      // this.initialize();
      this.fulfillingCreeps = Memory.rooms[this.dispatchSite].dispatchFulfillment[this.role].creeps;
      // 파견지 근무자 명부에 이름이 올라가있는지 확인
      const isIn: number = _.indexOf(this.fulfillingCreeps, this.creep.name);
      if (isIn === -1) {
        // 없으면 올림
        Memory.rooms[this.dispatchSite].dispatchFulfillment[this.role].creeps.push(this.creep.name);
        console.log(`[Task | DispatchFulfillmentMonitor] Pushed unlisted creep: ${this.creep.name} (${this.dispatchSite})`);
      }
      // 파견 근무자 수 갱신
      Memory.rooms[this.dispatchSite].dispatchFulfillment[this.role].count = Memory.rooms[this.dispatchSite].dispatchFulfillment[this.role].creeps.length;
    }
  }

  // 메모리 초기화
  // public initialize(): void {
  //   // TODO: 별도의 모듈로 뺌. RoomMemoryInitializer에 보내는 방법 생각해보기.
  //   console.log(this.dispatchSite);
  //   if (_.isUndefined(Memory.rooms[this.dispatchSite].dispatchFulfillment[this.role])) {
  //     Memory.rooms[this.dispatchSite].dispatchFulfillment[this.role] = {
  //       creeps: [],
  //       count: 0,
  //       spawnQueued: 0
  //     };
  //   }
  // }
}
