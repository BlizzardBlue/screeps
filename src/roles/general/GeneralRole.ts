import {BaseRole} from '../BaseRole';

/**
 * 일반적인 크립의 부모 클래스
 */
export class GeneralRole extends BaseRole {
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
