import type { IObserver } from "../../core/events/interfaces/IObserver";
import type { ISubject } from "../../core/events/interfaces/ISubject";
import { Hero } from "../../characters/Hero";

export class AudioSystem implements IObserver {
    public update(subject: ISubject): void {
        if (subject instanceof Hero) {
            if (subject.hp <= 0) {
                console.log(`[AUDIO] Memutar lagu sedih "Game Over.mp3"`);
            } else if (subject.hp < 30) {
                console.log(`[AUDIO] Detak jantung berdegup kencang "Thump... Thump..."`);
            }
        }
    }
}