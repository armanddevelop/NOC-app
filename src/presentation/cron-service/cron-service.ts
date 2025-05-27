import { CronJob } from "cron";
type CroneTime = string | Date;
type OnTick = () => void;
export class CronService {
  public static createJob(cronTime: CroneTime, onTick: OnTick): CronJob {
    const job = new CronJob(cronTime, onTick);
    job.start();
    return job;
  }
}
