export function runCompositeDemo(){
    // ==========================================
    // 1. COMPONENT (Interface Umum)
    // ==========================================
    // Baik Item maupun Tas harus punya fungsi ini
    interface InventoryComponent {
        getName(): string;
        getWeight(): number; // Satuan Kg
        display(indent: string): void; // Untuk visualisasi struktur
    }

    // ==========================================
    // 2. LEAF (Item Tunggal)
    // ==========================================
    // Ini adalah ujung pohon (tidak punya anak)
    class SingleItem implements InventoryComponent {
        constructor(
            private name: string,
            private weight: number
        ) {}

        public getName(): string {
            return this.name;
        }

        public getWeight(): number {
            return this.weight;
        }

        public display(indent: string): void {
            console.log(`${indent}- ${this.name} (${this.weight} kg)`);
        }
    }

    // ==========================================
    // 3. COMPOSITE (Wadah / Container)
    // ==========================================
    // Ini bisa berisi Item Tunggal ATAU Wadah lain
    class ItemContainer implements InventoryComponent {
        // Array ini bisa menyimpan SingleItem atau ItemContainer lain!
        private items: InventoryComponent[] = [];

        constructor(
            private name: string,
            private selfWeight: number // Berat tasnya sendiri (kosong)
        ) {}

        public add(item: InventoryComponent): void {
            this.items.push(item);
        }

        public remove(item: InventoryComponent): void {
            const index = this.items.indexOf(item);
            if (index > -1) {
                this.items.splice(index, 1);
            }
        }

        public getName(): string {
            return this.name;
        }

        // --- REKURSIF MAGIC ---
        // Menghitung berat tas sendiri + total berat semua isinya
        public getWeight(): number {
            let totalWeight = this.selfWeight;
            
            for (const item of this.items) {
                totalWeight += item.getWeight(); // Memanggil getWeight milik anak
            }
            
            return totalWeight;
        }

        public display(indent: string): void {
            console.log(`${indent}+ [BOX] ${this.name} (Berat Wadah: ${this.selfWeight} kg)`);
            
            // Tampilkan semua isinya dengan indentasi lebih dalam
            for (const item of this.items) {
                item.display(indent + "  ");
            }
        }
    }

    // ==========================================
    // 4. CLIENT CODE (Simulasi Inventory)
    // ==========================================

    // A. Membuat Item-item kecil (Leaf)
    const potion = new SingleItem("Health Potion", 0.5);
    const sword = new SingleItem("Iron Sword", 3.0);
    const coin = new SingleItem("Gold Coin", 0.1);
    const map = new SingleItem("Map", 0.2);

    // B. Membuat Wadah Kecil (Composite)
    const pouch = new ItemContainer("Kantong Pinggang", 0.2);
    pouch.add(coin);
    pouch.add(potion); // Masukkan potion ke kantong

    // C. Membuat Wadah Utama (Composite Root)
    const backpack = new ItemContainer("Ransel Besar", 1.0);
    backpack.add(sword); // Masukkan pedang ke ransel
    backpack.add(map);   // Masukkan peta ke ransel
    backpack.add(pouch); // Masukkan kantong pinggang ke dalam ransel! (Nesting)

    // D. Tampilkan Struktur & Hitung Berat
    console.log("=== STRUKTUR INVENTORY ===");
    backpack.display("");

    console.log("\n=== PERHITUNGAN BERAT TOTAL ===");
    // Client cukup panggil getWeight() di root, 
    // sistem akan menghitung sampai ke item terkecil secara otomatis.
    const totalBerat = backpack.getWeight();
    console.log(`Total Berat Beban Hero: ${totalBerat.toFixed(2)} kg`);

    // Logika Validasi (Opsional)
    if (totalBerat > 10) {
        console.log("WARNING: Hero keberatan beban! (Overweight)");
    } else {
        console.log("STATUS: Beban aman.");
    }
}