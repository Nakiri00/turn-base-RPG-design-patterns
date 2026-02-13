export function runFactoryDemo(){
    // ==========================================
    // 1. PRODUCT (Abstraksi Monster)
    // ==========================================
    abstract class Monster {
        constructor(
            public name: string, 
            public hp: number, 
            public damage: number
        ) {}

        // Method abstract yang WAJIB diimplementasikan oleh monster spesifik
        public abstract attack(): void;
        
        // Method umum yang dimiliki semua monster
        public takeDamage(amount: number): void {
            this.hp -= amount;
            console.log(`${this.name} terkena ${amount} damage! Sisa HP: ${this.hp}`);
            if (this.hp <= 0) console.log(`${this.name} telah mati!`);
        }
    }

    // ==========================================
    // 2. CONCRETE PRODUCTS (Jenis-jenis Monster)
    // ==========================================
    class Goblin extends Monster {
        constructor() {
            super("Goblin Scout", 30, 5); // HP kecil, Damage kecil
        }

        public attack(): void {
            console.log(`${this.name} menusuk dengan belati karatan! (Damage: ${this.damage})`);
        }
    }

    class Orc extends Monster {
        constructor() {
            super("Orc Warrior", 80, 15); // HP besar, Damage besar
        }

        public attack(): void {
            console.log(`${this.name} mengayunkan kapak besar! DUAR! (Damage: ${this.damage})`);
        }
    }

    class Skeleton extends Monster {
        constructor() {
            super("Cursed Skeleton", 45, 10);
        }

        public attack(): void {
            console.log(`${this.name} memanah dari jarak jauh! (Damage: ${this.damage})`);
        }
    }

    // ==========================================
    // 3. CREATOR (Factory Base Class)
    // ==========================================
    abstract class MonsterFactory {
        // --- THE FACTORY METHOD ---
        // Ini adalah metode inti. Subclass yang akan menentukan isinya.
        public abstract createMonster(): Monster;

        // Business Logic (Fitur tambahan)
        // Factory tidak hanya membuat object, tapi bisa menjalankan logika awal (spawning effect)
        public spawnMonster(): Monster {
            const monster = this.createMonster();
            console.log(`\n--- SPAWNING EVENT ---`);
            console.log(`Sebuah bayangan muncul... ${monster.name} telah hadir!`);
            return monster;
        }
    }

    // ==========================================
    // 4. CONCRETE CREATORS (Factory Spesifik)
    // ==========================================

    // Factory untuk Area Gua (Isinya Goblin & Orc)
    class CaveMonsterFactory extends MonsterFactory {
        public createMonster(): Monster {
            // Logika Random: 70% Goblin, 30% Orc
            const randomNum = Math.random();
            if (randomNum < 0.7) {
                return new Goblin();
            } else {
                return new Orc();
            }
        }
    }

    // Factory untuk Area Kuburan (Isinya Skeleton)
    class GraveyardMonsterFactory extends MonsterFactory {
        public createMonster(): Monster {
            return new Skeleton();
        }
    }

    // ==========================================
    // 5. CLIENT CODE (Simulasi Game Loop)
    // ==========================================
    function mainGameLoop(factory: MonsterFactory) {
        // Client tidak perlu tahu apakah ini Gua atau Kuburan
        // Client hanya minta "spawnMonster()"
        const enemy = factory.spawnMonster();
        
        enemy.attack();
        enemy.takeDamage(10);
    }

    // --- TESTING SCENARIO ---

    console.log("=== LEVEL 1: MEMASUKI GUA GELAP ===");
    const level1Factory = new CaveMonsterFactory();
    mainGameLoop(level1Factory); 
    // Output bisa Goblin atau Orc (tergantung random)

    console.log("\n=== LEVEL 2: MEMASUKI KUBURAN TUA ===");
    const level2Factory = new GraveyardMonsterFactory();
    mainGameLoop(level2Factory); 
    // Output pasti Skeleton
}