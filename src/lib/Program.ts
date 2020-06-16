import { LoggerFactory } from "./Logger";

const logger = LoggerFactory.getLogger("blynclight:Program");

class Program {
  private t: any = null;
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }

  start(interval?: number): void {
    logger.debug("[start program]");
    this.t = setInterval(() => {}, interval || 25);
  }

  stop(): void {
    if (this.t) {
      logger.debug("[stop program]");
      clearInterval(this.t);
    }
  }
}

export default Program;
