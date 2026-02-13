export function runDecoratorDemo(){
    // ==========================================
    // 1. COMPONENT (Interface Dasar)
    // ==========================================
    interface Weapon {
        getDamage(): number;
        getDescription(): string;
    }

    // ==========================================
    // 2. CONCRETE COMPONENT (Barang Polos)
    // ==========================================
    class IronSword implements Weapon {
        public getDamage(): number {
            return 10; // Damage dasar
        }

        public getDescription(): string {
            return "Iron Sword";
        }
    }

    class MagicStaff implements Weapon {
        public getDamage(): number {
            return 5; // Damage fisik kecil
        }

        public getDescription(): string {
            return "Wooden Staff";
        }
    }

    // ==========================================
    // 3. BASE DECORATOR (Pembungkus)
    // ==========================================
    abstract class WeaponDecorator implements Weapon {
        // Kita simpan referensi ke object yang dibungkus
        protected wrappedWeapon: Weapon;

        constructor(weapon: Weapon) {
            this.wrappedWeapon = weapon;
        }

        // Delegasikan tugas ke object asli (default implementation)
        public getDamage(): number {
            return this.wrappedWeapon.getDamage();
        }

        public getDescription(): string {
            return this.wrappedWeapon.getDescription();
        }
    }

    // ==========================================
    // 4. CONCRETE DECORATORS (Efek Tambahan)
    // ==========================================

    // Efek Api: Tambah Damage Besar
    class FireEnchantment extends WeaponDecorator {
        public getDamage(): number {
            // Panggil damage asli, lalu tambah 5
            return super.getDamage() + 5;
        }

        public getDescription(): string {
            return super.getDescription() + " (Fire Aura)";
        }
    }

    // Efek Es: Tambah Damage Kecil + Efek Beku (di deskripsi)
    class IceEnchantment extends WeaponDecorator {
        public getDamage(): number {
            return super.getDamage() + 3;
        }

        public getDescription(): string {
            return super.getDescription() + " (Frozen Tip)";
        }
    }

    // Efek Legendaris: Kali lipat damage!
    class LegendaryGem extends WeaponDecorator {
        public getDamage(): number {
            return super.getDamage() * 2; // Critical Hit!
        }

        public getDescription(): string {
            return "Legendary " + super.getDescription();
        }
    }

    // ==========================================
    // 5. CLIENT CODE (Simulasi Crafting)
    // ==========================================

    console.log("--- 1. SENJATA NORMAL ---");
    let myWeapon: Weapon = new IronSword();
    console.log(`Weapon: ${myWeapon.getDescription()}`);
    console.log(`Damage: ${myWeapon.getDamage()}`);

    console.log("\n--- 2. UPGRADE: KASIH EFEK API ---");
    // Bungkus IronSword dengan FireEnchantment
    myWeapon = new FireEnchantment(myWeapon);
    console.log(`Weapon: ${myWeapon.getDescription()}`);
    console.log(`Damage: ${myWeapon.getDamage()}`); 
    // 10 + 5 = 15

    console.log("\n--- 3. UPGRADE: KASIH EFEK ES JUGA ---");
    // Bungkus FireEnchantment dengan IceEnchantment
    // Struktur sekarang: Ice( Fire( Sword ) )
    myWeapon = new IceEnchantment(myWeapon);
    console.log(`Weapon: ${myWeapon.getDescription()}`);
    console.log(`Damage: ${myWeapon.getDamage()}`);
    // 10 + 5 + 3 = 18

    console.log("\n--- 4. UPGRADE: PAKAI GEM LEGENDARIS ---");
    // Struktur sekarang: Gem( Ice( Fire( Sword ) ) )
    myWeapon = new LegendaryGem(myWeapon);
    console.log(`Weapon: ${myWeapon.getDescription()}`);
    console.log(`Damage: ${myWeapon.getDamage()}`);
    // (10 + 5 + 3) * 2 = 36 !!
}