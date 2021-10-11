export declare const useComparatorRef: <T>(value: T | null | undefined, isEqual: (v1: T | null | undefined, v2: T | null | undefined) => boolean, onChange?: (() => void) | undefined) => {
    current: T | null | undefined;
};
export interface HasIsEqual<T> {
    isEqual: (value: T) => boolean;
}
export declare const useIsEqualRef: <T extends HasIsEqual<T>>(value: T | null | undefined, onChange?: (() => void) | undefined) => {
    current: T | null | undefined;
};
export declare const useIdentifyRef: <T>(value: T | null | undefined, onChange?: (() => void) | undefined) => {
    current: T | null | undefined;
};
