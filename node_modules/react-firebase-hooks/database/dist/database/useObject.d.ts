import firebase from 'firebase/app';
import { ValOptions } from './helpers';
import { Val } from './types';
export declare const useObject: (query?: firebase.database.Query | null | undefined) => [firebase.database.DataSnapshot | undefined, boolean, firebase.FirebaseError | undefined];
export declare const useObjectVal: <T, KeyField extends string = "", RefField extends string = "">(query?: firebase.database.Query | null | undefined, options?: ValOptions<T> | undefined) => [Val<T, KeyField, RefField> | undefined, boolean, firebase.FirebaseError | undefined];
