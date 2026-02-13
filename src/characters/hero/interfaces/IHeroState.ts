import { Hero } from "../../Hero";

export interface IHeroState {
    attack(hero: Hero): void;
    takeDamage(hero: Hero, amount: number): void;
}