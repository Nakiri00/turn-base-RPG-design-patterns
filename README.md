# ⚔️ Eternal Dungeon: Design Patterns Showcase

> **Sebuah Game Engine RPG Berbasis Giliran (Turn-Based) untuk Demonstrasi Implementasi Clean Code & Design Patterns.**

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Design Patterns](https://img.shields.io/badge/Design%20Patterns-GoF-orange?style=for-the-badge)

---

## 🐟 Identitas Tim (Kelompok Ikan Bilis)

Proyek ini disusun untuk memenuhi **Tugas Besar Mata Kuliah Clean Code dan Design Pattern** di Universitas Komputer Indonesia (UNIKOM).

| NIM | Nama Anggota | 
| :--- | :--- | 
| **10122279** | **Syadzwana Akbar** | 
| **10122282** | **Dwi Andriani** | 
| **10122294** | **Putri Aprilia** | 
| **10122304** | **Hilman Fauzi** | 

---

## Tentang Proyek

**Eternal Dungeon** bukanlah sekadar game, melainkan sebuah kerangka kerja (*framework*) simulasi yang dirancang untuk membedah dan menerapkan **12 Design Patterns** dalam skenario pengembangan game yang nyata.

Sistem ini mensimulasikan:
* **Eksplorasi Dungeon** yang dibuat secara prosedural.
* **Manajemen Inventory** yang kompleks.
* **Sistem Pertarungan** dengan AI musuh yang dinamis.
* **Kustomisasi Senjata** dengan sistem *enchantment*.

---

## Arsitektur & Design Patterns

Kami menerapkan arsitektur modular yang memisahkan logika berdasarkan domain fitur. Berikut adalah pemetaan 12 pola desain yang kami implementasikan:

### Creational Patterns 
| Pattern | Implementasi di Game | 
| :--- | :--- | 
| **Factory Method** | *Monster Spawning* berdasarkan lokasi (Gua/Kuburan). |
| **Abstract Factory** | *Loot System* yang menghasilkan set senjata/armor sesuai tema (Hutan/Laut). | 
| **Builder** | Konstruksi Level Dungeon yang kompleks (Terrain, Room, Light, Trap). | 
| **Prototype** | Cloning monster "Minion" (Slime/Ghost) untuk efisiensi memori. | 

### Structural Patterns 
| Pattern | Implementasi di Game | 
| :--- | :--- | 
| **Adapter** | Menghubungkan driver input eksternal (Keyboard/Gamepad) ke Engine. | 
| **Composite** | Sistem Inventory hierarkis (Tas di dalam Tas). | 
| **Decorator** | Menambahkan efek elemen (Api/Es) pada senjata secara dinamis. | 
| **Flyweight** | Optimasi rendering ribuan *Tile* peta untuk hemat RAM. | 

### Behavioral Patterns 
| Pattern | Implementasi di Game | 
| :--- | :--- | 
| **State** | Mengatur kondisi Hero (Normal, Stunned, Dead). | 
| **Strategy** | AI Musuh yang dinamis (Aggressive, Defensive, Passive). | 
| **Observer** | Notifikasi *real-time* ke UI, Audio, dan Achievement saat HP berubah. | 
| **Command** | Sistem *Battle Action* yang mendukung fitur **Undo**. | 

---

## Struktur Folder

Kode disusun menggunakan pendekatan **Domain-Driven**:

```bash
src/
├── characters/      # Logika Hero, Enemy, dan Spawner (Factory/Strategy/State)
├── core/            # Sistem inti seperti Input Handler dan Event Manager
├── demos/           # Skrip pengujian untuk setiap kategori Pattern
├── items/           # Logika Inventory, Senjata, dan Loot (Composite/Decorator)
├── systems/         # Sistem Battle dan Observer (Command/Observer)
└── world/           # Generasi Peta dan Dungeon (Builder/Flyweight)