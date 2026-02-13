export function runAbstractDemo(){
    // ==========================================
    // 1. ABSTRACT PRODUCTS (Interface Barang)
    // ==========================================
    interface Weapon {
        attack(): void;
        getDescription(): string;
    }

    interface Armor {
        defend(): void;
        getDescription(): string;
    }

    // ==========================================
    // 2. CONCRETE PRODUCTS (Barang Nyata)
    // ==========================================

    // --- FAMILY 1: FOREST THEME ---
    class WoodenBow implements Weapon {
        attack(): void {
            console.log("Membidik panah kayu... Ciuww! (Damage: 15)");
        }
        getDescription(): string { return "Busur Kayu Kuno"; }
    }

    class LeatherTunic implements Armor {
        defend(): void {
            console.log("Menahan serangan ringan dengan kulit rusa. (Defense: 5)");
        }
        getDescription(): string { return "Baju Kulit Hutan"; }
    }

    // --- FAMILY 2: SEA THEME ---
    class Trident implements Weapon {
        attack(): void {
            console.log("Menusuk dengan garpu laut! Jleb! (Damage: 25)");
        }
        getDescription(): string { return "Trisula Poseidon"; }
    }

    class ScaleMail implements Armor {
        defend(): void {
            console.log("Sisik naga laut memantulkan pedang. (Defense: 12)");
        }
        getDescription(): string { return "Zirah Sisik Ikan"; }
    }

    // ==========================================
    // 3. ABSTRACT FACTORY (Pabrik Abstrak)
    // ==========================================
    interface LootFactory {
        // Factory ini WAJIB bisa membuat satu set lengkap (Senjata & Armor)
        createWeapon(): Weapon;
        createArmor(): Armor;
    }

    // ==========================================
    // 4. CONCRETE FACTORIES (Pabrik Tema Spesifik)
    // ==========================================

    class ForestLootFactory implements LootFactory {
        public createWeapon(): Weapon {
            return new WoodenBow(); // Pasti Bow
        }
        public createArmor(): Armor {
            return new LeatherTunic(); // Pasti Leather
        }
    }

    class SeaLootFactory implements LootFactory {
        public createWeapon(): Weapon {
            return new Trident(); // Pasti Trident
        }
        public createArmor(): Armor {
            return new ScaleMail(); // Pasti Scale
        }
    }

    // ==========================================
    // 5. CLIENT CODE (Sistem Drop Item)
    // ==========================================
    class TreasureChest {
        private weapon: Weapon;
        private armor: Armor;

        // Client tidak peduli factory apa yang masuk (Hutan/Laut)
        // Client hanya tahu dia akan dapat Weapon dan Armor yang valid
        constructor(factory: LootFactory) {
            this.weapon = factory.createWeapon();
            this.armor = factory.createArmor();
        }

        public openChest(): void {
            console.log("--- MEMBUKA PETI HARTA KARUN ---");
            console.log(`Ditemukan Senjata: ${this.weapon.getDescription()}`);
            this.weapon.attack();
            
            console.log(`Ditemukan Armor: ${this.armor.getDescription()}`);
            this.armor.defend();
            console.log("--------------------------------");
        }
    }

    // --- TESTING SCENARIO ---

    // Skenario 1: Player mengalahkan Elf di Hutan
    console.log("Scenario: Loot dari Hutan Elf");
    const forestFactory = new ForestLootFactory();
    const forestChest = new TreasureChest(forestFactory);
    forestChest.openChest();

    // Skenario 2: Player mengalahkan Naga Laut
    console.log("\nScenario: Loot dari Istana Bawah Laut");
    const seaFactory = new SeaLootFactory();
    const seaChest = new TreasureChest(seaFactory);
    seaChest.openChest();
}