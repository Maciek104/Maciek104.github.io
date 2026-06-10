import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Otwieranie połączenia z bazą SQLite
export async function openDb() {
    return open({
        filename: './cars.db',
        driver: sqlite3.Database
    });
}

// Inicjalizacja tabeli Car (jeśli nie istnieje)
export async function initDb() {
    const db = await openDb();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS cars (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            producent TEXT NOT NULL,
            model TEXT NOT NULL,
            rok INTEGER NOT NULL,
            cena REAL NOT NULL
        )
    `);
    return db;
}