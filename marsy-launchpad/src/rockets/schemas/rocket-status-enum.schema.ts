export enum RocketStatus {
  READY_FOR_LAUNCH = 'readyForLaunch',
  FUELING = 'fueling',
  LOADING_PAYLOAD = 'loadingPayload',
  PRELAUNCH_CHECKS = 'prelaunchChecks',
  DESTROYED= 'destroyed',
  ABORTED = 'aborted',
  IN_FLIGHT = 'inFlight',
  SUCCESSFUL_LAUNCH = 'successfulLaunch',
  PAYLOAD_DELIVERED = 'payloadDelivered',
  PAYLOAD_DELIVERY_FAILED = 'payloadDeliveryFailed',
  FAILED_LAUNCH = 'faildeLaunch',
  RETURNING = 'returning',
  LANDED = 'landed',
  UNKNOWN = 'unknown',
  STAGED = 'staged',
}
