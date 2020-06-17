import { LoggerFactory } from "./Logger";
import Program from "./Program";

const logger = LoggerFactory.getLogger("blynclight:ProgramManager");

class ProgramManager {
  private programs: Program[] = [];

  add(program: Program): void {
    logger.debug("[add]");

    this.programs.push(program);
  }

  map<U>(
    callbackfn: (value: Program, index: number, array: Program[]) => U,
    thisArg?: any
  ): U[] {
    return this.programs.map(callbackfn, thisArg);
  }

  start(id: string): void {
    logger.debug(`[start]: ${id}`);

    this.programs
      .filter((program) => program.id === id)
      .map((program) => program.start());
  }

  stop(id: string): void {
    logger.debug(`[stop]: ${id}`);

    this.programs
      .filter((program) => program.id === id)
      .map((program) => program.stop());
  }

  stopAll(): void {
    logger.debug("[stop all]");

    this.programs.map((program) => program.stop());
  }

  toJSON() {
    return this.programs;
  }
}

export default ProgramManager;
