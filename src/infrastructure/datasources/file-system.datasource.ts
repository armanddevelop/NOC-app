import fs from "fs";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath: string = "logs/";
  private readonly allLogs: string = "logs/logs-all.log";
  private readonly lowLogs: string = "logs/logs-low.log";
  private readonly mediumLogs: string = "logs/logs-medium.log";
  private readonly highLogs: string = "logs/logs-high.log";

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    const pathFiles = [
      this.allLogs,
      this.lowLogs,
      this.mediumLogs,
      this.highLogs,
    ];

    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath, { recursive: true });
    }
    pathFiles.forEach((file) => {
      if (!fs.existsSync(file)) {
        fs.writeFileSync(file, "");
      }
    });
  };

  async saveLog(newLog: LogEntity): Promise<void> {
    try {
      const logAsJson = JSON.stringify(newLog);
      fs.appendFileSync(this.allLogs, `${logAsJson}\n`);
      switch (newLog.level) {
        case LogSeverityLevel.low:
          fs.appendFileSync(this.lowLogs, `${logAsJson}\n`);
          break;
        case LogSeverityLevel.medium:
          fs.appendFileSync(this.mediumLogs, `${logAsJson}\n`);
          break;
        case LogSeverityLevel.heigh:
          fs.appendFileSync(this.highLogs, `${logAsJson}\n`);
          break;
      }
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  private getLogsFromFile = (filePath: string): LogEntity[] => {
    const contentFile = fs.readFileSync(filePath, "utf-8");
    if (!contentFile) {
      return [];
    }
    const stringLogs = contentFile
      .split("\n")
      .map((log) => LogEntity.fromJson(log));
    return stringLogs;
  };

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    try {
      switch (severityLevel) {
        case LogSeverityLevel.low:
          const logsLow = this.getLogsFromFile(this.lowLogs);
          return logsLow;
        case LogSeverityLevel.medium:
          const logsMedium = this.getLogsFromFile(this.mediumLogs);
          return logsMedium;
        case LogSeverityLevel.heigh:
          const logsHigh = this.getLogsFromFile(this.highLogs);
          return logsHigh;
        case LogSeverityLevel.all:
          const logsAll = this.getLogsFromFile(this.allLogs);
          return logsAll;
        default:
          throw new Error("Invalid severity level");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting logs: ${error.message}`);
      }
      return [];
    }
  }
}
