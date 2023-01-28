const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const db = require('./db')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res, next) => {
	db.all('SELECT * FROM guest', [], (err, rows) => {
		if (err) {
			res.status(400).json({ Error: err.message });
			return;
		}
		res.status(200).json({ rows });
	});
});

app.listen(port, () => console.log(`✅ e-RSVP listening on port ${port}`));
