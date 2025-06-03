export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  heigh = "high",
  critical = "critical",
  all = "all",
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public reason?: string;
  public createdAt: Date;
  constructor(message: string, level: LogSeverityLevel, reason?: string) {
    this.level = level;
    this.message = message;
    this.reason = reason || "";
    this.createdAt = new Date();
  }
  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt } = JSON.parse(json);
    if (!message) {
      throw new Error("Message is required");
    }
    if (!level) {
      throw new Error("Level is required");
    }
    const log = new LogEntity(message, level);
    log.createdAt = new Date(createdAt);
    return log;
  };
}
