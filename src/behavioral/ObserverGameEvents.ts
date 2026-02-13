// ==========================================
// 1. INTERFACES
// ==========================================

// Observer: Pihak yang "Menonton"
interface IObserver {
    update(subject: GameHero): void;
}

// Subject: Pihak yang "Ditonon"
interface ISubject {
    attach(observer: IObserver): void;
    detach(observer: IObserver): void;
    notify(): void;
}

// ==========================================
// 2. CONCRETE SUBJECT (Hero)
// ==========================================
class GameHero implements ISubject {
    public name: string;
    public hp: number;
    public maxHp: number;
    
    // Daftar "Fans" yang menonton Hero
    private observers: IObserver[] = [];

    constructor(name: string, hp: number) {
        this.name = name;
        this.maxHp = hp;
        this.hp = hp;
    }

    // --- LOGIKA OBSERVER ---
    public attach(observer: IObserver): void {
        const isExist = this.observers.includes(observer);
        if (!isExist) {
            this.observers.push(observer);
            console.log(`[SYSTEM] Observer attached: ${observer.constructor.name}`);
        }
    }

    public detach(observer: IObserver): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex !== -1) {
            this.observers.splice(observerIndex, 1);
            console.log(`[SYSTEM] Observer detached: ${observer.constructor.name}`);
        }
    }

    // Memberitahu semua observer bahwa ada perubahan
    public notify(): void {
        console.log(`\n--- NOTIFYING ${this.observers.length} OBSERVERS ---`);
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    // --- LOGIKA GAME ---
    public takeDamage(amount: number): void {
        console.log(`${this.name} terkena ${amount} damage!`);
        this.hp -= amount;
        
        // SETIAP ada perubahan penting, panggil notify()
        this.notify();
    }

    public heal(amount: number): void {
        console.log(`${this.name} healing ${amount} HP.`);
        this.hp += amount;
        if (this.hp > this.maxHp) this.hp = this.maxHp;

        this.notify();
    }
}

// ==========================================
// 3. CONCRETE OBSERVERS (Listener)
// ==========================================

// OBSERVER 1: UI Health Bar (Visual)
class HealthBarUI implements IObserver {
    public update(hero: GameHero): void {
        const percentage = (hero.hp / hero.maxHp) * 100;
        // Simulasi visual bar
        const bar = "█".repeat(Math.floor(percentage / 10)) + "░".repeat(10 - Math.floor(percentage / 10));
        console.log(`[UI DISPLAY] HP Bar: [${bar}] ${percentage.toFixed(0)}%`);
    }
}

// OBSERVER 2: Achievement System (Logika)
class AchievementSystem implements IObserver {
    private unlocked: boolean = false;

    public update(hero: GameHero): void {
        if (!this.unlocked && hero.hp < 10 && hero.hp > 0) {
            console.log(`[ACHIEVEMENT UNLOCKED] 🏆 "Near Death Experience" (Survive with < 10 HP)`);
            this.unlocked = true; // Supaya tidak spam achievement berkali-kali
        }
    }
}

// OBSERVER 3: Audio System (Suara)
class AudioSystem implements IObserver {
    public update(hero: GameHero): void {
        if (hero.hp <= 0) {
            console.log(`[AUDIO] 🎵 Memutar lagu sedih "Game Over.mp3"`);
        } else if (hero.hp < 30) {
            console.log(`[AUDIO] 🔊 Detak jantung berdegup kencang "Thump... Thump..."`);
        }
    }
}

// ==========================================
// 4. CLIENT CODE (Main Game Loop)
// ==========================================

const hero = new GameHero("Alucard", 100);

// Buat Observer
const ui = new HealthBarUI();
const achievement = new AchievementSystem();
const audio = new AudioSystem();

// Pasang Observer ke Hero (Subscribe)
hero.attach(ui);
hero.attach(achievement);
hero.attach(audio);

// SIMULASI 1: Kena Damage Normal
console.log("\n>>> EVENT 1: Serangan Kecil");
hero.takeDamage(20); 
// Output: UI update 80%, Audio diam

// SIMULASI 2: Kena Damage Besar (Kritis)
console.log("\n>>> EVENT 2: Serangan Boss");
hero.takeDamage(75); 
// Output: 
// - UI update 5%
// - Achievement Unlocked (karena HP < 10)
// - Audio detak jantung

// SIMULASI 3: Mati
console.log("\n>>> EVENT 3: Fatality");
hero.takeDamage(10);
// Output:
// - UI update 0%
// - Audio Game Over

// SIMULASI 4: UI Dicopot (Misal user masuk menu settings -> Hide UI)
console.log("\n>>> EVENT 4: User Menyembunyikan UI");
hero.detach(ui);
hero.heal(50); 
// Output: Tidak ada log UI Bar, tapi Audio & Achievement tetap jalan (kalau logic reset)