import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
interface ICheckService {
  execute(url: string): Promise<boolean>;
}
type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements ICheckService {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
  }
  async execute(url: string): Promise<boolean> {
    try {
      const request = await fetch(url);
      if (!request.ok) {
        return false;
      }
      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Check successful for URL: ${url}`,
        origin: "",
      });
      this.successCallback && this.successCallback();
      this.logRepository.saveLog(log);
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMsg = error.message;

        const log = new LogEntity({
          level: LogSeverityLevel.heigh,
          message: `Error URL: ${url}`,
          origin: "",
        });
        this.logRepository.saveLog(log);
        this.errorCallback && this.errorCallback(errorMsg);
      }
      return false;
    }
  }
}
