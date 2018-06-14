import {intel} from 'config/intel';

export class Navigate {
  public creep: Creep;
  private readonly homeEntrance: RoomPosition;
  private readonly capitolEntrance: Flag;
  private readonly capitolWaypointFlag: Flag;
  private readonly capitolWaypoint2Flag: Flag;

  constructor(creep: Creep) {
    this.creep = creep;
    this.homeEntrance = intel.rooms[creep.memory.home].entrance.roomPosition;
    this.capitolEntrance = Game.flags.capitolEntrance;
    this.capitolWaypointFlag = Game.flags.capitolWaypoint;
    this.capitolWaypoint2Flag = Game.flags.capitolWaypoint2;
  }

  // 플래그로 이동
  public toFlag(flag: Flag): CreepMoveReturnCode | ERR_NO_PATH | ERR_INVALID_TARGET | ERR_NOT_FOUND | void {
    if (!this.creep.pos.isEqualTo(flag.pos)) {
      return this.creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 4});
    } else if (this.creep.pos.isEqualTo(flag.pos)) {
      this.creep.memory.arrived = true;
    }
  }

  // 방으로 이동
  public toRoom(roomName: string): any {
    this.creep.say(`${roomName}로 가는 중`, true);
    return this.creep.moveTo(new RoomPosition(25, 25, roomName), {visualizePathStyle: {stroke: '#ffffff'}});
    // const route = Game.map.findRoute(this.creep.room.name, roomName) as any; // TODO: 타이핑 개선
    // if (route.length > 0) {
    //   this.creep.say(`${roomName} 가는 중!`, true);
    //   const exit = this.creep.pos.findClosestByRange(route[0].exit);
    //   return this.creep.moveTo(exit, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 4});
    // }
  }

  // 집으로 귀환
  public toHome(): number {
    const homeName: string = this.creep.memory.home;
    const homeCenter = new RoomPosition(25, 25, homeName);
    return this.creep.moveTo(homeCenter);
  }

  // 파견지로 이동
  public toDispatchSite(): any {
    const dispatchSite: string = this.creep.memory.dispatchSite;
    // return this.creep.moveTo(Game.rooms[dispatchSite].controller);
    return this.creep.moveTo(new RoomPosition(21, 29, dispatchSite), {visualizePathStyle: {stroke: '#009aff'}});
    // return this.toRoom(dispatchSite);
  }

  // 캐피톨에서 집으로 귀환
  public fromCapitoltoHome(): any {
    if (this.creep.memory.underEvacuation && this.creep.memory.arrived && this.creep.memory.waypointArrived && this.creep.memory.waypoint2Arrived) {
      this.creep.memory.waypointArrived = false;
      this.creep.memory.waypoint2Arrived = false;
      this.creep.memory.arrived = false;
    }

    if (!this.creep.memory.waypoint2Arrived && this.creep.pos.inRangeTo(this.capitolWaypoint2Flag, 1)) {
      this.creep.memory.waypoint2Arrived = true;
    }

    if (!this.creep.memory.waypointArrived && this.creep.pos.inRangeTo(this.capitolWaypointFlag, 1)) {
      this.creep.memory.waypointArrived = true;
    }

    if (!this.creep.memory.arrived && this.creep.pos.inRangeTo(this.homeEntrance, 2)) {
      this.creep.memory.waypointArrived = false;
      this.creep.memory.waypoint2Arrived = false;
      this.creep.memory.arrived = true;
      this.creep.say('귀환!', true);
    }

    if (!this.creep.memory.waypoint2Arrived) {
      return this.creep.moveTo(this.capitolWaypoint2Flag, {visualizePathStyle: {stroke: '#bb48ff'}, reusePath: 4});
    }

    if (!this.creep.memory.waypointArrived) {
      return this.creep.moveTo(this.capitolWaypointFlag, {visualizePathStyle: {stroke: '#bb48ff'}, reusePath: 4});
    }

    if (!this.creep.memory.arrived) {
      return this.creep.moveTo(this.homeEntrance, {visualizePathStyle: {stroke: '#bb48ff'}, reusePath: 4});
    }
  }

  // W5N5에 있는 캐피톨로 이동
  public toCapitol(): any {
    if (!this.creep.memory.waypointArrived && this.creep.pos.inRangeTo(this.capitolWaypointFlag, 3)) {
      this.creep.memory.waypointArrived = true;
    }

    if (!this.creep.memory.waypoint2Arrived && this.creep.pos.inRangeTo(this.capitolWaypoint2Flag, 1)) {
      this.creep.memory.waypoint2Arrived = true;
    }

    if (!this.creep.memory.arrived && this.creep.pos.inRangeTo(this.capitolEntrance, 3)) {
      this.creep.memory.arrived = true;
      this.creep.say('도착!', true);
    }

    if (!this.creep.memory.waypointArrived) {
      return this.creep.moveTo(this.capitolWaypointFlag, {visualizePathStyle: {stroke: '#bb48ff'}, reusePath: 4});
    }

    if (!this.creep.memory.waypoint2Arrived) {
      return this.creep.moveTo(this.capitolWaypoint2Flag, {visualizePathStyle: {stroke: '#bb48ff'}, reusePath: 4});
    }

    if (!this.creep.memory.arrived) {
      return this.creep.moveTo(this.capitolEntrance, {visualizePathStyle: {stroke: '#bb48ff'}, reusePath: 4});
    }
  }

  // 비상시 캐피톨 근처 피난처로 이동
  public toCapitolSafeRoom(): any {
    return this.creep.moveTo(this.capitolWaypointFlag, {visualizePathStyle: {stroke: '#bb48ff'}, reusePath: 4});
  }
}
