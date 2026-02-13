// ==========================================
// 1. FLYWEIGHT (Intrinsic State)
// ==========================================
// Class ini menyimpan data BERAT yang dibagi-bagi (Shared)
class TileType {
    constructor(
        private name: string,       // Misal: "Grass", "Water"
        private texture: string,    // Misal: "assets/grass.png" (Anggap file gambar besar)
        private movementCost: number, // 1 (Mudah), 10 (Susah)
        private isWalkable: boolean
    ) {}

    // Method draw menerima Extrinsic State (x, y) dari luar
    public draw(canvas: string[][], x: number, y: number): void {
        // Simulasi menggambar ke layar
        // Kita tidak simpan X dan Y di dalam class ini!
        if (canvas[y] !== undefined) {
            // Ambil huruf pertama (G/W/S) untuk representasi gambar
            const char = this.texture.charAt(0).toUpperCase(); 
            canvas[y][x] = char;
        }
    }

    public getName(): string { return this.name; }
}

// ==========================================
// 2. FLYWEIGHT FACTORY (Pabrik & Cache)
// ==========================================
// Bertugas memastikan tidak ada duplikasi TileType
class TileFactory {
    private static tileTypes: { [key: string]: TileType } = {};

    public static getTileType(name: string, texture: string, cost: number, walkable: boolean): TileType {
        // Cek apakah tipe ini sudah pernah dibuat?
        if (!this.tileTypes[name]) {
            // Jika belum, buat baru dan simpan di cache
            this.tileTypes[name] = new TileType(name, texture, cost, walkable);
            console.log(`[Factory] Creating new Flyweight: ${name}`);
        }
        // Jika sudah ada, kembalikan yang lama (Reuse)
        return this.tileTypes[name]!;
    }
}

// ==========================================
// 3. CONTEXT (World / Map System)
// ==========================================
// Menyimpan ribuan referensi ke Flyweight, plus koordinatnya
class GameMap {
    private tiles: TileType[][] = [];

    constructor(private width: number, private height: number) {
        // Tidak perlu loop inisialisasi di sini jika di generateTerrain sudah ada
    }

    public generateTerrain(): void {
        this.tiles = []; // Reset ulang

        for (let y = 0; y < this.height; y++) {
            // 1. Buat array sementara untuk baris ini
            const row: TileType[] = []; 

            for (let x = 0; x < this.width; x++) {
                let type: TileType;

                // Logika pemilihan tipe ubin (sama seperti sebelumnya)
                if (x === 0 || x === this.width - 1 || y === 0 || y === this.height - 1) {
                    type = TileFactory.getTileType("Stone", "stone.png", 0, false);
                } else if (x > 5 && x < 10 && y > 5 && y < 10) {
                    type = TileFactory.getTileType("Water", "water.png", 5, true);
                } else {
                    type = TileFactory.getTileType("Grass", "grass.png", 1, true);
                }

                // 2. Dorong (push) data ke array sementara
                // Ini jauh lebih aman daripada mengakses indeks this.tiles[y][x]
                row.push(type);
            }

            // 3. Masukkan baris yang sudah jadi ke array utama
            this.tiles.push(row);
        }
    }

    public render(): void {
        // Canvas ascii sederhana
        const canvas: string[][] = Array(this.height).fill(null).map(() => Array(this.width).fill(" "));

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                // Minta Flyweight untuk menggambar dirinya di posisi x,y
                this.tiles[y]?.[x]?.draw(canvas, x, y);
            }
        }

        // Cetak ke console
        console.log(canvas.map(row => row.join(" ")).join("\n"));
    }
}

// ==========================================
// 4. CLIENT CODE (Simulasi)
// ==========================================

console.log("=== GENERATING LARGE MAP ===");
// Kita buat map 20x20 = 400 ubin
const myMap = new GameMap(20, 20);
myMap.generateTerrain();

console.log("\n=== RENDERING MAP ===");
myMap.render();

console.log("\n=== MEMORY USAGE ANALYSIS ===");
// Meskipun ada 400 ubin di layar, Factory hanya membuat 3 objek saja!
// Cek log "[Factory] Creating..." di atas, pasti cuma muncul 3 kali.