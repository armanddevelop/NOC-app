import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository";
import { CronService } from "./cron-service/cron-service";

const fileSystemlogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);

export class ServerUp {
  public static startServer(): void {
    const url = process.env.URL || "https://www.google.com";
    CronService.createJob("*/50 * * * * *", () => {
      new CheckService(
        fileSystemlogRepository,
        () => console.log("Service is up!", url),
        (error: string) => console.error(`Error CheckService ${url}:`, error)
      ).execute(url);
      //new CheckService().execute("http://localhost:3000");
    });
  }
}
