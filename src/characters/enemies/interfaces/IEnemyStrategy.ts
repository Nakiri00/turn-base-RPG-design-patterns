import { Enemy } from "../Enemy";

export interface IEnemyStrategy {
    execute(enemy: Enemy): void;
}