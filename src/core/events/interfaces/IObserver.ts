import type { ISubject } from "./ISubject";

export interface IObserver {
    update(subject: ISubject): void;
}