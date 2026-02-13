import { WeaponDecorator } from "../WeaponDecorator";

export class IceEnchantment extends WeaponDecorator {
    public getDamage(): number {
        return super.getDamage() + 3;
    }

    public getDescription(): string {
        return super.getDescription() + " (Frozen Tip)";
    }
}