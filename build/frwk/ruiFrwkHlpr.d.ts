declare class FrwkHlpr {
    logNote(fName: string, str: string): void;
    logError(fName: string, str: string): void;
    logInfo(fName: string, str: string): void;
    logWarn(fName: string, str: string): void;
    showAlert(msg: string): void;
}
export declare const frwkHlpr: FrwkHlpr;
export {};
