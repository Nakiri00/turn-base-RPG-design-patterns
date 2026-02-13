// ==========================================
// 1. PROTOTYPE INTERFACE
// ==========================================
interface MonsterPrototype {
    // Method clone ini yang paling penting
    clone(): MonsterPrototype;
    showDetails(): void;
    setID(id: string): void; // Untuk membedakan hasil clone
}

// ==========================================
// 2. CONCRETE PROTOTYPES
// ==========================================

class Slime implements MonsterPrototype {
    private id: string = "Original";
    
    constructor(
        public color: string, // Misal: Green, Red, Blue
        public hp: number,
        public attackPower: number
    ) {
        // Simulasi proses inisialisasi yang BERAT (misal load texture)
        console.log(`[Heavy Process] Loading Texture for ${color} Slime... DONE.`);
    }

    // Implementasi Cloning
    public clone(): MonsterPrototype {
        // Kita membuat object baru dengan menyalin properti object ini
        // Object.create atau new Slime dengan properti yang sama
        
        // Teknik Shallow Copy (Cukup untuk data primitif)
        const cloned = new Slime(this.color, this.hp, this.attackPower);
        
        // Teknik Deep Copy (Jika ada object bersarang, perlu logic tambahan)
        // Disini kita anggap simple clone
        return cloned;
    }

    public setID(newId: string): void {
        this.id = newId;
    }

    public showDetails(): void {
        console.log(`- [${this.id}] ${this.color} Slime | HP: ${this.hp} | ATK: ${this.attackPower}`);
    }
}

class Ghost implements MonsterPrototype {
    private id: string = "Original";

    constructor(public transparency: number) {
        console.log(`[Heavy Process] Generating Ghost Ectoplasm... DONE.`);
    }

    public clone(): MonsterPrototype {
        const cloned = new Ghost(this.transparency);
        return cloned;
    }

    public setID(newId: string): void {
        this.id = newId;
    }

    public showDetails(): void {
        console.log(`- [${this.id}] Ghost | Transparency: ${this.transparency}%`);
    }
}

// ==========================================
// 3. CLIENT CODE (Spawner System)
// ==========================================

console.log("=== PHASE 1: INISIALISASI MASTER (Berat) ===");
// Kita hanya melakukan "Heavy Process" sekali saja di sini
const masterGreenSlime = new Slime("Green", 50, 10);
const masterRedSlime = new Slime("Red", 100, 25); // Boss minion

console.log("\n=== PHASE 2: CLONING MASSAL (Cepat) ===");
// Saat battle dimulai, kita clone dari master tanpa loading ulang

const minionArmy: MonsterPrototype[] = [];

// Clone 5 Green Slimes
for (let i = 1; i <= 5; i++) {
    const minion = masterGreenSlime.clone();
    minion.setID(`Minion-${i}`);
    
    // Kita bisa modifikasi hasil clone sedikit (misal variasi HP)
    // (minion as Slime).hp += Math.floor(Math.random() * 10); 
    
    minionArmy.push(minion);
}

// Clone 1 Red Slime Captain
const captain = masterRedSlime.clone();
captain.setID("Captain-A");
minionArmy.push(captain);

console.log("\n=== BATTLEFIELD STATUS ===");
minionArmy.forEach(m => m.showDetails());

// Bukti bahwa objectnya berbeda di memori
console.log("\n=== MEMORY CHECK ===");
console.log("Apakah Minion-1 sama dengan Master? " + (minionArmy[0] === masterGreenSlime)); // Harus False