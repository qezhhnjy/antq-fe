declare namespace Quartz {

  type JobAndTrigger = {
    jobName: string;
    jobGroup: string;
    jobClassName: string;
    triggerName: string;
    triggerGroup: string;
    repeatInterval: number;
    timesTriggered: number;
    cronExpression: string;
    timeZoneId: string;
    triggerState: string;
  }

  type JobInfo = {
    jobClassName: string;
    className: string;
    methodName: string;
    arg?: string;
    jobGroupName: string;
    cronExpression: string;
  }
}