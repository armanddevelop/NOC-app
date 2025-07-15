export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  heigh = "high",
  critical = "critical",
  all = "all",
}
export interface ILogOptions {
  message: string;
  level: LogSeverityLevel;
  origin: string;
  reason?: string;
  createdAt?: Date;
}
export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public reason?: string;
  public createdAt: Date;
  public origin: string;
  constructor(options: ILogOptions) {
    const { level, message, reason, createdAt, origin } = options;
    this.level = level;
    this.message = message;
    this.reason = reason || "";
    this.createdAt = createdAt || new Date();
    this.origin = origin;
  }
  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt } = JSON.parse(json);
    if (!message) {
      throw new Error("Message is required");
    }
    if (!level) {
      throw new Error("Level is required");
    }
    const log = new LogEntity({ message, level, origin, createdAt });
    return log;
  };
}
