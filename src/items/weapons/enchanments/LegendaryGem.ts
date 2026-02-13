import { WeaponDecorator } from "../WeaponDecorator";

export class LegendaryGem extends WeaponDecorator {
    public getDamage(): number {
        return super.getDamage() * 2; 
    }

    public getDescription(): string {
        return "Legendary " + super.getDescription();
    }
}
        
