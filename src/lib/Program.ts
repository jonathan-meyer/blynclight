import { LoggerFactory } from "./Logger";

const logger = LoggerFactory.getLogger("blynclight:Program");

abstract class Program {
  readonly id: string;

  private t: any = null;

  constructor(id: string) {
    this.id = id;
  }

  abstract run(): void;

  start(interval?: number): void {
    logger.debug(`start program: ${this.id}`);

    this.t = setInterval(() => this.run(), interval || 25);
  }

  stop(): void {
    if (this.t) {
      clearInterval(this.t);
      this.t = null;

      logger.debug(`stop program: ${this.id}`);
    }
  }

  toString(): string {
    return `${this.id}: ${this.t ? "running" : "stopped"}`;
  }
}

export default Program;
