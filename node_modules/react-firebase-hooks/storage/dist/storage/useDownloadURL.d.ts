import firebase from 'firebase/app';
import { LoadingHook } from '../util';
export declare type DownloadURLHook = LoadingHook<string, firebase.FirebaseError>;
declare const _default: (storageRef?: firebase.storage.Reference | null | undefined) => [string | undefined, boolean, firebase.FirebaseError | undefined];
export default _default;
