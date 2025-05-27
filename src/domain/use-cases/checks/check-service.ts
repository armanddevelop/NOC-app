interface ICheckService {
  execute(url: string): Promise<boolean>;
}
type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;
export class CheckService implements ICheckService {
  constructor(
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
      this.successCallback();
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.errorCallback(error.message);
      }
      return false;
    }
  }
}
