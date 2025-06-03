import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
interface ICheckService {
  execute(url: string): Promise<boolean>;
}
type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

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
      const log = new LogEntity(
        `Check successful for URL: ${url}`,
        LogSeverityLevel.low,
        `all good!`
      );
      this.successCallback();
      this.logRepository.saveLog(log);
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMsg = error.message;
        const log = new LogEntity(
          `Error URL: ${url}`,
          LogSeverityLevel.heigh,
          `${errorMsg}`
        );
        this.logRepository.saveLog(log);
        this.errorCallback(errorMsg);
      }
      return false;
    }
  }
}
