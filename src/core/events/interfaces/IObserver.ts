import type { ISubject } from "./ISubject";

export interface IObserver {
    // Observer menerima subject yang mentrigger event
    update(subject: ISubject): void;
}