import { LoggerFactory } from './Logger';

const logger = LoggerFactory.getLogger('blynclight:Program');

abstract class Program {
  readonly id: string;

  protected options?: Record<string, string>;
  private t?: NodeJS.Timeout;

  constructor(id: string) {
    this.id = id;
  }

  abstract run(): void;

  onStart(): void {}
  onStop(): void {}

  start(options?: Record<string, string>, interval?: number): void {
    logger.debug(`[start]: ${this.id}`, options);

    this.options = options;
    this.t = setInterval(() => {
      try {
        this.run();
      } catch (err: any) {
        logger.error(`[error]: ${this.id}: ${err.message}`);
        this.stop();
      }
    }, interval || 25);

    this.onStart();
  }

  stop(): void {
    if (this.t) {
      clearInterval(this.t);

      this.options = undefined;
      this.t = undefined;

      this.onStop();

      logger.debug(`stop program: ${this.id}`);
    }
  }

  isRunning(): boolean {
    return this.t != undefined;
  }

  toJSON() {
    return {
      id: this.id,
      options: this.options,
      running: this.isRunning(),
    };
  }
}

export default Program;
