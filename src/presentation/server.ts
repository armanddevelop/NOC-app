import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron-service/cron-service";

export class ServerUp {
  public static startServer(): void {
    const url = process.env.URL || "https://www.google.com";
    CronService.createJob("*/10 * * * * *", () => {
      new CheckService(
        () => console.log("Service is up!", url),
        (error) => console.error(`Error CheckService ${url}:`, error)
      ).execute(url);
      //new CheckService().execute("http://localhost:3000");
    });
  }
}
