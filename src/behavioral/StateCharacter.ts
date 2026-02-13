export function runStateDemo(){
    // ==========================================
    // 1. STATE INTERFACE
    // ==========================================
    interface CharacterState {
        // Kita butuh referensi ke 'GameCharacter' agar state bisa
        // mengubah status karakter (misal: dari Normal -> Dead)
        attack(character: GameCharacter): void;
        takeDamage(character: GameCharacter, amount: number): void;
    }

    // ==========================================
    // 2. CONTEXT (Karakter Utama)
    // ==========================================
    class GameCharacter {
        private state: CharacterState;
        public hp: number;
        public name: string;

        constructor(name: string, hp: number) {
            this.name = name;
            this.hp = hp;
            // Default state saat lahir adalah Normal
            this.state = new NormalState();
        }

        // Method untuk mengganti State (Transisi)
        public setState(newState: CharacterState): void {
            this.state = newState;
            // Tampilkan log perubahan state agar jelas
            console.log(`[STATUS CHANGE] ${this.name} berubah menjadi ${newState.constructor.name}`);
        }

        // Delegasi: Karakter tidak mikir, serahkan ke State!
        public attack(): void {
            this.state.attack(this);
        }

        public takeDamage(amount: number): void {
            this.state.takeDamage(this, amount);
        }
    }

    // ==========================================
    // 3. CONCRETE STATES (Berbagai Kondisi)
    // ==========================================

    // --- A. KONDISI NORMAL ---
    class NormalState implements CharacterState {
        public attack(character: GameCharacter): void {
            console.log(`${character.name} menyerang dengan gagah berani! (100 Damage)`);
        }

        public takeDamage(character: GameCharacter, amount: number): void {
            character.hp -= amount;
            console.log(`${character.name} terkena ${amount} damage. Sisa HP: ${character.hp}`);

            // Logika Transisi State
            if (character.hp <= 0) {
                character.setState(new DeadState());
            } else if (amount > 50) {
                // Jika damage terlalu besar (Critical), jadi pusing
                console.log("Pukulan terlalu keras! Karakter pusing tujuh keliling...");
                character.setState(new StunnedState());
            }
        }
    }

    // --- B. KONDISI STUNNED (Pusing/Lumpuh) ---
    class StunnedState implements CharacterState {
        public attack(character: GameCharacter): void {
            console.log(`${character.name} mencoba menyerang... tapi dia pusing dan terjatuh! (0 Damage)`);
            // Mungkin setelah gagal nyerang, dia sembuh kembali ke Normal?
            console.log("Perlahan kesadarannya pulih...");
            character.setState(new NormalState());
        }

        public takeDamage(character: GameCharacter, amount: number): void {
            // Saat stunned, defense lemah, damage masuk 2x lipat!
            const criticalDmg = amount * 2;
            character.hp -= criticalDmg;
            console.log(`${character.name} tidak bisa menangkis! CRITICAL HIT ${criticalDmg} damage!`);

            if (character.hp <= 0) {
                character.setState(new DeadState());
            }
        }
    }

    // --- C. KONDISI DEAD (Mati) ---
    class DeadState implements CharacterState {
        public attack(character: GameCharacter): void {
            console.log(`${character.name} tidak merespon. Dia sudah mati.`);
        }

        public takeDamage(character: GameCharacter, amount: number): void {
            console.log("Memukul mayat tidak ada gunanya...");
        }
    }

    // ==========================================
    // 4. CLIENT CODE (Simulasi Battle)
    // ==========================================

    const hero = new GameCharacter("Arthur", 100);

    console.log("--- ROUND 1: NORMAL ---");
    hero.attack(); 
    // Output: Menyerang normal

    console.log("\n--- ROUND 2: KENA DAMAGE KRITIS ---");
    hero.takeDamage(60); 
    // Output: Kena 60 dmg -> HP sisa 40 -> State berubah jadi StunnedState

    console.log("\n--- ROUND 3: MENCOBA MENYERANG SAAT STUNNED ---");
    hero.attack(); 
    // Output: Gagal menyerang (pusing) -> State kembali ke NormalState

    console.log("\n--- ROUND 4: SERANGAN MEMATIKAN ---");
    hero.takeDamage(50); 
    // Output: Kena 50 dmg -> HP sisa -10 -> State berubah jadi DeadState

    console.log("\n--- ROUND 5: MENCOBA MENYERANG SAAT MATI ---");
    hero.attack(); 
    // Output: Tidak merespon
}