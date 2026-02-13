export function runStrategyDemo(){
    // ==========================================
    // 1. STRATEGY INTERFACE
    // ==========================================
    interface AIStrategy {
        // Strategi butuh akses ke data musuh (posisi, HP) untuk bikin keputusan
        execute(enemy: Enemy): void;
    }

    // ==========================================
    // 2. CONTEXT (Musuh)
    // ==========================================
    class Enemy {
        private strategy: AIStrategy;
        public name: string;
        public hp: number;
        public position: number = 0; // Jarak dari player

        constructor(name: string, hp: number) {
            this.name = name;
            this.hp = hp;
            // Default: Pasif dulu
            this.strategy = new PassiveStrategy();
        }

        public setStrategy(strategy: AIStrategy): void {
            this.strategy = strategy;
            console.log(`[AI CHANGE] ${this.name} sekarang menggunakan strategi: ${strategy.constructor.name}`);
        }

        public performAction(): void {
            this.strategy.execute(this);
        }
    }

    // ==========================================
    // 3. CONCRETE STRATEGIES (Otak AI)
    // ==========================================

    // --- OTAK 1: AGRESIF (Serang Terus!) ---
    class AggressiveStrategy implements AIStrategy {
        public execute(enemy: Enemy): void {
            console.log(`${enemy.name} (Agresif): "MAJU TERUS! SERANG!!"`);
            enemy.position -= 1; // Mendekati player
            // Simulasi serangan
            console.log("-> Menyerang Player dengan Brutal! (Damage: 20)");
        }
    }

    // --- OTAK 2: DEFENSIF (Lari & Heal) ---
    class DefensiveStrategy implements AIStrategy {
        public execute(enemy: Enemy): void {
            console.log(`${enemy.name} (Defensif): "Waduh, bahaya! Mundur dulu!"`);
            enemy.position += 2; // Menjauh dari player
            
            // Simulasi healing
            enemy.hp += 10;
            console.log(`-> Menggunakan Potion. HP sekarang: ${enemy.hp}`);
        }
    }

    // --- OTAK 3: PASIF (Patroli Santai) ---
    class PassiveStrategy implements AIStrategy {
        public execute(enemy: Enemy): void {
            console.log(`${enemy.name} (Pasif): "Hmm... sepi ya hari ini."`);
            // Jalan bolak-balik
            console.log("-> Berjalan santai sambil siul-siul...");
        }
    }

    // ==========================================
    // 4. CLIENT CODE (Simulasi Battle Dinamis)
    // ==========================================

    const goblinKing = new Enemy("Goblin King", 100);

    console.log("--- FASE 1: AWAL PERTEMPURAN ---");
    // Awalnya musuh santai
    goblinKing.performAction(); 

    console.log("\n--- FASE 2: PLAYER MENDETEKSI ---");
    // Musuh melihat player, ganti otak jadi Agresif
    goblinKing.setStrategy(new AggressiveStrategy());
    goblinKing.performAction();
    goblinKing.performAction(); // Serang lagi!

    console.log("\n--- FASE 3: MUSUH SEKARAT ---");
    // HP musuh tinggal sedikit
    goblinKing.hp = 20; 
    console.log(`Status Musuh: HP ${goblinKing.hp}`);

    // Logika game mendeteksi HP rendah -> Ganti strategi otomatis
    if (goblinKing.hp < 30) {
        goblinKing.setStrategy(new DefensiveStrategy());
    }

    goblinKing.performAction(); // Sekarang dia lari & heal!
}