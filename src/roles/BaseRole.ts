import {Navigate} from '../utils/Navigate';

/**
 * 크립 최상위 부모 클래스
 */
export class BaseRole {
  public creep: Creep; // 나야 나!
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
  // 기타 모듈
  public navigate: Navigate; // 크립 이동용 유틸

  constructor(creep: Creep) {
    this.creep = creep;
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
}
