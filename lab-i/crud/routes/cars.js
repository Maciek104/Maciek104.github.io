import express from 'express';
import { initDb } from '../db.js';
const router = express.Router();

// LISTA wszystkich samochodów
router.get('/', async (req, res) => {
    const db = await initDb();
    const cars = await db.all('SELECT * FROM cars');
    res.render('cars/list', { cars });
});

// PODGLĄD jednego samochodu
router.get('/:id', async (req, res) => {
    const db = await initDb();
    const car = await db.get('SELECT * FROM cars WHERE id = ?', req.params.id);
    if (!car) return res.status(404).send('Car not found');
    res.render('cars/view', { car });
});

// FORMULARZ tworzenia nowego samochodu
router.get('/create/new', (req, res) => {
    res.render('cars/create');
});

// UTWORZENIE nowego samochodu
router.post('/create', async (req, res) => {
    const { producent, model, rok, cena } = req.body;
    const db = await initDb();
    await db.run(
        'INSERT INTO cars (producent, model, rok, cena) VALUES (?, ?, ?, ?)',
        [producent, model, parseInt(rok), parseFloat(cena)]
    );
    res.redirect('/cars');
});

// FORMULARZ edycji samochodu
router.get('/edit/:id', async (req, res) => {
    const db = await initDb();
    const car = await db.get('SELECT * FROM cars WHERE id = ?', req.params.id);
    if (!car) return res.status(404).send('Car not found');
    res.render('cars/edit', { car });
});

// AKTUALIZACJA samochodu
router.post('/edit/:id', async (req, res) => {
    const { producent, model, rok, cena } = req.body;
    const db = await initDb();
    await db.run(
        'UPDATE cars SET producent=?, model=?, rok=?, cena=? WHERE id=?',
        [producent, model, parseInt(rok), parseFloat(cena), req.params.id]
    );
    res.redirect('/cars');
});

// USUWANIE samochodu
router.post('/delete/:id', async (req, res) => {
    const db = await initDb();
    await db.run('DELETE FROM cars WHERE id=?', req.params.id);
    res.redirect('/cars');
});

export default router;