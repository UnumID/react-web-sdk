interface UseTimeoutResult extends Array<() => void> {
    0: () => void;
    1: () => void;
}
export declare const useTimeout: (callback: () => void, delay: number) => UseTimeoutResult;
export {};
//# sourceMappingURL=useTimeout.d.ts.map