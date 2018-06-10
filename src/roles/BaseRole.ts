import {Navigate} from '../actions/Navigate';

/**
 * 크립 기타 설정
 */
export interface CreepSettings {
  targetTicksToLiveOnDispatch?: number;
  [anything: string]: any;
}

/**
 * 크립 최상위 부모 클래스
 */
export class BaseRole {
  public creep: Creep; // 나야 나!
  public creepSettings: CreepSettings; // 크립 설정
  // 크립 메모리
  public role: string; // 역할
  public home: string; // 고향 방
  public spawn: string; // 태어난 스폰
  public dispatch: boolean; // 파견근무 여부
  public dispatchSite: string; // 파견지
  public reservedSourceId?: string; // 예약한 소스ID
  public arrived?: boolean; // 목적지 도착 여부
  public underEvacuation?: boolean; // 대피 여부
  public return?: boolean; // 귀환 여부
  // 모듈
  public navigate: Navigate; // 크립 이동용

  constructor(creep: Creep, creepSettings?: CreepSettings) {
    this.creep = creep;
    this.creepSettings = creepSettings;
    // 메모리 로드
    this.role = creep.memory.role;
    this.home = creep.memory.home;
    this.spawn = creep.memory.spawn;
    this.dispatch = creep.memory.dispatch;
    this.dispatchSite = creep.memory.dispatchSite;
    this.reservedSourceId = creep.memory.reservedSourceId;
    this.arrived = creep.memory.arrived;
    this.underEvacuation = creep.memory.underEvacuation;
    this.return = creep.memory.return;
    // 모듈 로드
    this.navigate = new Navigate(creep);
  }

  // 파견지에서 수명 연장
  protected renewAtDispatchSite(): any {
    if (this.creep.room.name !== this.dispatchSite) {
      console.log('afsdaf');
      return this.navigate.toDispatchSite();
    } else {
      this.creep.say('💞');
      const spawn: StructureSpawn = this.creep.room.find(FIND_MY_SPAWNS)[0];
      const renewResult = spawn.renewCreep(this.creep);
      switch (renewResult) {
        case OK:
          return true;
        case ERR_BUSY:
          return this.creep.moveTo(spawn, {reusePath: 1});
        case ERR_NOT_ENOUGH_ENERGY: // TODO: 근처에서 에너지 가져오기
          return this.creep.say(`Err: ${renewResult}`);
          // return this.creep.
        case ERR_NOT_IN_RANGE:
          return this.creep.moveTo(spawn, {reusePath: 1});
        default:
          return this.creep.say(`Err: ${renewResult}`);
      }
    }
  }
}
