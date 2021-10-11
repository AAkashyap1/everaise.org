import firebase from 'firebase/app';
export declare type ValOptions<T> = {
    keyField?: string;
    refField?: string;
    transform?: (val: any) => T;
};
export declare const snapshotToData: <T>(snapshot: firebase.database.DataSnapshot, keyField?: string | undefined, refField?: string | undefined, transform?: ((val: any) => T) | undefined) => any;
