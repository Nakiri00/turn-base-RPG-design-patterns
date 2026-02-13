export interface ILootWeapon {
    attack(): void;
    getDescription(): string;
}

export interface ILootArmor {
    defend(): void;
    getDescription(): string;
}