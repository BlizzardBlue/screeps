const _ = require('lodash');

export class CreepMemoryCleaner {
  private readonly creepName: string;
  private creepMemory: CreepMemory;
  private role: string;

  constructor(creepName: string) {
    this.creepName = creepName;
    this.creepMemory = Memory.creeps[creepName];
    this.role = Memory.creeps[creepName].role;
  }

  // 죽은 크립 메모리 청소
  public forgetDeadCreeps(): void {
    if (!(this.creepName in Game.creeps)) {
      // 만약 파견직 크립이었다면 파견지의 RoomMemory도 청소
      if (this.creepMemory.dispatch) {
        this.pullFromDispatchFulfillmentMemory(this.creepName, this.creepMemory.dispatchSite);
        console.log(`[Task] Pulled from dispatch fulfillment memory: ${this.creepName}`);
      }
      // Creep 메모리 청소
      delete Memory.creeps[this.creepName];
      console.log(`[Task] Cleared non-existing creep memory: ${this.creepName}`);
    }
  }

  // 파견지 근무자 명부에서 제거
  private pullFromDispatchFulfillmentMemory(creepName: string, dispatchSite: string): void {
    // 리스트에서 제거
    Game.rooms[dispatchSite].memory.dispatchFulfillment[this.role].creeps = _.pull(Game.rooms[dispatchSite].memory.dispatchFulfillment[this.role].creeps, creepName);
    // 파견 근무자 수 갱신
    Game.rooms[dispatchSite].memory.dispatchFulfillment[this.role].count = Game.rooms[dispatchSite].memory.dispatchFulfillment[this.role].creeps.length;
  }
}
