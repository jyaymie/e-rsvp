const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3001;
const db = require('./db');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// READ: Get all guests
app.get('/guests', (req, res) => {
	db.all('SELECT * FROM guest', [], (err, rows) => {
		if (err) {
			res.status(400).json({ 'Error getting all guests': err.message });
			return;
		}
		res.status(200).json({ rows });
	});
});

// READ: Get guest by id
app.get('/guests/:id', (req, res) => {
	db.get(
		'SELECT * FROM guest WHERE guest_id = ?',
		[req.params.id],
		(err, rows) => {
			if (err) {
				res.status(400).json({ 'Error getting guest': err.message });
				return;
			}
			res.status(200).json({ rows });
		}
	);
});

// CREATE: Add guest
app.post('/guests', (req, res) => {
	const {
		guest_id,
		name,
		attending,
		need_hotel,
		entree,
		food_exceptions,
		song_request,
	} = req.body;
	db.run(
		'INSERT INTO guest (guest_id, name, attending, need_hotel, entree, food_exceptions, song_request) VALUES (?, ?, ?, ?, ?, ?, ?)',
		[
			guest_id,
			name,
			attending,
			need_hotel,
			entree,
			food_exceptions,
			song_request,
		],
		(err, rows) => {
			if (err) {
				res.status(400).json({ 'Error adding guest': err.message });
				return;
			}
			res.status(201).json({ rows });
		}
	);
});

// UPDATE: Update guest by id
app.put('/guests/:id', (req, res, next) => {
	const {
		guest_id,
		name,
		attending,
		need_hotel,
		entree,
		food_exceptions,
		song_request,
	} = req.body;
	db.run(
		'UPDATE guest SET name = ?, attending = ?, need_hotel = ?, entree = ?, food_exceptions = ?, song_request = ? WHERE guest_id = ?',
		[
			name,
			attending,
			need_hotel,
			entree,
			food_exceptions,
			song_request,
			guest_id,
		],
		(err, rows) => {
			if (err) {
				res.status(400).json({ 'Error updating guest': err.message });
				return;
			}
			res.status(200).json({ rows });
		}
	);
});

// DELETE: Delete guest by id
app.delete('/guests/:id', (req, res, next) => {
	db.run(
		'DELETE FROM guest WHERE guest_id = ?',
		[req.params.id],
		(err, rows) => {
			if (err) {
				res.status(400).json({ 'Error deleting guest': err.message });
				return;
			}
			res.status(200).json({ rows });
		}
	);
});

app.listen(PORT, () => console.log('✅ Server is listening on port', PORT));
