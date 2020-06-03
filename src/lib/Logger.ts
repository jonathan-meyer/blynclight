import Debug from "debug";

export interface Logger {
  debug(...args: any): void;
  info(...args: any): void;
  error(...args: any): void;
}

class LoggerImpl implements Logger {
  private _debug: any;
  private _error: any;

  constructor(namesapce: string) {
    this._debug = Debug(namesapce);
    this._error = Debug(namesapce);

    // send debug messages to stdout
    this._debug.log = console.log.bind(console);
  }

  debug(...args: any): void {
    this._debug(...args);
  }

  info(...args: any): void {
    this._debug(...args);
  }

  error(...args: any): void {
    this._error(...args);
  }
}

export class LoggerFactory {
  static getLogger(namespace: string): Logger {
    return new LoggerImpl(namespace);
  }
}
