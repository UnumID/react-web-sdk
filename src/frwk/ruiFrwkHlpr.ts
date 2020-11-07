import { frwkConst } from 'frwk/ruiFrwkConst';

class FrwkHlpr {
  logNote(fName: string, str: string): void {
    console.log(fName + frwkConst.LOG_DELIMETER + str);
  }

  logError(fName: string, str: string): void {
    console.error(fName + frwkConst.LOG_DELIMETER + str);
  }

  logInfo(fName: string, str: string): void {
    console.info(fName + frwkConst.LOG_DELIMETER + str);
  }

  logWarn(fName: string, str: string): void {
    console.warn(fName + frwkConst.LOG_DELIMETER + str);
  }

  showAlert(msg: string): void {
    alert(msg);
  }
}

export const frwkHlpr = new FrwkHlpr();
