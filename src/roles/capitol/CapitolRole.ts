import {BaseRole, CreepSettings} from '../BaseRole';

/**
 * 캐피톨 파견용 크립의 부모 클래스
 */
export class CapitolRole extends BaseRole {
  constructor(creep: Creep, settings?: CreepSettings) {
    super(creep);
  }

  /**
   * 대피시
   */
  public evacuate(): any {
    // 집으로 대피
    return this.navigate.fromCapitoltoHome();
  }
}
