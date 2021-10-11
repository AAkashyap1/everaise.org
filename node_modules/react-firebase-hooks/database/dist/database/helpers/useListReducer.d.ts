import firebase from 'firebase/app';
declare const _default: () => [{
        error?: firebase.FirebaseError | undefined;
        loading: boolean;
        value: {
            keys?: string[] | undefined;
            values?: firebase.database.DataSnapshot[] | undefined;
        };
    }, (value: {
        type: "add";
        previousKey?: string | null | undefined;
        snapshot: firebase.database.DataSnapshot | null;
    } | {
        type: "change";
        snapshot: firebase.database.DataSnapshot | null;
    } | {
        type: "empty";
    } | {
        type: "error";
        error: firebase.FirebaseError;
    } | {
        type: "move";
        previousKey?: string | null | undefined;
        snapshot: firebase.database.DataSnapshot | null;
    } | {
        type: "remove";
        snapshot: firebase.database.DataSnapshot | null;
    } | {
        type: "reset";
    } | {
        type: "value";
        snapshots: firebase.database.DataSnapshot[] | null;
    }) => void];
export default _default;
