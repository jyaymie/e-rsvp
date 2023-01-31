const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3001;
const db = require('./db');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// GET: Retrieve all guests
// app.get('/guests', (req, res) => {
// 	db.all('SELECT * FROM guest', [], (err, rows) => {
// 		if (err) {
// 			res.status(400).json({ 'Error getting all guests': err.message });
// 			return;
// 		}
// 		res.status(200).json({ rows });
// 	});
// });

// GET: Retrieve guest by email
app.get('/guests', (req, res) => {
	const email = req.query.email;
	db.all('SELECT * FROM guest WHERE email = ?', [email], (err, rows) => {
		if (err) {
			res.status(400).json({ 'Error retrieving guest': err.message });
			return;
		}
		res.status(200).json({ rows });
	});
});

// GET: Retrieve guest by id
app.get('/guests/:id', (req, res) => {
	db.get(
		'SELECT * FROM guest WHERE guest_id = ?',
		[req.params.id],
		(err, rows) => {
			if (err) {
				res.status(400).json({ 'Error retrieving guest': err.message });
				return;
			}
			res.status(200).json({ rows });
		}
	);
});

// POST: Add guest
app.post('/guests', (req, res) => {
	const {
		guest_id,
		name,
		email,
		is_attending,
		needs_hotel,
		entree,
		food_restrictions,
		song_request,
	} = req.body;
	db.run(
		'INSERT INTO guest (guest_id, name, email, is_attending, needs_hotel, entree, food_restrictions, song_request) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
		[
			guest_id,
			name,
			email,
			is_attending,
			needs_hotel,
			entree,
			food_restrictions,
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

// PUT: Update guest by id
app.put('/guests/:id', (req, res, next) => {
	const {
		guest_id,
		name,
		email,
		is_attending,
		needs_hotel,
		entree,
		food_restrictions,
		song_request,
	} = req.body;
	db.run(
		'UPDATE guest SET name = ?, email = ?, is_attending = ?, needs_hotel = ?, entree = ?, food_restrictions = ?, song_request = ? WHERE guest_id = ?',
		[
			name,
			email,
			is_attending,
			needs_hotel,
			entree,
			food_restrictions,
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

app.listen(PORT, () => console.log(`✅ Server is listening on port ${PORT}`));
