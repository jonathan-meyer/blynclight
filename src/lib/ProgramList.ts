import Blynclight from "./Blynclight";
import Program from "./Program";

class ProgramList {
  private lights: Blynclight[] = [];
  private programs: Program[] = [];

  addLight(light: Blynclight): ProgramList {
    this.lights.push(light);
    return this;
  }

  addProgram(program: Program): ProgramList {
    this.programs.push(program);
    return this;
  }

  list(): Program[] {
    return this.programs;
  }

  start(id: string) {
    this.programs
      .filter((program) => program.id === id)
      .map((program) => program.start());
  }

  stop(id: string) {}

  stopAll(): ProgramList {
    this.programs.map((program) => program.stop());
    return this;
  }
}

export default ProgramList;
