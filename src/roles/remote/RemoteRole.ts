import {BaseRole} from '../BaseRole';

/**
 * 장거리 작업용 크립의 부모 클래스
 */
export class RemoteRole extends BaseRole {
  constructor(creep: Creep) {
    super(creep);
  }

  /**
   * 대피시
   */
  public evacuate(): any {
    // 집으로 대피
    return this.navigate.toHome();
  }
}
