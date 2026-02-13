import type { ILootFactory } from "../interfaces/ILootFactory";
import type { ILootWeapon, ILootArmor } from "../interfaces/ILootItem";
import { WoodenBow, LeatherTunic } from "../types/ForestType";

export class ForestFactory implements ILootFactory {
    public createWeapon(): ILootWeapon { return new WoodenBow(); }
    public createArmor(): ILootArmor { return new LeatherTunic(); }
}