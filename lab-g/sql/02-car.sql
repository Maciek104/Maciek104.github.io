CREATE TABLE IF NOT EXISTS cars (
                                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                                    make TEXT NOT NULL,
                                    model TEXT NOT NULL,
                                    year INTEGER NOT NULL,
                                    price REAL
);