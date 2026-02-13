import type{ IObserver } from "../../core/events/interfaces/IObserver";
import type { ISubject } from "../../core/events/interfaces/ISubject";
import { Hero } from "../../characters/Hero";

export class AchievementSystem implements IObserver {
    private unlocked: boolean = false;

    public update(subject: ISubject): void {
        if (subject instanceof Hero) {
            if (!this.unlocked && subject.hp < 10 && subject.hp > 0) {
                console.log(`\x1b[33m[ACHIEVEMENT UNLOCKED] 🏆 "Near Death Experience" (Survive with < 10 HP)\x1b[0m`);
                this.unlocked = true; 
            }
        }
    }
}