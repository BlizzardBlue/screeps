export interface SystemSettings {
  metric: boolean; // CPU, 메모리 사용량 모니터링
  metricAlert: boolean; // CPU 사용량이 100을 초과하면 알림
}

export const systemSettings: SystemSettings = {
  metric: false,
  metricAlert: true
};
