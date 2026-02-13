import type { ISubject } from "./interfaces/ISubject";
import type { IObserver } from "./interfaces/IObserver";

export class Subject implements ISubject {
    protected observers: IObserver[] = [];

    public attach(observer: IObserver): void {
        const isExist = this.observers.includes(observer);
        if (!isExist) {
            this.observers.push(observer);
            console.log(`[SYSTEM] Observer attached: ${observer.constructor.name}`);
        }
    }

    public detach(observer: IObserver): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex !== -1) {
            this.observers.splice(observerIndex, 1);
            console.log(`[SYSTEM] Observer detached: ${observer.constructor.name}`);
        }
    }

    public notify(): void {
        // Mengirim 'this' (objek Subject itu sendiri) ke observer
        for (const observer of this.observers) {
            observer.update(this);
        }
    }
}