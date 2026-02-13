import { WeaponDecorator } from "../WeaponDecorator";

export class FireEnchantment extends WeaponDecorator {
    public getDamage(): number {
        return super.getDamage() + 5;
    }

    public getDescription(): string {
        return super.getDescription() + " (Fire Aura)";
    }
}