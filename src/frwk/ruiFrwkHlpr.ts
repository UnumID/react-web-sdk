import { frwkConst, consoleTypes } from 'frwk/ruiFrwkConst';

const writeLog = (type:number, fName: string, msg: string): void => {
  if (process.env.REACT_APP_ENABLE_LOG !== 'true') return;

  const log = fName + frwkConst.LOG_DELIMETER + msg;

  switch (type) {
    case consoleTypes.WARN:
      console.warn(log);
      break;
    case consoleTypes.INFO:
      console.info(log);
      break;
    case consoleTypes.ERROR:
      console.error(log);
      break;
    case consoleTypes.LOG:
    default:
      console.log(log);
      break;
  }
};

class FrwkHlpr {
  logNote(fName: string, str: string): void {
    writeLog(consoleTypes.LOG, fName, str);
  }

  logError(fName: string, str: string): void {
    writeLog(consoleTypes.ERROR, fName, str);
  }

  logInfo(fName: string, str: string): void {
    writeLog(consoleTypes.INFO, fName, str);
  }

  logWarn(fName: string, str: string): void {
    writeLog(consoleTypes.WARN, fName, str);
  }

  showAlert(msg: string): void {
    alert(msg);
  }
}

export const frwkHlpr = new FrwkHlpr();
