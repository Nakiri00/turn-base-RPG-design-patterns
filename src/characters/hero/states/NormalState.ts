import type { IHeroState } from "../interfaces/IHeroState";
import { Hero } from "../../Hero";
import { DeadState } from "./DeadState";
import { StunnedState } from "./StunnedState";

export class NormalState implements IHeroState {
    public attack(hero: Hero): void {
        console.log(`${hero.name} menyerang dengan gagah berani!`);
    }

    public takeDamage(hero: Hero, amount: number): void {
        hero.hp -= amount;
        console.log(`${hero.name} terkena ${amount} damage.`);

        if (hero.hp <= 0) {
            hero.setState(new DeadState());
        } else if (amount > 50) {
            console.log("Pukulan terlalu keras! Karakter pusing...");
            hero.setState(new StunnedState());
        }
    }
}