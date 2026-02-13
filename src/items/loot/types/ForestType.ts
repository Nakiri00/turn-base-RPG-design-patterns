import type { ILootWeapon, ILootArmor } from "../interfaces/ILootItem";

export class WoodenBow implements ILootWeapon {
        attack(): void {
            console.log("Membidik panah kayu... Ciuww! (Damage: 15)");
        }
        getDescription(): string { return "Busur Kayu Kuno"; }
    }

export class LeatherTunic implements ILootArmor {
    defend(): void {
        console.log("Menahan serangan ringan dengan kulit rusa. (Defense: 5)");
    }
    getDescription(): string { return "Baju Kulit Hutan"; }
}

    