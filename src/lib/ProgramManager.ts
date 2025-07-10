import { LoggerFactory } from './Logger';
import Program from './Program';

const logger = LoggerFactory.getLogger('blynclight:ProgramManager');

class ProgramManager {
  private programs: Program[] = [];

  add(program: Program): void {
    logger.debug('[add]');

    this.programs.push(program);
  }

  get(id: string): Program | undefined {
    return this.programs.find((program) => program.id === id);
  }

  map<U>(
    callbackfn: (value: Program, index: number, array: Program[]) => U,
    thisArg?: any
  ): U[] {
    return this.programs.map(callbackfn, thisArg);
  }

  start(id: string, options?: Record<string, string>): boolean {
    logger.debug(`[start]: ${id}`, options);

    this.stopAll();

    return (
      this.programs
        .filter((program) => program.id === id)
        .map((program) => program.start(options)).length > 0
    );
  }

  stop(id: string): boolean {
    logger.debug(`[stop]: ${id}`);

    return (
      this.programs
        .filter((program) => program.id === id)
        .map((program) => program.stop()).length > 0
    );
  }

  stopAll(): void {
    logger.debug('[stop all]');

    this.programs.map((program) => program.stop());
  }

  isRunning(): boolean {
    return this.programs.filter((p) => p.isRunning()).length > 0;
  }

  toJSON() {
    return this.programs;
  }
}

export default ProgramManager;
