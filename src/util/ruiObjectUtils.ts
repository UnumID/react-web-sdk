import { frwkConst } from 'frwk/ruiFrwkConst';
import { frwkHlpr } from 'frwk/ruiFrwkHlpr';

class ObjectUtil {
  isNullOrEmpty(obj: any): boolean {
    let retVal = false;

    switch (typeof obj) {
      case frwkConst.UNDEFINED:
        retVal = true;
        break;
      case frwkConst.STRING:
        if (obj === '') {
          retVal = true;
        }
        break;
      case frwkConst.OBJECT:
        if (obj === null) {
          retVal = true;
        } else if (obj.toUTCString) {
          if (obj.toUTCString() === '') {
            retVal = true;
          }
        } else if (Array.isArray(obj) && obj.length === 0) {
          retVal = true;
        } else if (Object.keys(obj).length === 0) {
          retVal = true;
        }
        break;
      default:
        frwkHlpr.logInfo('ObjectUtil::isNullOrEmpty', 'default switch case');
        break;
    }

    return (retVal);
  }

  isNull(obj: any): boolean {
    return (obj === undefined || obj === null);
  }

  getEnvValue(envName: string): any {
    if (process.env[envName]) {
      return (process.env[envName]);
    }

    return ('');
  }
}

export const objUtil = new ObjectUtil();
