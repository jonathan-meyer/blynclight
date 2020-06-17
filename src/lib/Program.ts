import { LoggerFactory } from "./Logger";

const logger = LoggerFactory.getLogger("blynclight:Program");

abstract class Program {
  readonly id: string;

  private t: any = null;

  constructor(id: string) {
    this.id = id;
  }

  abstract run(): void;

  onStart(): void {}
  onStop(): void {}

  start(interval?: number): void {
    logger.debug(`start program: ${this.id}`);

    this.t = setInterval(() => this.run(), interval || 25);
    this.onStart();
  }

  stop(): void {
    if (this.t) {
      clearInterval(this.t);
      this.t = null;
      this.onStop();

      logger.debug(`stop program: ${this.id}`);
    }
  }

  toJSON() {
    return { id: this.id, running: this.t !== null };
  }
}

export default Program;
